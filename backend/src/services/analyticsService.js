import { query } from '../config/db.js';

export async function getNotificationsByUser(userId) {
  return query(
    `SELECT id, title, message, type, is_read AS \`read\`,
            TIMESTAMPDIFF(HOUR, created_at, NOW()) AS hoursAgo,
            created_at
     FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );
}

export async function markAsRead(id, userId) {
  await query('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [id, userId]);
}

export async function getDashboardStats() {
  const [patients, doctors, staff, appointments, tokens, queues] = await Promise.all([
    query('SELECT COUNT(*) AS total FROM patients'),
    query('SELECT COUNT(*) AS total FROM doctors'),
    query("SELECT COUNT(*) AS total FROM users WHERE role IN ('reception','admin')"),
    query('SELECT COUNT(*) AS total FROM appointments WHERE appointment_date = CURDATE()'),
    query('SELECT COUNT(*) AS total FROM queue_tokens WHERE DATE(created_at) = CURDATE()'),
    query("SELECT COUNT(*) AS total FROM queues WHERE status = 'Active'"),
  ]);

  return {
    totalPatients: patients[0].total,
    totalDoctors: doctors[0].total,
    totalStaff: staff[0].total,
    todayAppointments: appointments[0].total,
    todayTokens: tokens[0].total,
    activeQueues: queues[0].total,
  };
}

export async function getPublicStats() {
  const [doctors, departments, queues, patients] = await Promise.all([
    query('SELECT COUNT(*) AS total FROM doctors'),
    query('SELECT COUNT(*) AS total FROM departments'),
    query("SELECT COUNT(*) AS total FROM queues WHERE status = 'Active'"),
    query('SELECT COUNT(*) AS total FROM queue_tokens WHERE DATE(created_at) = CURDATE()'),
  ]);
  return {
    totalDoctors: doctors[0].total,
    departments: departments[0].total,
    activeQueues: queues[0].total,
    dailyPatients: patients[0].total || 850,
  };
}

export async function getMonthlyFlow() {
  return query(`
    SELECT DATE_FORMAT(appointment_date, '%b') AS month,
           COUNT(DISTINCT patient_id) AS patients,
           COUNT(*) AS appointments
    FROM appointments
    WHERE appointment_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
    GROUP BY YEAR(appointment_date), MONTH(appointment_date)
    ORDER BY MIN(appointment_date)
  `);
}

export async function getQueuePerformance() {
  return query(`
    SELECT DATE_FORMAT(created_at, '%a') AS day, AVG(wait_time) AS avgWait
    FROM queue_tokens
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY DAYOFWEEK(created_at)
    ORDER BY DAYOFWEEK(created_at)
  `);
}

export async function getDoctorUtilization() {
  return query(`
    SELECT SUBSTRING_INDEX(u.name, ' ', -1) AS doctor,
           d.patients_today AS patients,
           25 AS capacity
    FROM doctors d
    JOIN users u ON u.id = d.user_id
    ORDER BY d.patients_today DESC
    LIMIT 8
  `);
}

export async function getDepartmentTraffic() {
  return query(`
    SELECT d.dept_code AS department, COUNT(a.id) AS patients
    FROM departments d
    LEFT JOIN appointments a ON a.department_id = d.id AND a.appointment_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY d.id ORDER BY patients DESC LIMIT 10
  `);
}

export async function getSettings() {
  return query('SELECT * FROM hospital_settings ORDER BY category, setting_key');
}

export async function updateSetting(key, value) {
  await query(
    'INSERT INTO hospital_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
    [key, value, value]
  );
}
