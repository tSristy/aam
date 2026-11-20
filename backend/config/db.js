import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'aamf_cms';

// utf8mb4 is required to store Bangla (and emoji) correctly. The old MySQL
// "latin1"/"utf8" defaults turn Bangla into "????" or reject it outright.
const CHARSET = 'utf8mb4';
const COLLATION = 'utf8mb4_unicode_ci';

export async function ensureDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    charset: COLLATION
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET ${CHARSET} COLLATE ${COLLATION}`
  );

  // CREATE ... IF NOT EXISTS does nothing when the database already exists with
  // an older default (phpMyAdmin / shared hosting often create it as latin1),
  // so bring the default for future tables up to date as well.
  try {
    await connection.query(`ALTER DATABASE \`${DB_NAME}\` CHARACTER SET ${CHARSET} COLLATE ${COLLATION}`);
  } catch (error) {
    console.warn(`Could not set the default character set of database "${DB_NAME}" to ${CHARSET}: ${error.message}`);
  }

  await connection.end();
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
  // Make the connection itself speak utf8mb4 (SET NAMES utf8mb4).
  dialectOptions: { charset: COLLATION },
  define: {
    underscored: true,
    // New tables are created as utf8mb4.
    charset: CHARSET,
    collate: COLLATION
  }
});

// Converts tables that already exist with an old character set (e.g. latin1)
// to utf8mb4 so Bangla text can be saved. Tables that are already utf8mb4 are
// left untouched, so this is safe to run on every start.
export async function ensureUtf8mb4Tables(tableNames = []) {
  if (process.env.DB_AUTO_CONVERT_CHARSET === 'false' || !tableNames.length) return;

  const [rows] = await sequelize.query(
    `SELECT DISTINCT t.TABLE_NAME AS table_name
       FROM information_schema.TABLES t
       LEFT JOIN information_schema.COLUMNS c
         ON c.TABLE_SCHEMA = t.TABLE_SCHEMA
        AND c.TABLE_NAME = t.TABLE_NAME
        AND c.CHARACTER_SET_NAME IS NOT NULL
        AND c.CHARACTER_SET_NAME <> '${CHARSET}'
      WHERE t.TABLE_SCHEMA = :schema
        AND t.TABLE_TYPE = 'BASE TABLE'
        AND t.TABLE_NAME IN (:names)
        AND (t.TABLE_COLLATION NOT LIKE '${CHARSET}%' OR c.COLUMN_NAME IS NOT NULL)`,
    { replacements: { schema: DB_NAME, names: tableNames } }
  );

  for (const { table_name: tableName } of rows) {
    try {
      await sequelize.query(
        `ALTER TABLE \`${tableName}\` CONVERT TO CHARACTER SET ${CHARSET} COLLATE ${COLLATION}`
      );
      console.log(`Converted table "${tableName}" to ${CHARSET} (Bangla text is now supported).`);
    } catch (error) {
      console.error(
        `Could not convert table "${tableName}" to ${CHARSET}: ${error.message}\n` +
          'Bangla text may not save until this is fixed. Run manually in MySQL:\n' +
          `  ALTER TABLE \`${tableName}\` CONVERT TO CHARACTER SET ${CHARSET} COLLATE ${COLLATION};`
      );
    }
  }
}
