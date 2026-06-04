import {
  FaThLarge, FaCalendarCheck, FaStream, FaBell, FaUser,
  FaUsers, FaClipboardList, FaUserMd, FaCog, FaBuilding,
  FaHospital, FaChartBar, FaFileAlt,
} from 'react-icons/fa';

export const patientMenu = [
  { label: 'Dashboard', path: '/patient', icon: FaThLarge, end: true },
  { label: 'Appointments', path: '/patient/appointments', icon: FaCalendarCheck },
  { label: 'Queue Tracking', path: '/patient/queue', icon: FaStream },
  { label: 'Notifications', path: '/patient/notifications', icon: FaBell },
  { label: 'Profile', path: '/patient/profile', icon: FaUser },
];

export const receptionMenu = [
  { label: 'Dashboard', path: '/reception', icon: FaThLarge, end: true },
  { label: 'Patients', path: '/reception/patients', icon: FaUsers },
  { label: 'Queue Management', path: '/reception/queue', icon: FaStream },
  { label: 'Appointments', path: '/reception/appointments', icon: FaCalendarCheck },
];

export const doctorMenu = [
  { label: 'Dashboard', path: '/doctor', icon: FaThLarge, end: true },
  { label: "Today's Queue", path: '/doctor/queue', icon: FaStream },
  { label: 'Patients', path: '/doctor/patients', icon: FaUsers },
  { label: 'Schedule', path: '/doctor/schedule', icon: FaCalendarCheck },
];

export const adminMenu = [
  { label: 'Dashboard', path: '/admin', icon: FaThLarge, end: true },
  { label: 'Users', path: '/admin/users', icon: FaUsers },
  { label: 'Doctors', path: '/admin/doctors', icon: FaUserMd },
  { label: 'Departments', path: '/admin/departments', icon: FaBuilding },
  { label: 'Clinics', path: '/admin/clinics', icon: FaHospital },
  { label: 'Appointments', path: '/admin/appointments', icon: FaCalendarCheck },
  { label: 'Queue Management', path: '/admin/queue', icon: FaClipboardList },
  { label: 'Reports', path: '/admin/reports', icon: FaFileAlt },
  { label: 'Settings', path: '/admin/settings', icon: FaCog },
];

export const roleDashboardPaths = {
  patient: '/patient',
  reception: '/reception',
  doctor: '/doctor',
  admin: '/admin',
};
