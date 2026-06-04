import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';

export async function getActiveQueues() {
  return query(`
    SELECT q.id, q.token_prefix, q.current_token_num, q.avg_wait_time AS avgWaitTime, q.status,
           CONCAT(q.token_prefix, q.current_token_num) AS currentToken,
           d.id AS departmentId, d.name AS department,
           doc.id AS doctorId, u.name AS doctorName,
           (SELECT COUNT(*) FROM queue_tokens qt WHERE qt.queue_id = q.id AND qt.status = 'Waiting') AS totalWaiting
    FROM queues q
    JOIN departments d ON d.id = q.department_id
    JOIN doctors doc ON doc.id = q.doctor_id
    JOIN users u ON u.id = doc.user_id
    WHERE q.status = 'Active'
    ORDER BY d.name
  `);
}

export async function getQueueById(id) {
  const rows = await query(`
    SELECT q.*, d.name AS department, u.name AS doctorName
    FROM queues q
    JOIN departments d ON d.id = q.department_id
    JOIN doctors doc ON doc.id = q.doctor_id
    JOIN users u ON u.id = doc.user_id
    WHERE q.id = ?
  `, [id]);
  if (!rows[0]) throw new AppError('Queue not found', 404);
  return rows[0];
}

export async function getQueueTokens(queueId) {
  return query(`
    SELECT qt.*, p.name AS patientName, p.patient_code AS patientId
    FROM queue_tokens qt
    JOIN patients p ON p.id = qt.patient_id
    WHERE qt.queue_id = ?
    ORDER BY qt.token_number ASC
  `, [queueId]);
}

export async function generateToken({ queue_id, patient_id }) {
  const queue = await getQueueById(queue_id);
  const nextNum = queue.current_token_num + 1;
  const display = `${queue.token_prefix}${nextNum}`;

  const waiting = await query(
    "SELECT COUNT(*) AS cnt FROM queue_tokens WHERE queue_id = ? AND status = 'Waiting'",
    [queue_id]
  );
  const position = waiting[0].cnt + 1;

  const result = await query(
    `INSERT INTO queue_tokens (queue_id, patient_id, token_number, token_display, queue_position, status)
     VALUES (?, ?, ?, ?, ?, 'Waiting')`,
    [queue_id, patient_id, nextNum, display, position]
  );

  await query('UPDATE queues SET current_token_num = ? WHERE id = ?', [nextNum, queue_id]);

  const rows = await query('SELECT * FROM queue_tokens WHERE id = ?', [result.insertId]);
  return { token: rows[0], department: queue.department, queuePosition: position };
}

export async function callNext(queueId) {
  const [next] = await query(
    "SELECT * FROM queue_tokens WHERE queue_id = ? AND status = 'Waiting' ORDER BY token_number ASC LIMIT 1",
    [queueId]
  );
  if (!next) throw new AppError('No patients waiting', 404);

  await query("UPDATE queue_tokens SET status = 'Called', called_at = NOW() WHERE id = ?", [next.id]);
  await query('UPDATE queues SET current_token_num = ? WHERE id = ?', [next.token_number, queueId]);
  return next;
}

export async function updateTokenStatus(tokenId, status) {
  await query('UPDATE queue_tokens SET status = ?, completed_at = IF(? = \'Completed\', NOW(), completed_at) WHERE id = ?',
    [status, status, tokenId]);
  const rows = await query('SELECT * FROM queue_tokens WHERE id = ?', [tokenId]);
  if (!rows[0]) throw new AppError('Token not found', 404);
  return rows[0];
}

export async function getPatientQueueStatus(patientId) {
  const [token] = await query(`
    SELECT qt.*, q.token_prefix, q.current_token_num, q.avg_wait_time, d.name AS department
    FROM queue_tokens qt
    JOIN queues q ON q.id = qt.queue_id
    JOIN departments d ON d.id = q.department_id
    WHERE qt.patient_id = ? AND qt.status IN ('Waiting', 'Called', 'In Consultation')
    ORDER BY qt.created_at DESC LIMIT 1
  `, [patientId]);

  if (!token) return null;

  const ahead = await query(
    'SELECT COUNT(*) AS cnt FROM queue_tokens WHERE queue_id = ? AND token_number < ? AND status = \'Waiting\'',
    [token.queue_id, token.token_number]
  );

  return {
    currentToken: `${token.token_prefix}${token.current_token_num}`,
    yourToken: token.token_display,
    patientsAhead: ahead[0].cnt,
    estimatedWaitTime: token.avg_wait_time,
    department: token.department,
    progress: Math.min(95, Math.round((token.current_token_num / token.token_number) * 100)),
  };
}
