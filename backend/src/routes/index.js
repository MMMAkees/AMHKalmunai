import { Router } from 'express';
import authRoutes from './auth.routes.js';
import patientRoutes from './patient.routes.js';
import doctorRoutes from './doctor.routes.js';
import departmentRoutes from './department.routes.js';
import appointmentRoutes from './appointment.routes.js';
import queueRoutes from './queue.routes.js';
import clinicRoutes from './clinic.routes.js';
import analyticsRoutes from './analytics.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'AMH API is running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/doctors', doctorRoutes);
router.use('/departments', departmentRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/queues', queueRoutes);
router.use('/clinics', clinicRoutes);
router.use('/', analyticsRoutes);

export default router;
