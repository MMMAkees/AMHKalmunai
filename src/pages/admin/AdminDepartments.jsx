import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import DepartmentCard from '../../components/DepartmentCard';
import Modal from '../../components/Modal';
import { departments as initialDepts } from '../../data/departments';
import { services } from '../../data/hospital';
import { FaPlus } from 'react-icons/fa';

export default function AdminDepartments() {
  const [data, setData] = useState(initialDepts);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', code: '', head: '', floor: '', capacity: '' });

  const openAdd = () => { setEditItem(null); setForm({ name: '', code: '', head: '', floor: '', capacity: '' }); setShowModal(true); };
  const openEdit = (dept) => { setEditItem(dept); setForm({ name: dept.name, code: dept.code, head: dept.head, floor: dept.floor, capacity: dept.capacity }); setShowModal(true); };
  const handleDelete = (dept) => { if (confirm('Delete department?')) setData(data.filter((d) => d.id !== dept.id)); };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, capacity: Number(form.capacity), activeQueues: 0 };
    if (editItem) {
      setData(data.map((d) => d.id === editItem.id ? { ...d, ...payload } : d));
    } else {
      setData([...data, { ...payload, id: `dept-${String(data.length + 1).padStart(3, '0')}` }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader title="Department Management" subtitle="Manage hospital departments"
        action={<button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"><FaPlus /> Add Department</button>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((dept) => {
          const svc = services.find((s) => s.name === dept.name);
          return (
            <div key={dept.id} className="relative group">
              <DepartmentCard name={dept.name} description={`Head: ${dept.head} | Floor: ${dept.floor} | Capacity: ${dept.capacity}`} icon={svc?.icon} code={dept.code} />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                <button onClick={() => openEdit(dept)} className="px-2 py-1 text-xs bg-primary-100 text-primary-600 rounded-lg">Edit</button>
                <button onClick={() => handleDelete(dept)} className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-lg">Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'code', 'head', 'floor'].map((f) => (
            <div key={f}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{f === 'code' ? 'Department Code' : f}</label>
              <input value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">{editItem ? 'Update' : 'Add'}</button>
        </form>
      </Modal>
    </div>
  );
}
