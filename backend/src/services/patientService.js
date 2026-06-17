import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';

export async function getAllPatients(search) {
  let sql = 'SELECT * FROM patients WHERE 1=1';
  const params = [];
  if (search) {
    sql += ' AND (name LIKE ? OR nic LIKE ? OR patient_code LIKE ? OR mobile LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s, s);
  }
  sql += ' ORDER BY created_at DESC';
  return query(sql, params);
}

export async function getPatientById(id) {
  const rows = await query('SELECT * FROM patients WHERE id = ?', [id]);
  if (!rows[0]) throw new AppError('Patient not found', 404);
  return rows[0];
}

export async function createPatient(data) {
  const code = data.patient_code || `PAT-${Date.now().toString().slice(-6)}`;
  const result = await query(
    `INSERT INTO patients (user_id, patient_code, name, nic, mobile, email, age, gender, address, blood_group, registered_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.user_id || null, code, data.name, data.nic, data.mobile, data.email || null,
      data.age || null, data.gender || 'Male', data.address || null, data.blood_group || null,
      data.registered_date || new Date().toISOString().split('T')[0]]
  );
  return getPatientById(result.insertId);
}

export async function updatePatient(id, data) {
  await getPatientById(id);
  await query(
    `UPDATE patients SET name=?, nic=?, mobile=?, email=?, age=?, gender=?, address=?, blood_group=? WHERE id=?`,
    [data.name ?? null, data.nic ?? null, data.mobile ?? null, data.email ?? null,
      data.age ?? null, data.gender ?? 'Male', data.address ?? null, data.blood_group ?? null, id]
  );
  return getPatientById(id);
}

export async function deletePatient(id) {
  await getPatientById(id);
  await query('DELETE FROM patients WHERE id = ?', [id]);
}
