import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';

const doctorSelect = `
  SELECT d.id, d.user_id, d.department_id, d.specialization, d.availability, d.experience, d.patients_today,
         u.name, u.email, u.phone, dept.name AS department, dept.dept_code
  FROM doctors d
  JOIN users u ON u.id = d.user_id
  JOIN departments dept ON dept.id = d.department_id
`;

export async function getAllDoctors(search) {
  let sql = doctorSelect + ' WHERE 1=1';
  const params = [];
  if (search) {
    sql += ' AND (u.name LIKE ? OR d.specialization LIKE ? OR dept.name LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }
  return query(sql, params);
}

export async function getDoctorById(id) {
  const rows = await query(doctorSelect + ' WHERE d.id = ?', [id]);
  if (!rows[0]) throw new AppError('Doctor not found', 404);
  return rows[0];
}

export async function createDoctor(data) {
  const result = await query(
    'INSERT INTO doctors (user_id, department_id, specialization, availability, experience) VALUES (?, ?, ?, ?, ?)',
    [data.user_id, data.department_id, data.specialization, data.availability || 'Available', data.experience || null]
  );
  return getDoctorById(result.insertId);
}

export async function updateDoctor(id, data) {
  await getDoctorById(id);
  await query(
    'UPDATE doctors SET department_id=?, specialization=?, availability=?, experience=? WHERE id=?',
    [data.department_id, data.specialization, data.availability, data.experience, id]
  );
  return getDoctorById(id);
}

export async function deleteDoctor(id) {
  await getDoctorById(id);
  await query('DELETE FROM doctors WHERE id = ?', [id]);
}

export async function updateAvailability(id, availability) {
  await query('UPDATE doctors SET availability = ? WHERE id = ?', [availability, id]);
  return getDoctorById(id);
}

export async function getDoctorByUserId(userId) {
  const rows = await query(doctorSelect + ' WHERE d.user_id = ?', [userId]);
  if (!rows[0]) return null;
  return rows[0];
}

export async function getDoctorQueueTokens(userId) {
  const doctor = await getDoctorByUserId(userId);
  if (!doctor) return { doctor: null, tokens: [] };

  const queues = await query(
    "SELECT id FROM queues WHERE doctor_id = ? AND status = 'Active' ORDER BY created_at DESC LIMIT 1",
    [doctor.id]
  );
  if (!queues[0]) return { doctor, tokens: [] };

  const tokens = await query(`
    SELECT qt.token_display AS token, qt.status, qt.wait_time AS waitTime,
           p.name AS patientName, p.patient_code AS patientId
    FROM queue_tokens qt
    JOIN patients p ON p.id = qt.patient_id
    WHERE qt.queue_id = ?
    ORDER BY qt.token_number ASC
  `, [queues[0].id]);

  return { doctor, tokens, queueId: queues[0].id };
}
