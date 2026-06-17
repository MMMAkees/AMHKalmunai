import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import { patientMenu, receptionMenu, doctorMenu, adminMenu } from './menuConfig';

import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';
import StaffLoginPage from '../pages/public/StaffLoginPage';

import PatientDashboard from '../pages/patient/PatientDashboard';
import PatientAppointments from '../pages/patient/PatientAppointments';
import PatientQueue from '../pages/patient/PatientQueue';
import PatientNotifications from '../pages/patient/PatientNotifications';
import PatientProfile from '../pages/patient/PatientProfile';

import ReceptionDashboard from '../pages/reception/ReceptionDashboard';
import ReceptionPatients from '../pages/reception/ReceptionPatients';
import ReceptionQueue from '../pages/reception/ReceptionQueue';
import ReceptionAppointments from '../pages/reception/ReceptionAppointments';

import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorQueuePage from '../pages/doctor/DoctorQueue';
import DoctorPatients from '../pages/doctor/DoctorPatients';
import DoctorSchedule from '../pages/doctor/DoctorSchedule';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminDoctors from '../pages/admin/AdminDoctors';
import AdminDepartments from '../pages/admin/AdminDepartments';
import AdminClinics from '../pages/admin/AdminClinics';
import AdminAppointments from '../pages/admin/AdminAppointments';
import AdminQueue from '../pages/admin/AdminQueue';
import AdminReports from '../pages/admin/AdminReports';
import AdminSettings from '../pages/admin/AdminSettings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/staff/login" element={<StaffLoginPage />} />

      <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <DashboardLayout menuItems={patientMenu} title="Patient Portal" />
        </ProtectedRoute>
      }>
        <Route index element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="queue" element={<PatientQueue />} />
        <Route path="notifications" element={<PatientNotifications />} />
        <Route path="profile" element={<PatientProfile />} />
      </Route>

      <Route path="/reception" element={
        <ProtectedRoute allowedRoles={['reception']}>
          <DashboardLayout menuItems={receptionMenu} title="Reception Portal" />
        </ProtectedRoute>
      }>
        <Route index element={<ReceptionDashboard />} />
        <Route path="patients" element={<ReceptionPatients />} />
        <Route path="queue" element={<ReceptionQueue />} />
        <Route path="appointments" element={<ReceptionAppointments />} />
      </Route>

      <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DashboardLayout menuItems={doctorMenu} title="Doctor Portal" />
        </ProtectedRoute>
      }>
        <Route index element={<DoctorDashboard />} />
        <Route path="queue" element={<DoctorQueuePage />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="schedule" element={<DoctorSchedule />} />
      </Route>

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <DashboardLayout menuItems={adminMenu} title="Admin Portal" />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="clinics" element={<AdminClinics />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="queue" element={<AdminQueue />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
