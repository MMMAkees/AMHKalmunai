import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';

export async function getAllDepartments() {
  return query('SELECT * FROM departments ORDER BY name');
}

export async function getDepartmentById(id) {
  const rows = await query('SELECT * FROM departments WHERE id = ?', [id]);
  if (!rows[0]) throw new AppError('Department not found', 404);
  return rows[0];
}

export async function createDepartment(data) {
  const result = await query(
    'INSERT INTO departments (dept_code, name, head_name, floor, capacity) VALUES (?, ?, ?, ?, ?)',
    [data.dept_code ?? null, data.name ?? null, data.head_name ?? null, data.floor ?? null, data.capacity ?? 0]
  );
  return getDepartmentById(result.insertId);
}

export async function updateDepartment(id, data) {
  await getDepartmentById(id);
  await query(
    'UPDATE departments SET dept_code=?, name=?, head_name=?, floor=?, capacity=? WHERE id=?',
    [data.dept_code ?? null, data.name ?? null, data.head_name ?? null, data.floor ?? null, data.capacity ?? 0, id]
  );
  return getDepartmentById(id);
}

export async function deleteDepartment(id) {
  await getDepartmentById(id);
  await query('DELETE FROM departments WHERE id = ?', [id]);
}
