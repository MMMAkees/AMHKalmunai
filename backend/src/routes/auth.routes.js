import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { asyncHandler, sendSuccess, AppError } from '../utils/helpers.js';
import * as authService from '../services/authService.js';
import * as userService from '../services/userService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) throw new AppError('Email, password, and role are required', 400);
  const data = await authService.login(email, password, role);
  sendSuccess(res, data, 'Login successful');
}));

router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  sendSuccess(res, user);
}));

router.get('/users', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers({ role: req.query.role, search: req.query.search });
  sendSuccess(res, users);
}));

router.post('/users', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const hash = await bcrypt.hash(req.body.password || 'password123', 10);
  const user = await userService.createUser(req.body, hash);
  sendSuccess(res, user, 'User created', 201);
}));

router.put('/users/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  sendSuccess(res, user, 'User updated');
}));

router.delete('/users/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  sendSuccess(res, null, 'User deleted');
}));

export default router;
