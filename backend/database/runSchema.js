import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runSchema() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await connection.query(sql);
  await connection.end();
  console.log('✓ Database schema created: amh_kalmunai');
}

runSchema().catch((err) => {
  console.error('Schema failed:', err.message);
  process.exit(1);
});
