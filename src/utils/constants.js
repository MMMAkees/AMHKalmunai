export const ROLES = {
  PATIENT: 'patient',
  RECEPTION: 'reception',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

export const ROLE_LABELS = {
  [ROLES.PATIENT]: 'Patient',
  [ROLES.RECEPTION]: 'Receptionist',
  [ROLES.DOCTOR]: 'Doctor',
  [ROLES.ADMIN]: 'Administrator',
};

export const APPOINTMENT_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const DOCTOR_STATUS = {
  AVAILABLE: 'Available',
  BUSY: 'Busy',
  BREAK: 'Break',
  LEAVE: 'Leave',
};

export const CONSULTATION_STATUS = {
  IN_CONSULTATION: 'In Consultation',
  COMPLETED: 'Completed',
  SKIPPED: 'Skipped',
};

export const ITEMS_PER_PAGE = 8;

export const STATUS_COLORS = {
  Pending: 'bg-amber-100 text-amber-800',
  Approved: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
  Available: 'bg-green-100 text-green-800',
  Busy: 'bg-red-100 text-red-800',
  Break: 'bg-orange-100 text-orange-800',
  Leave: 'bg-gray-100 text-gray-800',
};
