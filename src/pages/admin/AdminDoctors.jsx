import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import DoctorCard from '../../components/DoctorCard';
import Modal from '../../components/Modal';
import { doctors } from '../../data/doctors';
import { departments } from '../../data/departments';
import { DOCTOR_STATUS } from '../../utils/constants';
import { FaPlus } from 'react-icons/fa';

export default function AdminDoctors() {
  const [data, setData] = useState(doctors);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', specialization: '', departmentId: '', availability: 'Available' });

  const filtered = data.filter((d) =>
    [d.name, d.specialization, d.department].some((v) => v.toLowerCase().includes(query.toLowerCase()))
  );

  const openAdd = () => { setEditItem(null); setForm({ name: '', specialization: '', departmentId: '', availability: 'Available' }); setShowModal(true); };
  const openEdit = (doc) => { setEditItem(doc); setForm({ name: doc.name, specialization: doc.specialization, departmentId: doc.departmentId, availability: doc.availability }); setShowModal(true); };
  const handleDelete = (doc) => { if (confirm('Remove this doctor?')) setData(data.filter((d) => d.id !== doc.id)); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dept = departments.find((d) => d.id === form.departmentId);
    if (editItem) {
      setData(data.map((d) => d.id === editItem.id ? { ...d, ...form, department: dept?.name } : d));
    } else {
      setData([...data, { ...form, id: `doc-${String(data.length + 1).padStart(3, '0')}`, department: dept?.name, email: '', phone: '', experience: '', patientsToday: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader title="Doctor Management" subtitle="Manage doctor profiles and availability"
        action={<button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"><FaPlus /> Add Doctor</button>}
      />
      <div className="mb-6"><SearchBar value={query} onChange={setQuery} placeholder="Search doctors..." className="max-w-md" /></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <div key={doc.id} className="relative group">
            <DoctorCard {...doc} onClick={() => openEdit(doc)} />
            <button onClick={() => handleDelete(doc)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-lg transition-opacity">Delete</button>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Doctor' : 'Add Doctor'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <select value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
              {Object.values(DOCTOR_STATUS).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">{editItem ? 'Update' : 'Add'} Doctor</button>
        </form>
      </Modal>
    </div>
  );
}
