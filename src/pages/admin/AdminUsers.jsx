import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import { useSearch } from '../../hooks/useSearch';
import { usePagination } from '../../hooks/usePagination';
import { users } from '../../data/users';
import { FaPlus } from 'react-icons/fa';

const roleFilters = ['All', 'patient', 'doctor', 'reception', 'admin'];

export default function AdminUsers() {
  const [data, setData] = useState(users);
  const [roleFilter, setRoleFilter] = useState('All');
  const { query, setQuery, filteredData } = useSearch(data, ['name', 'email', 'role']);
  const filtered = roleFilter === 'All' ? filteredData : filteredData.filter((u) => u.role === roleFilter);
  const { paginatedData, currentPage, totalPages, goToPage, resetPage } = usePagination(filtered);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'patient', phone: '' });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', badge: true },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status', badge: true },
  ];

  const openAdd = () => { setEditItem(null); setForm({ name: '', email: '', role: 'patient', phone: '' }); setShowModal(true); };
  const openEdit = (row) => { setEditItem(row); setForm({ name: row.name, email: row.email, role: row.role, phone: row.phone }); setShowModal(true); };
  const handleDelete = (row) => { if (confirm('Delete this user?')) setData(data.filter((u) => u.id !== row.id)); };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      setData(data.map((u) => u.id === editItem.id ? { ...u, ...form } : u));
    } else {
      setData([...data, { ...form, id: `USR-${String(data.length + 1).padStart(3, '0')}`, status: 'Active', joinedDate: new Date().toISOString().split('T')[0] }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader title="User Management" subtitle="Manage patients, doctors, receptionists, and administrators"
        action={<button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"><FaPlus /> Add User</button>}
      />
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchBar value={query} onChange={(v) => { setQuery(v); resetPage(); }} placeholder="Search users..." className="max-w-md" />
        <div className="flex flex-wrap gap-2">
          {roleFilters.map((f) => (
            <button key={f} onClick={() => { setRoleFilter(f); resetPage(); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg capitalize ${roleFilter === f ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <DataTable columns={columns} data={paginatedData} onEdit={openEdit} onDelete={handleDelete} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit User' : 'Add User'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'phone'].map((f) => (
            <div key={f}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{f}</label>
              <input type={f === 'email' ? 'email' : 'text'} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" required />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="reception">Receptionist</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">{editItem ? 'Update' : 'Add'} User</button>
        </form>
      </Modal>
    </div>
  );
}
