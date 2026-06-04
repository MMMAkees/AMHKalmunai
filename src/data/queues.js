export const queues = [
  { id: 'Q-001', department: 'Medical Clinic', departmentId: 'dept-003', currentToken: 'A120', totalWaiting: 28, avgWaitTime: 35, status: 'Active', doctorName: 'Dr. A. Nazeer' },
  { id: 'Q-002', department: 'Outpatient Department (OPD)', departmentId: 'dept-001', currentToken: 'B045', totalWaiting: 42, avgWaitTime: 45, status: 'Active', doctorName: 'Dr. S. Rahman' },
  { id: 'Q-003', department: 'Pediatric Clinic', departmentId: 'dept-005', currentToken: 'C018', totalWaiting: 15, avgWaitTime: 25, status: 'Active', doctorName: 'Dr. F. Begum' },
  { id: 'Q-004', department: 'Gynecology Clinic', departmentId: 'dept-008', currentToken: 'D032', totalWaiting: 20, avgWaitTime: 30, status: 'Active', doctorName: 'Dr. S. Fathima' },
  { id: 'Q-005', department: 'Emergency Unit', departmentId: 'dept-002', currentToken: 'E007', totalWaiting: 8, avgWaitTime: 15, status: 'Active', doctorName: 'Dr. M. Farook' },
  { id: 'Q-006', department: 'Neurology Clinic', departmentId: 'dept-007', currentToken: 'F011', totalWaiting: 12, avgWaitTime: 40, status: 'Active', doctorName: 'Dr. T. Majeed' },
  { id: 'Q-007', department: 'Surgical Clinic', departmentId: 'dept-004', currentToken: 'G009', totalWaiting: 10, avgWaitTime: 28, status: 'Active', doctorName: 'Dr. K. Iqbal' },
  { id: 'Q-008', department: 'Radiology Unit', departmentId: 'dept-010', currentToken: 'H022', totalWaiting: 18, avgWaitTime: 20, status: 'Active', doctorName: 'Dr. H. Sadiq' },
  { id: 'Q-009', department: 'Dental Clinic', departmentId: 'dept-009', currentToken: 'I005', totalWaiting: 6, avgWaitTime: 18, status: 'Active', doctorName: 'Dr. N. Ahamed' },
];

export const patientQueue = {
  currentToken: 'A120',
  yourToken: 'A135',
  patientsAhead: 15,
  estimatedWaitTime: 35,
  department: 'Medical Clinic',
  progress: 52,
};

export const doctorQueue = [
  { token: 'A118', patientName: 'Abdul Kareem', patientId: 'PAT-003', status: 'Completed', waitTime: 12 },
  { token: 'A119', patientName: 'Hassan Ali', patientId: 'PAT-007', status: 'Completed', waitTime: 15 },
  { token: 'A120', patientName: 'Mohamed Rizwan', patientId: 'PAT-001', status: 'In Consultation', waitTime: 18 },
  { token: 'A121', patientName: 'Ibrahim Sadiq', patientId: 'PAT-005', status: 'Waiting', waitTime: 22 },
  { token: 'A122', patientName: 'Zainab Fathima', patientId: 'PAT-006', status: 'Waiting', waitTime: 25 },
  { token: 'A123', patientName: 'Mariam Cassim', patientId: 'PAT-008', status: 'Waiting', waitTime: 28 },
];
