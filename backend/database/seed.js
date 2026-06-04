import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const departments = [
  { code: 'OPD', name: 'Outpatient Department (OPD)', head: 'Dr. S. Rahman', floor: 'Ground Floor', capacity: 120 },
  { code: 'ER', name: 'Emergency Unit', head: 'Dr. M. Farook', floor: 'Ground Floor', capacity: 40 },
  { code: 'MED', name: 'Medical Clinic', head: 'Dr. A. Nazeer', floor: '1st Floor', capacity: 60 },
  { code: 'SUR', name: 'Surgical Clinic', head: 'Dr. K. Iqbal', floor: '1st Floor', capacity: 45 },
  { code: 'PED', name: 'Pediatric Clinic', head: 'Dr. F. Begum', floor: '2nd Floor', capacity: 50 },
  { code: 'ORT', name: 'Orthopedic Clinic', head: 'Dr. R. Hussain', floor: '2nd Floor', capacity: 35 },
  { code: 'NEU', name: 'Neurology Clinic', head: 'Dr. T. Majeed', floor: '3rd Floor', capacity: 30 },
  { code: 'GYN', name: 'Gynecology Clinic', head: 'Dr. S. Fathima', floor: '3rd Floor', capacity: 40 },
  { code: 'DEN', name: 'Dental Clinic', head: 'Dr. N. Ahamed', floor: 'Ground Floor', capacity: 25 },
  { code: 'RAD', name: 'Radiology Unit', head: 'Dr. H. Sadiq', floor: 'Basement', capacity: 20 },
  { code: 'DIA', name: 'Dialysis Unit', head: 'Dr. P. Zarook', floor: '1st Floor', capacity: 15 },
  { code: 'LAB', name: 'Laboratory Services', head: 'Dr. L. Cassim', floor: 'Ground Floor', capacity: 30 },
  { code: 'PHR', name: 'Pharmacy', head: 'Mr. A. Mohideen', floor: 'Ground Floor', capacity: 50 },
];

const users = [
  { name: 'Mohamed Rizwan', email: 'rizwan@email.com', password: 'patient123', role: 'patient', phone: '+94 77 111 2233' },
  { name: 'Fatima Nazeera', email: 'nazeera@email.com', password: 'patient123', role: 'patient', phone: '+94 77 222 3344' },
  { name: 'Dr. S. Rahman', email: 's.rahman@amh.gov.lk', password: 'doctor123', role: 'doctor', phone: '+94 77 123 4567' },
  { name: 'Dr. A. Nazeer', email: 'a.nazeer@amh.gov.lk', password: 'doctor123', role: 'doctor', phone: '+94 77 345 6789' },
  { name: 'Dr. M. Farook', email: 'm.farook@amh.gov.lk', password: 'doctor123', role: 'doctor', phone: '+94 77 234 5678' },
  { name: 'Dr. F. Begum', email: 'f.begum@amh.gov.lk', password: 'doctor123', role: 'doctor', phone: '+94 77 567 8901' },
  { name: 'Sithy Rahma', email: 's.rahma@amh.gov.lk', password: 'reception123', role: 'reception', phone: '+94 77 999 0011' },
  { name: 'Nizar Ahamed', email: 'n.ahamed@amh.gov.lk', password: 'reception123', role: 'reception', phone: '+94 77 999 0022' },
  { name: 'Admin User', email: 'admin@amh.gov.lk', password: 'admin123', role: 'admin', phone: '+94 67 222 3456' },
  { name: 'Abdul Kareem', email: 'kareem@email.com', password: 'patient123', role: 'patient', phone: '+94 77 333 4455' },
];

async function seed() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'amh_kalmunai',
  });

  console.log('Clearing existing data...');
  await db.query('SET FOREIGN_KEY_CHECKS = 0');
  const tables = ['notifications', 'queue_tokens', 'queues', 'appointments', 'clinic_schedules', 'patients', 'doctors', 'departments', 'users', 'hospital_settings'];
  for (const t of tables) await db.query(`TRUNCATE TABLE ${t}`);
  await db.query('SET FOREIGN_KEY_CHECKS = 1');

  for (const d of departments) {
    await db.query(
      'INSERT INTO departments (dept_code, name, head_name, floor, capacity, active_queues) VALUES (?, ?, ?, ?, ?, ?)',
      [d.code, d.name, d.head, d.floor, d.capacity, d.code === 'ORT' || d.code === 'DEN' || d.code === 'DIA' || d.code === 'LAB' || d.code === 'PHR' ? 0 : 1]
    );
  }
  console.log('✓ Departments seeded');

  const userIds = {};
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
      [u.name, u.email, hash, u.role, u.phone]
    );
    userIds[u.email] = result.insertId;
  }
  console.log('✓ Users seeded');

  const [deptRows] = await db.query('SELECT id, dept_code FROM departments');
  const deptMap = Object.fromEntries(deptRows.map((r) => [r.dept_code, r.id]));

  const doctorLinks = [
    { email: 's.rahman@amh.gov.lk', dept: 'OPD', spec: 'General Medicine', avail: 'Available' },
    { email: 'm.farook@amh.gov.lk', dept: 'ER', spec: 'Emergency Medicine', avail: 'Busy' },
    { email: 'a.nazeer@amh.gov.lk', dept: 'MED', spec: 'Internal Medicine', avail: 'Available' },
    { email: 'f.begum@amh.gov.lk', dept: 'PED', spec: 'Pediatrics', avail: 'Break' },
  ];
  const doctorIds = {};
  for (const doc of doctorLinks) {
    const [result] = await db.query(
      'INSERT INTO doctors (user_id, department_id, specialization, availability, experience, patients_today) VALUES (?, ?, ?, ?, ?, ?)',
      [userIds[doc.email], deptMap[doc.dept], doc.spec, doc.avail, '15 years', 16]
    );
    doctorIds[doc.email] = result.insertId;
  }
  console.log('✓ Doctors seeded');

  const patients = [
    { code: 'PAT-001', name: 'Mohamed Rizwan', email: 'rizwan@email.com', nic: '901234567V', mobile: '+94 77 111 2233', age: 34, gender: 'Male', address: 'Kalmunai Town', blood: 'O+' },
    { code: 'PAT-002', name: 'Fatima Nazeera', email: 'nazeera@email.com', nic: '922345678V', mobile: '+94 77 222 3344', age: 28, gender: 'Female', address: 'Sainthamaruthu', blood: 'A+' },
    { code: 'PAT-003', name: 'Abdul Kareem', email: 'kareem@email.com', nic: '883456789V', mobile: '+94 77 333 4455', age: 45, gender: 'Male', address: 'Karaitivu', blood: 'B+' },
  ];
  const patientIds = {};
  for (const p of patients) {
    const uid = userIds[p.email] || null;
    const [result] = await db.query(
      'INSERT INTO patients (user_id, patient_code, name, nic, mobile, email, age, gender, address, blood_group, registered_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [uid, p.code, p.name, p.nic, p.mobile, p.email, p.age, p.gender, p.address, p.blood]
    );
    patientIds[p.code] = result.insertId;
  }
  console.log('✓ Patients seeded');

  await db.query(
    `INSERT INTO appointments (appointment_number, patient_id, department_id, doctor_id, appointment_date, appointment_time, status) VALUES
    ('AMH-2026-001', ?, ?, ?, '2026-06-05', '09:00:00', 'Approved'),
    ('AMH-2026-002', ?, ?, ?, '2026-06-05', '10:30:00', 'Pending')`,
    [patientIds['PAT-001'], deptMap.MED, doctorIds['a.nazeer@amh.gov.lk'], patientIds['PAT-002'], deptMap.PED, doctorIds['f.begum@amh.gov.lk']]
  );
  console.log('✓ Appointments seeded');

  const [qResult] = await db.query(
    'INSERT INTO queues (department_id, doctor_id, token_prefix, current_token_num, avg_wait_time, status) VALUES (?, ?, ?, ?, ?, ?)',
    [deptMap.MED, doctorIds['a.nazeer@amh.gov.lk'], 'A', 120, 35, 'Active']
  );
  const queueId = qResult.insertId;

  const tokens = [
    { pid: 'PAT-003', num: 118, status: 'Completed' },
    { pid: 'PAT-001', num: 120, status: 'In Consultation' },
    { pid: 'PAT-002', num: 121, status: 'Waiting' },
  ];
  let pos = 1;
  for (const t of tokens) {
    await db.query(
      'INSERT INTO queue_tokens (queue_id, patient_id, token_number, token_display, queue_position, status, wait_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [queueId, patientIds[t.pid], t.num, `A${t.num}`, pos++, t.status, 15 + pos]
    );
  }
  console.log('✓ Queue tokens seeded');

  await db.query(
    `INSERT INTO notifications (user_id, title, message, type) VALUES
    (?, 'Appointment Confirmed', 'Your appointment with Dr. A. Nazeer has been confirmed.', 'success'),
    (?, 'Queue Updated', 'Your queue position has been updated.', 'info')`,
    [userIds['rizwan@email.com'], userIds['rizwan@email.com']]
  );

  await db.query(
    `INSERT INTO clinic_schedules (clinic_name, doctor_id, day_of_week, start_time, end_time) VALUES
    ('Medical Clinic', ?, 'Monday', '08:00:00', '16:00:00'),
    ('Medical Clinic', ?, 'Wednesday', '08:00:00', '16:00:00'),
    ('Pediatric Clinic', ?, 'Tuesday', '09:00:00', '15:00:00')`,
    [doctorIds['a.nazeer@amh.gov.lk'], doctorIds['a.nazeer@amh.gov.lk'], doctorIds['f.begum@amh.gov.lk']]
  );
  console.log('✓ Clinic schedules seeded');

  await db.query(
    `INSERT INTO hospital_settings (setting_key, setting_value, category) VALUES
    ('hospital_name', 'Ashraff Memorial Hospital', 'hospital'),
    ('max_wait_time', '60', 'queue'),
    ('sms_enabled', 'true', 'sms')`
  );

  await db.end();
  console.log('\n✓ Seed completed successfully!');
  console.log('\nDemo login (same as frontend):');
  console.log('  Patient:    rizwan@email.com / patient123');
  console.log('  Doctor:     a.nazeer@amh.gov.lk / doctor123');
  console.log('  Reception:  s.rahma@amh.gov.lk / reception123');
  console.log('  Admin:      admin@amh.gov.lk / admin123');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
