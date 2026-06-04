import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import SearchBar from '../../components/SearchBar';
import DoctorCard from '../../components/DoctorCard';
import Modal from '../../components/Modal';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapDoctor } from '../../services/amhApi';
import { DOCTOR_STATUS } from '../../utils/constants';

export default function AdminDoctors() {
  const [search, setSearch] = useState('');
  const { data: doctors, loading, error, refetch } = useFetch(
    () => amhApi.getDoctors(search).then((d) => d.map(mapDoctor)),
    [search]
  );
  const { data: departments } = useFetch(() => amhApi.getDepartments());
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ user_id: '', department_id: '', specialization: '', availability: 'Available' });

  const openEdit = (doc) => {
    setEditItem(doc);
    setForm({ user_id: doc.user_id, department_id: doc.department_id, specialization: doc.specialization, availability: doc.availability });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) await amhApi.updateDoctor(editItem.id, form);
      else await amhApi.createDoctor(form);
      setShowModal(false);
      refetch();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (doc) => {
    if (confirm('Remove this doctor?')) { await amhApi.deleteDoctor(doc.id); refetch(); }
  };

  return (
    <div>
      <PageHeader title="Doctor Management" subtitle="Manage doctor profiles and availability" />
      <div className="mb-6"><SearchBar value={search} onChange={setSearch} placeholder="Search doctors..." className="max-w-md" /></div>
      <PageLoader loading={loading} error={error}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors?.map((doc) => (
            <div key={doc.id} className="relative group">
              <DoctorCard {...doc} onClick={() => openEdit(doc)} />
              <button onClick={() => handleDelete(doc)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-lg">Delete</button>
            </div>
          ))}
        </div>
      </PageLoader>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Doctor' : 'Add Doctor'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!editItem && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID (linked account)</label>
              <input type="number" value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select value={form.department_id} onChange={(e) => setForm({ ...form, department_id: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required>
              <option value="">Select</option>
              {departments?.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
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
