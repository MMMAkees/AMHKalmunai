import { Router } from 'express';
import { asyncHandler, sendSuccess, AppError } from '../utils/helpers.js';
import * as queueService from '../services/queueService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const queues = await queueService.getActiveQueues();
  sendSuccess(res, queues);
}));

router.get('/patient/status', authMiddleware, authorize('patient'), asyncHandler(async (req, res) => {
  const [p] = await query('SELECT id FROM patients WHERE user_id = ?', [req.user.id]);
  if (!p) throw new AppError('Patient profile not found', 404);
  const status = await queueService.getPatientQueueStatus(p.id);
  sendSuccess(res, status);
}));

router.post('/generate-token', authMiddleware, authorize('reception', 'admin'), asyncHandler(async (req, res) => {
  const result = await queueService.generateToken(req.body);
  sendSuccess(res, result, 'Token generated', 201);
}));

router.get('/:id/tokens', authMiddleware, asyncHandler(async (req, res) => {
  const tokens = await queueService.getQueueTokens(req.params.id);
  sendSuccess(res, tokens);
}));

router.post('/:id/call-next', authMiddleware, authorize('reception', 'doctor'), asyncHandler(async (req, res) => {
  const token = await queueService.callNext(req.params.id);
  sendSuccess(res, token, 'Next patient called');
}));

router.patch('/tokens/:id/status', authMiddleware, authorize('reception', 'doctor'), asyncHandler(async (req, res) => {
  const token = await queueService.updateTokenStatus(req.params.id, req.body.status);
  sendSuccess(res, token, 'Token status updated');
}));

export default router;
