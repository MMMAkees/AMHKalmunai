import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import AppointmentTable from '../../components/AppointmentTable';
import Modal from '../../components/Modal';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapDepartment } from '../../services/amhApi';

export default function PatientAppointments() {
  const { data: appointments, loading, error, refetch } = useFetch(() => amhApi.getAppointments());
  const { data: departments } = useFetch(() => amhApi.getDepartments().then((d) => d.map(mapDepartment)));
  const { data: doctors } = useFetch(() => amhApi.getDoctors());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ department_id: '', doctor_id: '', appointment_date: '', appointment_time: '' });
  const [submitting, setSubmitting] = useState(false);

  const filteredDoctors = form.department_id
    ? doctors?.filter((d) => String(d.department_id) === String(form.department_id))
    : doctors;

  const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await amhApi.createAppointment(form);
      setShowModal(false);
      refetch();
    } catch (err) {
      alert(err.message);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <PageHeader title="My Appointments" subtitle="Book and manage your hospital appointments"
        action={
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700">
            <FaPlus /> Book Appointment
          </button>
        }
      />
      <PageLoader loading={loading} error={error}>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <AppointmentTable appointments={appointments || []} />
        </div>
      </PageLoader>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Book New Appointment">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select value={form.department_id} onChange={(e) => setForm({ ...form, department_id: e.target.value, doctor_id: '' })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Department</option>
              {departments?.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Doctor</option>
              {filteredDoctors?.map((d) => <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={form.appointment_date} onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
            <select value={form.appointment_time} onChange={(e) => setForm({ ...form, appointment_time: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Time</option>
              {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button type="submit" disabled={submitting} className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-60">
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
