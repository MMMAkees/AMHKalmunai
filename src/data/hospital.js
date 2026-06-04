export const hospitalInfo = {
  name: 'Ashraff Memorial Hospital',
  shortName: 'AMH',
  location: 'Kalmunai, Sri Lanka',
  address: 'Main Street, Kalmunai, Ampara District, Eastern Province, Sri Lanka',
  phone: '+94 67 222 3456',
  emergency: '+94 67 222 9999',
  email: 'info@amh.gov.lk',
  website: 'www.amh.gov.lk',
  established: '1985',
  introduction:
    'Ashraff Memorial Hospital (AMH) is a leading government healthcare institution serving the Eastern Province of Sri Lanka. Established to provide accessible, quality healthcare to the communities of Kalmunai and surrounding areas, AMH has grown into a comprehensive medical facility offering a wide range of specialized services.',
  mission:
    'To deliver compassionate, equitable, and high-quality healthcare services to all citizens, leveraging modern technology to improve patient outcomes and operational efficiency.',
  vision:
    'To be the premier digital healthcare provider in Eastern Sri Lanka, setting standards for patient-centered care, innovation, and community health excellence.',
  coreValues: [
    { title: 'Compassion', description: 'Treating every patient with dignity and empathy' },
    { title: 'Excellence', description: 'Maintaining the highest standards of medical care' },
    { title: 'Integrity', description: 'Operating with transparency and ethical practices' },
    { title: 'Innovation', description: 'Embracing technology for better healthcare delivery' },
    { title: 'Accessibility', description: 'Ensuring healthcare for all communities' },
  ],
};

export const statistics = {
  totalDoctors: 48,
  dailyPatients: 850,
  departments: 13,
  activeQueues: 9,
};

export const services = [
  { id: 1, name: 'Outpatient Department (OPD)', icon: 'FaHospital', description: 'General outpatient consultations and primary care services' },
  { id: 2, name: 'Emergency Unit', icon: 'FaAmbulance', description: '24/7 emergency medical care and trauma response' },
  { id: 3, name: 'Medical Clinic', icon: 'FaStethoscope', description: 'Internal medicine and general medical consultations' },
  { id: 4, name: 'Surgical Clinic', icon: 'FaProcedures', description: 'Surgical consultations and minor procedures' },
  { id: 5, name: 'Pediatric Clinic', icon: 'FaBaby', description: 'Specialized healthcare for infants and children' },
  { id: 6, name: 'Orthopedic Clinic', icon: 'FaBone', description: 'Bone, joint, and musculoskeletal care' },
  { id: 7, name: 'Neurology Clinic', icon: 'FaBrain', description: 'Neurological disorders diagnosis and treatment' },
  { id: 8, name: 'Gynecology Clinic', icon: 'FaFemale', description: "Women's health and reproductive care" },
  { id: 9, name: 'Dental Clinic', icon: 'FaTooth', description: 'Oral health and dental treatments' },
  { id: 10, name: 'Radiology Unit', icon: 'FaXRay', description: 'X-ray, CT scan, and imaging services' },
  { id: 11, name: 'Dialysis Unit', icon: 'FaTint', description: 'Renal dialysis and kidney care services' },
  { id: 12, name: 'Laboratory Services', icon: 'FaFlask', description: 'Diagnostic testing and pathology services' },
  { id: 13, name: 'Pharmacy', icon: 'FaPills', description: 'Prescription dispensing and pharmaceutical care' },
];

export const features = [
  { id: 1, title: 'Online Appointments', description: 'Book appointments from anywhere, anytime', icon: 'FaCalendarCheck' },
  { id: 2, title: 'Queue Token Generation', description: 'Digital tokens for organized patient flow', icon: 'FaTicketAlt' },
  { id: 3, title: 'Live Queue Tracking', description: 'Real-time queue position and wait times', icon: 'FaStream' },
  { id: 4, title: 'Doctor Availability', description: 'View doctor schedules and availability status', icon: 'FaUserMd' },
  { id: 5, title: 'SMS Notifications', description: 'Automated alerts for appointments and queue updates', icon: 'FaSms' },
  { id: 6, title: 'QR Check-In', description: 'Contactless check-in using QR codes', icon: 'FaQrcode' },
  { id: 7, title: 'Digital Patient Flow', description: 'End-to-end digitized patient journey', icon: 'FaRoute' },
  { id: 8, title: 'Multi-Language Support', description: 'Sinhala, Tamil, and English language support', icon: 'FaLanguage' },
];

export const socialLinks = [
  { name: 'Facebook', url: '#', icon: 'FaFacebook' },
  { name: 'Twitter', url: '#', icon: 'FaTwitter' },
  { name: 'YouTube', url: '#', icon: 'FaYoutube' },
  { name: 'LinkedIn', url: '#', icon: 'FaLinkedin' },
];

export const quickLinks = [
  { label: 'Book Appointment', path: '/login' },
  { label: 'Track Queue', path: '/login' },
  { label: 'Our Services', path: '/#services' },
  { label: 'About AMH', path: '/#about' },
  { label: 'Staff Login', path: '/login' },
];
