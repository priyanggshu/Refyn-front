import { PrismaClient } from "@prisma/client";
import { applySchemaToDB, migrateSchema, validateSchema } from "../services/migrationService.js";
import redisClient from "../utils/redisClient.js";
import { emitMigrationProgress } from "../services/websocketService.js";

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
      return res.status(400).json({ error: "Schema validation failed", details: validation.error });
    }

    emitMigrationProgress(userId, {
      status: "validated",
      message: "Schema validated successfully!",
    });

    // Apply schema to target db
    await new Promise((resolve) => setTimeout(resolve, 3000));
    emitMigrationProgress(userId, {
      status: "migrating",
      message: "Applying schema to target DB...",
    });

    const migrationResult = await migrateSchema( targetDB, validation.correctedSchema );

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

    const previousSchema = await redisClient.get(`rollback:${id}`);
    if(!previousSchema) {
      return res.status(400).json({ error: "No previous schema found for rollback." });
    }

    await applySchemaToDB(migration.targetDB, previousSchema);
    await redisClient.set( `migration:${id}`, JSON.stringify({ status: "rolled back" }) );

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
