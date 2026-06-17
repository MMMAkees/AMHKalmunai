import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';

const userListSql = `SELECT id, name, email, role, phone, status, created_at AS joinedDate FROM users WHERE 1=1`;

export async function getAllUsers({ role, search }) {
  let sql = userListSql;
  const params = [];
  if (role && role !== 'All') { sql += ' AND role = ?'; params.push(role); }
  if (search) {
    sql += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  sql += ' ORDER BY created_at DESC';
  return query(sql, params);
}

export async function getUserById(id) {
  const rows = await query(
    'SELECT id, name, email, role, phone, status, created_at FROM users WHERE id = ?',
    [id]
  );
  if (!rows[0]) throw new AppError('User not found', 404);
  return rows[0];
}

export async function createUser(data, hashedPassword) {
  const result = await query(
    'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
    [data.name, data.email, hashedPassword, data.role, data.phone || null]
  );
  return getUserById(result.insertId);
}

export async function updateUser(id, data) {
  await getUserById(id);
  await query(
    'UPDATE users SET name = ?, email = ?, role = ?, phone = ?, status = ? WHERE id = ?',
    [data.name ?? null, data.email ?? null, data.role ?? 'patient', data.phone ?? null, data.status ?? 'Active', id]
  );
  return getUserById(id);
}

export async function deleteUser(id) {
  await getUserById(id);
  await query('DELETE FROM users WHERE id = ?', [id]);
}
