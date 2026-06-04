import { Router } from 'express';
import { asyncHandler, sendSuccess } from '../utils/helpers.js';
import * as analyticsService from '../services/analyticsService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/public-stats', asyncHandler(async (_req, res) => {
  const stats = await analyticsService.getPublicStats();
  sendSuccess(res, stats);
}));

router.get('/dashboard', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDashboardStats();
  sendSuccess(res, stats);
}));

router.get('/monthly-flow', authMiddleware, authorize('admin'), asyncHandler(async (_req, res) => {
  const data = await analyticsService.getMonthlyFlow();
  sendSuccess(res, data);
}));

router.get('/queue-performance', authMiddleware, authorize('admin'), asyncHandler(async (_req, res) => {
  const data = await analyticsService.getQueuePerformance();
  sendSuccess(res, data);
}));

router.get('/doctor-utilization', authMiddleware, authorize('admin'), asyncHandler(async (_req, res) => {
  const data = await analyticsService.getDoctorUtilization();
  sendSuccess(res, data);
}));

router.get('/department-traffic', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const data = await analyticsService.getDepartmentTraffic();
  sendSuccess(res, data);
}));

router.get('/notifications', authMiddleware, asyncHandler(async (req, res) => {
  const notifications = await analyticsService.getNotificationsByUser(req.user.id);
  sendSuccess(res, notifications);
}));

router.patch('/notifications/:id/read', authMiddleware, asyncHandler(async (req, res) => {
  await analyticsService.markAsRead(req.params.id, req.user.id);
  sendSuccess(res, null, 'Marked as read');
}));

router.get('/settings', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const settings = await analyticsService.getSettings();
  sendSuccess(res, settings);
}));

router.put('/settings/:key', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  await analyticsService.updateSetting(req.params.key, req.body.value);
  sendSuccess(res, null, 'Setting updated');
}));

export default router;
