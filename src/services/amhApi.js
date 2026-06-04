import { api } from './api.js';

export const amhApi = {
  // Auth
  login: (email, password, role) => api.post('/auth/login', { email, password, role }),
  getMe: () => api.get('/auth/me'),

  // Public
  getPublicStats: () => api.get('/public-stats'),
  getDepartments: () => api.get('/departments'),
  getDoctors: (search) => api.get(`/doctors${search ? `?search=${encodeURIComponent(search)}` : ''}`),

  // Patients
  getPatients: (search) => api.get(`/patients${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getPatientMe: () => api.get('/patients/me'),
  createPatient: (data) => api.post('/patients', data),
  updatePatient: (id, data) => api.put(`/patients/${id}`, data),
  deletePatient: (id) => api.delete(`/patients/${id}`),

  // Doctors
  getDoctor: (id) => api.get(`/doctors/${id}`),
  getDoctorMe: () => api.get('/doctors/me/profile'),
  getDoctorQueue: () => api.get('/doctors/me/queue'),
  createDoctor: (data) => api.post('/doctors', data),
  updateDoctor: (id, data) => api.put(`/doctors/${id}`, data),
  updateDoctorAvailability: (id, availability) => api.patch(`/doctors/${id}/availability`, { availability }),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),

  // Departments
  createDepartment: (data) => api.post('/departments', data),
  updateDepartment: (id, data) => api.put(`/departments/${id}`, data),
  deleteDepartment: (id) => api.delete(`/departments/${id}`),

  // Appointments
  getAppointments: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return api.get(`/appointments${q ? `?${q}` : ''}`);
  },
  createAppointment: (data) => api.post('/appointments', data),
  updateAppointmentStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`),

  // Queues
  getQueues: () => api.get('/queues'),
  getPatientQueueStatus: () => api.get('/queues/patient/status'),
  getQueueTokens: (queueId) => api.get(`/queues/${queueId}/tokens`),
  generateToken: (data) => api.post('/queues/generate-token', data),
  callNext: (queueId) => api.post(`/queues/${queueId}/call-next`),
  updateTokenStatus: (tokenId, status) => api.patch(`/queues/tokens/${tokenId}/status`, { status }),

  // Clinics
  getClinics: (doctorId) => api.get(`/clinics${doctorId ? `?doctorId=${doctorId}` : ''}`),
  createClinic: (data) => api.post('/clinics', data),
  updateClinic: (id, data) => api.put(`/clinics/${id}`, data),
  deleteClinic: (id) => api.delete(`/clinics/${id}`),

  // Users (admin)
  getUsers: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return api.get(`/auth/users${q ? `?${q}` : ''}`);
  },
  createUser: (data) => api.post('/auth/users', data),
  updateUser: (id, data) => api.put(`/auth/users/${id}`, data),
  deleteUser: (id) => api.delete(`/auth/users/${id}`),

  // Analytics
  getDashboardStats: () => api.get('/dashboard'),
  getDepartmentTraffic: () => api.get('/department-traffic'),
  getMonthlyFlow: () => api.get('/monthly-flow'),
  getQueuePerformance: () => api.get('/queue-performance'),
  getDoctorUtilization: () => api.get('/doctor-utilization'),
  getNotifications: () => api.get('/notifications'),
  markNotificationRead: (id) => api.patch(`/notifications/${id}/read`),
  getSettings: () => api.get('/settings'),
  updateSetting: (key, value) => api.put(`/settings/${key}`, { value }),
};

// Map API patient to frontend shape
export function mapPatient(p) {
  if (!p) return p;
  return {
    ...p,
    displayId: p.patient_code,
    registeredDate: p.registered_date,
    bloodGroup: p.blood_group,
  };
}

export function mapDoctor(d) {
  if (!d) return d;
  return {
    ...d,
    name: d.name,
    department: d.department,
    departmentId: d.department_id,
    availability: d.availability,
    patientsToday: d.patients_today,
  };
}

export function mapQueue(q) {
  if (!q) return q;
  return {
    id: q.id,
    department: q.department,
    departmentId: q.departmentId,
    currentToken: q.currentToken,
    totalWaiting: q.totalWaiting,
    avgWaitTime: q.avgWaitTime,
    doctorName: q.doctorName,
    status: q.status,
  };
}

export function mapNotification(n) {
  return {
    ...n,
    time: n.hoursAgo != null ? `${n.hoursAgo} hours ago` : '',
  };
}

export function mapDepartment(d) {
  return {
    ...d,
    code: d.dept_code,
    head: d.head_name,
    activeQueues: d.active_queues,
  };
}

export function mapClinic(c) {
  return {
    ...c,
    clinicName: c.clinic_name,
    doctorName: c.doctorName,
    day: c.day_of_week,
    startTime: c.start_time?.slice?.(0, 5) || c.start_time,
    endTime: c.end_time?.slice?.(0, 5) || c.end_time,
  };
}
