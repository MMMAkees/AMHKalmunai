import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapClinic } from '../../services/amhApi';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdminClinics() {
  const { data: schedules, loading, error, refetch } = useFetch(() => amhApi.getClinics().then((s) => s.map(mapClinic)));
  const { data: doctors } = useFetch(() => amhApi.getDoctors());
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ clinic_name: '', doctor_id: '', day_of_week: 'Monday', start_time: '08:00', end_time: '16:00' });

  const columns = [
    { key: 'clinicName', label: 'Clinic' }, { key: 'doctorName', label: 'Doctor' },
    { key: 'day', label: 'Day' }, { key: 'startTime', label: 'Start' }, { key: 'endTime', label: 'End' },
  ];

  const openAdd = () => { setEditItem(null); setShowModal(true); };
  const openEdit = (row) => {
    setEditItem(row);
    setForm({ clinic_name: row.clinic_name || row.clinicName, doctor_id: row.doctor_id, day_of_week: row.day_of_week || row.day, start_time: row.start_time || row.startTime, end_time: row.end_time || row.endTime });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) await amhApi.updateClinic(editItem.id, form);
      else await amhApi.createClinic(form);
      setShowModal(false);
      refetch();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (row) => {
    if (confirm('Delete schedule?')) { await amhApi.deleteClinic(row.id); refetch(); }
  };

  return (
    <div>
      <PageHeader title="Clinic Schedule Management" subtitle="Manage clinic schedules"
        action={<button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"><FaPlus /> Add Schedule</button>}
      />
      <PageLoader loading={loading} error={error}>
        <DataTable columns={columns} data={schedules || []} onEdit={openEdit} onDelete={handleDelete} />
      </PageLoader>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Schedule' : 'Add Schedule'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
            <input value={form.clinic_name} onChange={(e) => setForm({ ...form, clinic_name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select value={form.doctor_id} onChange={(e) => setForm({ ...form, doctor_id: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Doctor</option>
              {doctors?.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
            <select value={form.day_of_week} onChange={(e) => setForm({ ...form, day_of_week: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
              <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
              <input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">{editItem ? 'Update' : 'Add'}</button>
        </form>
      </Modal>
    </div>
  );
}
