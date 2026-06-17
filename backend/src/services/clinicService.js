import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';

export async function getAllSchedules() {
  return query(`
    SELECT cs.*, u.name AS doctorName
    FROM clinic_schedules cs
    JOIN doctors d ON d.id = cs.doctor_id
    JOIN users u ON u.id = d.user_id
    ORDER BY cs.day_of_week, cs.start_time
  `);
}

export async function getSchedulesByDoctor(doctorId) {
  return query('SELECT * FROM clinic_schedules WHERE doctor_id = ? ORDER BY day_of_week', [doctorId]);
}

export async function createSchedule(data) {
  const result = await query(
    'INSERT INTO clinic_schedules (clinic_name, doctor_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
    [data.clinic_name ?? null, data.doctor_id ?? null, data.day_of_week ?? null, data.start_time ?? null, data.end_time ?? null]
  );
  const rows = await query('SELECT * FROM clinic_schedules WHERE id = ?', [result.insertId]);
  return rows[0];
}

export async function updateSchedule(id, data) {
  await query(
    'UPDATE clinic_schedules SET clinic_name=?, doctor_id=?, day_of_week=?, start_time=?, end_time=? WHERE id=?',
    [data.clinic_name ?? null, data.doctor_id ?? null, data.day_of_week ?? null, data.start_time ?? null, data.end_time ?? null, id]
  );
  const rows = await query('SELECT * FROM clinic_schedules WHERE id = ?', [id]);
  if (!rows[0]) throw new AppError('Schedule not found', 404);
  return rows[0];
}

export async function deleteSchedule(id) {
  const r = await query('DELETE FROM clinic_schedules WHERE id = ?', [id]);
  if (r.affectedRows === 0) throw new AppError('Schedule not found', 404);
}
