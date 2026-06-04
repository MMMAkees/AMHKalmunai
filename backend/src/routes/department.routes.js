import { Router } from 'express';
import { asyncHandler, sendSuccess } from '../utils/helpers.js';
import * as departmentService from '../services/departmentService.js';
import { authMiddleware, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const departments = await departmentService.getAllDepartments();
  sendSuccess(res, departments);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const dept = await departmentService.getDepartmentById(req.params.id);
  sendSuccess(res, dept);
}));

router.post('/', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const dept = await departmentService.createDepartment(req.body);
  sendSuccess(res, dept, 'Department created', 201);
}));

router.put('/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  const dept = await departmentService.updateDepartment(req.params.id, req.body);
  sendSuccess(res, dept, 'Department updated');
}));

router.delete('/:id', authMiddleware, authorize('admin'), asyncHandler(async (req, res) => {
  await departmentService.deleteDepartment(req.params.id);
  sendSuccess(res, null, 'Department deleted');
}));

export default router;
