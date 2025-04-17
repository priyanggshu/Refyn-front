import { PrismaClient } from "@prisma/client";
import {
  applySchemaToDB,
  getCurrentSchema,
  migrateSchema,
  validateSchema,
} from "../services/migrationService.js";
import redisClient from "../utils/redisClient.js";
import { emitMigrationProgress } from "../services/websocketService.js";
import { uploadSchemaFile } from "../services/supabaseService.js";
import { migrationQueue } from "../queues/migrationQueue.js";
import { chunkSchema } from "../utils/chunkSchema.js";
import axios from "axios";

const prisma = new PrismaClient();

export const migrateDatabase = async (req, res) => {
  const { userId, sourceDB, targetDB } = req.body;
  if (!userId || !sourceDB || !targetDB) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const migration = await prisma.migration.create({
      data: { userId, sourceDB, targetDB },
    });

    emitMigrationProgress(userId, {
      status: "validating",
      message: "Validating schema...",
    });

    // import schema & validate
    const schema = await migrateSchema(sourceDB);
    const validation = await validateSchema(schema, targetDB);

    if (!validation.success) {
      emitMigrationProgress(userId, {
        status: "failed",
        message: "Schema vaidation failed.",
      });
      return res
        .status(400)
        .json({ error: "Schema validation failed", details: validation.error });
    }

    const rollbackSchema = await getCurrentSchema(targetDB);
    const rollbackSchemaUrl = await uploadSchemaFile(
      rollbackSchema,
      userId,
      migration.id,
      "rollback"
    );

    await redisClient.set(`rollback:${migration.id}`, rollbackSchema);

    // Save rollback URL in migration record (optional fallback)
    await prisma.migration.update({
      where: { id: migration.id },
      data: { rollbackSchemaUrl },
    });

    const originalSchemaText = schema;
    const correctedSchemaText = validation.correctedSchema || schema;

    const schemaText = correctedSchemaText;
    const schemaUrl = await uploadSchemaFile(schemaText, userId, migration.id);

    if (schemaUrl) {
      await prisma.migration.update({
        where: { id: migration.id },
        data: {
          schemaUrl,
          originalSchema: originalSchemaText,
          correctedSchema: correctedSchemaText,
        },
      });
    }

    emitMigrationProgress(userId, {
      status: "validated",
      message: "Schema validated successfully!",
    });

    // Fetch latest migration (with approved version info)
    const updatedMigration = await prisma.migration.findUnique({
      where: { id: migration.id },
    });

    let finalSchema = updatedMigration.originalSchema;
    if (updatedMigration.approvedSchemaVersion === "corrected") {
      finalSchema = updatedMigration.correctedSchema;
    }

    emitMigrationProgress(userId, {
      status: "chunking",
      message: "Breaking schema into batches...",
    });

    const schemaBatches = chunkSchema(finalSchema, 10);

    const batchStatus = {};
    schemaBatches.forEach((batch) => {
      batchStatus[batch.batchId] = "pending";
    });

    await redisClient.set(
      `migration:${migration.id}:batches`,
      JSON.stringify(batchStatus)
    );

    for (const batch of schemaBatches) {
      await migrationQueue.add("apply-schema-batch", {
        userId,
        batch,
        targetDB,
        migrationId: migration.id,
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    emitMigrationProgress(userId, {
      status: "migrating",
      message: "Applying schema to target DB...",
    });

    const migrationResult = await applySchemaToDB(targetDB, finalSchema);

    // Mark as completed
    await new Promise((resolve) => setTimeout(resolve, 3000));
    emitMigrationProgress(userId, {
      status: "completed",
      message: "Migration completed successfully!",
    });

    await redisClient.set(
      `migration:${migration.id}`,
      JSON.stringify({ status: "completed" })
    );

    return res.status(200).json({ status: true, migrationId: migration.id });
  } catch (error) {
    console.error("Migration failed:", error);
    emitMigrationProgress(userId, {
      status: "failed",
      message: "Migration failed due to an error.",
    });
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMigrationStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const status = await redisClient.get(`migration:${id}`);
    if (!status) {
      return res.status(404).json({ error: "Migration status not found." });
    }
    return res.status(200).json(JSON.parse(status));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const rollbackMigration = async (req, res) => {
  const { id } = req.params;

  try {
    const migration = await prisma.migration.findUnique({ where: { id } });
    if (!migration) {
      return res.status(404).json({ error: "Migration not found." });
    }

    let rollbackSchema = await redisClient.get(`rollback:${id}`);

    if (!rollbackSchema) {
      // fallback to supabase
      const migration = await prisma.migration.findUnique({
        where: { id },
        select: { rollbackSchemaUrl, targetDB },
      });

      if (!migration?.rollbackSchemaUrl) {
        return res.status(400).json({ error: "No rollback schema found." });
      }

      const response = await axios.get(migration.rollbackSchemaUrl);
      if (response.status !== 200) {
        return res.status(500).json({ error: "Failed to fetch rollback schema from storage." });
      }

      rollbackSchema = response.data;
    }

    await applySchemaToDB(migration.targetDB, rollbackSchema);
    await redisClient.set(
      `migration:${id}`,
      JSON.stringify({ status: "rolled back" })
    );

    emitMigrationProgress(id, {
      status: "rolled back",
      message: "Migration rolled back successfully!",
    });
    return res.status(200).json({ success: true, message: "Rollback completed!" });
  } catch (error) {
    console.error("Error rolling back migration:", error);
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getSchemasForMigration = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const migration = await prisma.migration.findUnique({
    where: { id },
    select: {
      originalSchema: true,
      correctedSchema: true,
      schemaUrl: true,
    },
  });

  if (!migration)
    return res.status(404).json({ message: "Migration not found" });
  res.json(migration);
};

export const approveSchemaFix = async (req, res) => {
  const { id } = req.params;
  const { version } = req.body;
  const userId = req.user.id;

  if (!["original", "corrected"].includes(version)) {
    return res.status(400).json({ message: "Invalid schema version" });
  }

  const migration = await prisma.migration.update({
    where: { id },
    data: { approvedSchemaVersion: version },
  });

  res.json({ message: `Schema version '${version}' approved.`, migration });
};
