import { Router } from 'express';
import { asyncHandler, sendSuccess, AppError } from '../utils/helpers.js';
import * as appointmentService from '../services/appointmentService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';
import { query } from '../config/db.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const filters = { status: req.query.status, search: req.query.search, patientId: req.query.patientId, doctorId: req.query.doctorId };

  if (req.user.role === 'patient') {
    const [p] = await query('SELECT id FROM patients WHERE user_id = ?', [req.user.id]);
    if (p) filters.patientId = p.id;
  }

  const appointments = await appointmentService.getAllAppointments(filters);
  sendSuccess(res, appointments);
}));

router.post('/', authMiddleware, authorize('patient', 'reception', 'admin'), asyncHandler(async (req, res) => {
  let body = { ...req.body };
  if (req.user.role === 'patient') {
    const [p] = await query('SELECT id FROM patients WHERE user_id = ?', [req.user.id]);
    if (!p) throw new AppError('Patient profile not found', 404);
    body.patient_id = p.id;
  }
  const appt = await appointmentService.createAppointment(body);
  sendSuccess(res, appt, 'Appointment booked', 201);
}));

router.patch('/:id/status', authMiddleware, authorize('reception', 'doctor', 'admin'), asyncHandler(async (req, res) => {
  const appt = await appointmentService.updateAppointmentStatus(req.params.id, req.body.status);
  sendSuccess(res, appt, 'Status updated');
}));

router.delete('/:id', authMiddleware, authorize('admin', 'reception'), asyncHandler(async (req, res) => {
  await appointmentService.deleteAppointment(req.params.id);
  sendSuccess(res, null, 'Appointment deleted');
}));

export default router;
