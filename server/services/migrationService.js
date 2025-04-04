import axios from "axios";
import { PrismaClient } from "@prisma/client";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export const migrateSchema = async (sourceDB, targetDB) => {
  try {
    // extract schema from source
    const schema = await extractSchemaFromDB(sourceDB);

    // validate & fix Schema using AI
    const { success, correctedSchema } = await validateSchema(schema, targetDB);
    if (!success) return { success: false, error: "Schema vaidation failed" };

    // apply Schema to Target DB
    await applySchemaToDB(targetDB, correctedSchema);
    return { success: true };
  } catch (error) {
    console.error("Error in migrateSchema:", error);
    return { success: false, error: "Migration failed" };
  }
};

const extractSchemaFromDB = async (dbURL) => {
  // Logic to extract schema from DB
  return `CREATE TABLE example (id SERIAL PRIMARY KEY, name TEXT);`;
};

export const applySchemaToDB = async (dbURL, schema) => {
  // Logic to apply schema to target DB
  console.log(`Applying schema to ${dbURL}:`, schema);
}

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
