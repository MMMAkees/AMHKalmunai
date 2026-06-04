import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import DepartmentCard from '../../components/DepartmentCard';
import Modal from '../../components/Modal';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapDepartment } from '../../services/amhApi';

export default function AdminDepartments() {
  const { data: departments, loading, error, refetch } = useFetch(() => amhApi.getDepartments().then((d) => d.map(mapDepartment)));
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ dept_code: '', name: '', head_name: '', floor: '', capacity: '' });

  const openAdd = () => { setEditItem(null); setForm({ dept_code: '', name: '', head_name: '', floor: '', capacity: '' }); setShowModal(true); };
  const openEdit = (dept) => { setEditItem(dept); setForm({ dept_code: dept.dept_code || dept.code, name: dept.name, head_name: dept.head_name || dept.head, floor: dept.floor, capacity: dept.capacity }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, capacity: Number(form.capacity) };
      if (editItem) await amhApi.updateDepartment(editItem.id, payload);
      else await amhApi.createDepartment(payload);
      setShowModal(false);
      refetch();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (dept) => {
    if (confirm('Delete department?')) { await amhApi.deleteDepartment(dept.id); refetch(); }
  };

  return (
    <div>
      <PageHeader title="Department Management" subtitle="Manage hospital departments"
        action={<button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"><FaPlus /> Add Department</button>}
      />
      <PageLoader loading={loading} error={error}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {departments?.map((dept) => (
            <div key={dept.id} className="relative group">
              <DepartmentCard name={dept.name} description={`Head: ${dept.head || dept.head_name} | Floor: ${dept.floor}`} code={dept.code || dept.dept_code} />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-1">
                <button onClick={() => openEdit(dept)} className="px-2 py-1 text-xs bg-primary-100 text-primary-600 rounded-lg">Edit</button>
                <button onClick={() => handleDelete(dept)} className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </PageLoader>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[{ k: 'dept_code', l: 'Department Code' }, { k: 'name', l: 'Name' }, { k: 'head_name', l: 'Head' }, { k: 'floor', l: 'Floor' }].map(({ k, l }) => (
            <div key={k}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{l}</label>
              <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required />
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
