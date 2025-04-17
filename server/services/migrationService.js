import axios from "axios";
import { PrismaClient } from "@prisma/client";
import supabase from "../utils/supabaseClient.js";
import { fetchMongoSchema, fetchMySQLSchema, fetchPostgresSchema } from "./schemaFetchers.js";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;

const prisma = new PrismaClient();

export const migrateSchema = async (userId, sourceDB, targetDB) => {
  try {
    // extract schema from source
    const schema = await extractSchemaFromDB(sourceDB);
    return schema;
  } catch (error) {
    console.error("Failed to extract schema:", error.message);
    throw new Error("Schema extraction failed");
  }
};

const extractSchemaFromDB = async (dbURL) => {
  // Logic to extract schema from DB
  return `CREATE TABLE example (id SERIAL PRIMARY KEY, name TEXT);`;
};

export const applySchemaToDB = async (dbURL, migrationId) => {
  const { data: file, error } = await supabase.storage
    .from("schemas")
    .download(`schemas/${migrationId}.sql`);

  if (error) throw new Error("Failed to download schema from Supabase");
  const finalSchema = await file.text();

  // Logic to apply schema to target DB
  console.log(`Applying schema to ${dbURL}: ${finalSchema}`);
};

export const validateSchema = async (schema, targetDB) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert database migration assistant. Your task is to ensure that the given database schema is correctly adapted to the target database system, resolving any compatibility issues.",
          },
          {
            role: "user",
            content: `Given the following database schema:\n\n${schema}\n\nFix any compatibility issues for ${targetDB}, ensuring all constraints (PK, FK, UNIQUE, etc.) are preserved and that data integrity is maintained.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const correctedSchema =
      response.data.choices?.[0]?.message?.content || schema; // fallback to original schema

    return { success: true, correctedSchema };
  } catch (error) {
    console.error(
      "AI Schema Validation Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: "AI validation failed, using original schema.",
    };
  }
};

export const getCurrentSchema = async (dbURL) => {
  try {
    const dbType = dbURL.type;

    if (dbType === "postgres") {
      return await fetchPostgresSchema(dbURL.config);
    } else if (dbType === "mysql") {
      return await fetchMySQLSchema(dbURL.config);
    } else if (dbType === "mongodb") {
      return await fetchMongoSchema(dbURL.config);
    } else {
      throw new Error(`Unsupported DB type: ${dbType}`);
    }
  } catch (error) {
    console.error("Error in getCurrentSchema:", error.message);
    throw error;
  }
}




const uploadSchemaToSupabase = async (schema, migrationId) => {
  const buffer = Buffer.from(schema, "utf-8");

  const { data, error } = await supabase.storage
    .from("schemas")
    .upload(`schemas/${migrationId}.sql`, buffer, {
      contentType: "text/plain",
      upsert: true,
    });

  if (error) {
    console.error("Supabase Upload Error:", error.message);
    throw new Error("Failed to upload schema to Supabase");
  }

  return `${SUPABASE_URL}/storage/v1/object/public/schemas/schemas/${migrationId}.sql`;
};
