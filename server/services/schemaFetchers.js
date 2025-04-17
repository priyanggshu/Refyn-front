import pkg from 'pg';
const { Client } = pkg;
import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";

// PostgreSQL
export const fetchPostgresSchema = async (config) => {
  const client = new PgClient(config);
  await client.connect();

  const result = await client.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);

  await client.end();

  let schema = "";
  result.rows.forEach((row) => {
    schema += `-- ${row.table_name}\n${row.column_name} ${row.data_type}\n\n`;
  });

  return schema;
};

// MySQL
export const fetchMySQLSchema = async (config) => {
  const connection = await mysql.createConnection(config);

  const [tables] = await connection.query("SHOW TABLES");
  let schema = "";

  for (let row of tables) {
    const tableName = Object.values(row)[0];
    const [columns] = await connection.query(
      `SHOW COLUMNS FROM \`${tableName}\``
    );
    schema += `-- ${tableName}\n`;
    columns.forEach((col) => {
      schema += `${col.Field} ${col.Type}\n`;
    });
    schema += `\n`;
  }

  await connection.end();
  return schema;
};

// MongoDB
export const fetchMongoSchema = async (config) => {
  const client = new MongoClient(config.uri);
  await client.connect();

  const db = client.db(config.dbName);
  const collections = await db.listCollections().toArray();
  let schema = "";

  for (const { name } of collections) {
    const sampleDoc = await db.collection(name).findOne();
    schema += `-- ${name}\n`;
    if (sampleDoc) {
      for (let key in sampleDoc) {
        schema += `${key}: ${typeof sampleDoc[key]}\n`;
      }
    } else {
      schema += "(no sample data found)\n";
    }
    schema += `\n`;
  }

  await client.close();
  return schema;
};
