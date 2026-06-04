import { Router } from 'express';
import { asyncHandler, sendSuccess } from '../utils/helpers.js';
import * as clinicService from '../services/clinicService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const schedules = req.query.doctorId
    ? await clinicService.getSchedulesByDoctor(req.query.doctorId)
    : await clinicService.getAllSchedules();
  sendSuccess(res, schedules);
}));

router.post('/', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const schedule = await clinicService.createSchedule(req.body);
  sendSuccess(res, schedule, 'Schedule created', 201);
}));

router.put('/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const schedule = await clinicService.updateSchedule(req.params.id, req.body);
  sendSuccess(res, schedule, 'Schedule updated');
}));

router.delete('/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  await clinicService.deleteSchedule(req.params.id);
  sendSuccess(res, null, 'Schedule deleted');
}));

export default router;
