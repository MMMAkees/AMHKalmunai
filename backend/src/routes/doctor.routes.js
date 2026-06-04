import { Router } from 'express';
import { asyncHandler, sendSuccess } from '../utils/helpers.js';
import * as doctorService from '../services/doctorService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/me/profile', authMiddleware, authorize('doctor'), asyncHandler(async (req, res) => {
  const doctor = await doctorService.getDoctorByUserId(req.user.id);
  sendSuccess(res, doctor);
}));

router.get('/me/queue', authMiddleware, authorize('doctor'), asyncHandler(async (req, res) => {
  const data = await doctorService.getDoctorQueueTokens(req.user.id);
  sendSuccess(res, data);
}));

router.get('/', asyncHandler(async (req, res) => {
  const doctors = await doctorService.getAllDoctors(req.query.search);
  sendSuccess(res, doctors);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.id);
  sendSuccess(res, doctor);
}));

router.post('/', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const doctor = await doctorService.createDoctor(req.body);
  sendSuccess(res, doctor, 'Doctor created', 201);
}));

router.put('/:id', authMiddleware, authorize('admin', 'doctor'), asyncHandler(async (req, res) => {
  const doctor = await doctorService.updateDoctor(req.params.id, req.body);
  sendSuccess(res, doctor, 'Doctor updated');
}));

router.patch('/:id/availability', authMiddleware, authorize('doctor', 'admin'), asyncHandler(async (req, res) => {
  const doctor = await doctorService.updateAvailability(req.params.id, req.body.availability);
  sendSuccess(res, doctor, 'Availability updated');
}));

router.delete('/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  await doctorService.deleteDoctor(req.params.id);
  sendSuccess(res, null, 'Doctor deleted');
}));

export default router;
