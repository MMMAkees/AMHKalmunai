import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import AppointmentTable from '../../components/AppointmentTable';
import Modal from '../../components/Modal';
import { appointments, timeSlots } from '../../data/appointments';
import { departments } from '../../data/departments';
import { doctors } from '../../data/doctors';
import { FaPlus } from 'react-icons/fa';

export default function PatientAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ department: '', doctor: '', date: '', time: '' });
  const myAppointments = appointments.filter((a) => a.patientId === 'PAT-001');

  const filteredDoctors = form.department
    ? doctors.filter((d) => d.departmentId === form.department)
    : doctors;

  return (
    <div>
      <PageHeader
        title="My Appointments"
        subtitle="Book and manage your hospital appointments"
        action={
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 shadow-sm transition-all">
            <FaPlus /> Book Appointment
          </button>
        }
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <AppointmentTable appointments={myAppointments} />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Book New Appointment">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value, doctor: '' })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              required
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              required
            >
              <option value="">Select Doctor</option>
              {filteredDoctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
            <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" required>
              <option value="">Select Time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
            Confirm Booking
          </button>
        </form>
      </Modal>
    </div>
  );
}
