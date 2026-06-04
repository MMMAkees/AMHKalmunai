import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { AppError } from '../utils/helpers.js';
import { signToken } from '../middleware/auth.js';

export async function login(email, password, role) {
  const rows = await query(
    'SELECT id, name, email, password, role, phone, status FROM users WHERE email = ? AND role = ?',
    [email, role]
  );
  const user = rows[0];
  if (!user) throw new AppError('Invalid email or password', 401);
  if (user.status !== 'Active') throw new AppError('Account is inactive', 403);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError('Invalid email or password', 401);

  const token = signToken({ id: user.id, email: user.email, role: user.role, name: user.name });
  delete user.password;

  let profile = null;
  if (role === 'patient') {
    const p = await query('SELECT * FROM patients WHERE user_id = ?', [user.id]);
    profile = p[0] || null;
  } else if (role === 'doctor') {
    const d = await query(
      `SELECT d.*, dept.name AS department_name FROM doctors d
       JOIN departments dept ON dept.id = d.department_id WHERE d.user_id = ?`,
      [user.id]
    );
    profile = d[0] || null;
  }

  return { user, profile, token, role };
}

export async function getMe(userId) {
  const rows = await query(
    'SELECT id, name, email, role, phone, status, created_at FROM users WHERE id = ?',
    [userId]
  );
  if (!rows[0]) throw new AppError('User not found', 404);
  return rows[0];
}
