import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import { clinicSchedules as initialSchedules } from '../../data/clinicSchedules';
import { doctors } from '../../data/doctors';
import { FaPlus } from 'react-icons/fa';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AdminClinics() {
  const [data, setData] = useState(initialSchedules);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ clinicName: '', doctorId: '', day: 'Monday', startTime: '08:00', endTime: '16:00' });

  const columns = [
    { key: 'clinicName', label: 'Clinic' },
    { key: 'doctorName', label: 'Doctor' },
    { key: 'day', label: 'Day' },
    { key: 'startTime', label: 'Start' },
    { key: 'endTime', label: 'End' },
  ];

  const openAdd = () => { setEditItem(null); setForm({ clinicName: '', doctorId: '', day: 'Monday', startTime: '08:00', endTime: '16:00' }); setShowModal(true); };
  const openEdit = (row) => { setEditItem(row); setForm({ clinicName: row.clinicName, doctorId: row.doctorId, day: row.day, startTime: row.startTime, endTime: row.endTime }); setShowModal(true); };
  const handleDelete = (row) => { if (confirm('Delete schedule?')) setData(data.filter((s) => s.id !== row.id)); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = doctors.find((d) => d.id === form.doctorId);
    const payload = { ...form, doctorName: doc?.name || '' };
    if (editItem) {
      setData(data.map((s) => s.id === editItem.id ? { ...s, ...payload } : s));
    } else {
      setData([...data, { ...payload, id: `CS-${String(data.length + 1).padStart(3, '0')}` }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader title="Clinic Schedule Management" subtitle="Manage clinic schedules"
        action={<button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"><FaPlus /> Add Schedule</button>}
      />
      <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={handleDelete} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Schedule' : 'Add Schedule'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
            <input value={form.clinicName} onChange={(e) => setForm({ ...form, clinicName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select Doctor</option>
              {doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
            <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">{editItem ? 'Update' : 'Add'}</button>
        </form>
      </Modal>
    </div>
  );
}
