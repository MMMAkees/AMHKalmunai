export const monthlyPatientFlow = [
  { month: 'Jan', patients: 12400, appointments: 9800 },
  { month: 'Feb', patients: 11800, appointments: 9200 },
  { month: 'Mar', patients: 13200, appointments: 10500 },
  { month: 'Apr', patients: 12900, appointments: 10100 },
  { month: 'May', patients: 14100, appointments: 11200 },
  { month: 'Jun', patients: 8500, appointments: 6800 },
];

export const departmentTraffic = [
  { department: 'OPD', patients: 320 },
  { department: 'Medical', patients: 180 },
  { department: 'Pediatric', patients: 145 },
  { department: 'Gynecology', patients: 120 },
  { department: 'Emergency', patients: 95 },
  { department: 'Surgical', patients: 85 },
  { department: 'Orthopedic', patients: 70 },
  { department: 'Neurology', patients: 55 },
  { department: 'Dental', patients: 90 },
  { department: 'Radiology', patients: 110 },
];

export const queuePerformance = [
  { day: 'Mon', avgWait: 32 },
  { day: 'Tue', avgWait: 28 },
  { day: 'Wed', avgWait: 35 },
  { day: 'Thu', avgWait: 30 },
  { day: 'Fri', avgWait: 42 },
  { day: 'Sat', avgWait: 38 },
];

export const doctorUtilization = [
  { doctor: 'Dr. Rahman', patients: 24, capacity: 30 },
  { doctor: 'Dr. Nazeer', patients: 16, capacity: 25 },
  { doctor: 'Dr. Begum', patients: 20, capacity: 25 },
  { doctor: 'Dr. Fathima', patients: 15, capacity: 20 },
  { doctor: 'Dr. Hussain', patients: 10, capacity: 20 },
  { doctor: 'Dr. Majeed', patients: 8, capacity: 15 },
  { doctor: 'Dr. Iqbal', patients: 12, capacity: 20 },
  { doctor: 'Dr. Ahamed', patients: 14, capacity: 20 },
];

export const adminStats = {
  totalPatients: 8450,
  totalDoctors: 48,
  totalStaff: 156,
  todayAppointments: 127,
  todayTokens: 342,
  activeQueues: 9,
};

export const aiPredictions = {
  waitingTime: { minutes: 32, confidence: 95 },
  peakHours: ['09:00 - 11:00', '14:00 - 16:00'],
  busyDepartments: ['OPD', 'Medical Clinic', 'Radiology'],
  queueCongestion: 'Moderate',
};
