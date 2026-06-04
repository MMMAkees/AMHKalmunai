import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';

const apptSelect = `
  SELECT a.id, a.appointment_number AS appointmentNumber, a.appointment_date AS date,
         TIME_FORMAT(a.appointment_time, '%H:%i') AS time, a.status, a.created_at AS createdAt,
         p.id AS patientId, p.patient_code, p.name AS patientName,
         d.id AS departmentId, d.name AS department,
         doc.id AS doctorId, u.name AS doctorName
  FROM appointments a
  JOIN patients p ON p.id = a.patient_id
  JOIN departments d ON d.id = a.department_id
  JOIN doctors doc ON doc.id = a.doctor_id
  JOIN users u ON u.id = doc.user_id
`;

export async function getAllAppointments({ status, patientId, doctorId, search }) {
  let sql = apptSelect + ' WHERE 1=1';
  const params = [];
  if (status && status !== 'All') { sql += ' AND a.status = ?'; params.push(status); }
  if (patientId) { sql += ' AND a.patient_id = ?'; params.push(patientId); }
  if (doctorId) { sql += ' AND a.doctor_id = ?'; params.push(doctorId); }
  if (search) {
    sql += ' AND (a.appointment_number LIKE ? OR p.name LIKE ? OR d.name LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  sql += ' ORDER BY a.appointment_date DESC, a.appointment_time DESC';
  return query(sql, params);
}

export async function createAppointment(data) {
  const num = data.appointment_number || `AMH-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
  const result = await query(
    `INSERT INTO appointments (appointment_number, patient_id, department_id, doctor_id, appointment_date, appointment_time, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [num, data.patient_id, data.department_id, data.doctor_id, data.appointment_date, data.appointment_time,
      data.status || 'Pending', data.notes || null]
  );
  const rows = await query(apptSelect + ' WHERE a.id = ?', [result.insertId]);
  return rows[0];
}

export async function updateAppointmentStatus(id, status) {
  await query('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);
  const rows = await query(apptSelect + ' WHERE a.id = ?', [id]);
  if (!rows[0]) throw new AppError('Appointment not found', 404);
  return rows[0];
}

export async function deleteAppointment(id) {
  const r = await query('DELETE FROM appointments WHERE id = ?', [id]);
  if (r.affectedRows === 0) throw new AppError('Appointment not found', 404);
}
