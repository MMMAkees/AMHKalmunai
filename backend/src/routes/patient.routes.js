import { Router } from 'express';
import { asyncHandler, sendSuccess, AppError } from '../utils/helpers.js';
import { query } from '../config/db.js';
import * as patientService from '../services/patientService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/me', authMiddleware, authorize('patient'), asyncHandler(async (req, res) => {
  const rows = await query('SELECT * FROM patients WHERE user_id = ?', [req.user.id]);
  if (!rows[0]) throw new AppError('Patient profile not found', 404);
  sendSuccess(res, rows[0]);
}));

router.get('/', authMiddleware, authorize('reception', 'doctor', 'admin'), asyncHandler(async (req, res) => {
  const patients = await patientService.getAllPatients(req.query.search);
  sendSuccess(res, patients);
}));

router.get('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const patient = await patientService.getPatientById(req.params.id);
  sendSuccess(res, patient);
}));

router.post('/', authMiddleware, authorize('reception', 'admin'), asyncHandler(async (req, res) => {
  const patient = await patientService.createPatient(req.body);
  sendSuccess(res, patient, 'Patient registered', 201);
}));

router.put('/:id', authMiddleware, authorize('reception', 'admin'), asyncHandler(async (req, res) => {
  const patient = await patientService.updatePatient(req.params.id, req.body);
  sendSuccess(res, patient, 'Patient updated');
}));

router.delete('/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  await patientService.deletePatient(req.params.id);
  sendSuccess(res, null, 'Patient deleted');
}));

export default router;
