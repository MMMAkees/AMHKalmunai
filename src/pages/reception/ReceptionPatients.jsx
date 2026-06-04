import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import { useSearch } from '../../hooks/useSearch';
import { usePagination } from '../../hooks/usePagination';
import { patients } from '../../data/patients';
import { FaUserPlus } from 'react-icons/fa';

export default function ReceptionPatients() {
  const { query, setQuery, filteredData } = useSearch(patients, ['name', 'nic', 'id', 'mobile']);
  const { paginatedData, currentPage, totalPages, goToPage, resetPage } = usePagination(filteredData);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', nic: '', mobile: '', email: '', age: '', gender: 'Male', address: '' });

  const columns = [
    { key: 'id', label: 'Patient ID' },
    { key: 'name', label: 'Name' },
    { key: 'nic', label: 'NIC' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'gender', label: 'Gender' },
  ];

  return (
    <div>
      <PageHeader
        title="Patient Management"
        subtitle="Register and search patients"
        action={
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 shadow-sm">
            <FaUserPlus /> Register Patient
          </button>
        }
      />

      <div className="mb-4">
        <SearchBar
          value={query}
          onChange={(v) => { setQuery(v); resetPage(); }}
          placeholder="Search by NIC, Patient ID, or Mobile Number..."
          className="max-w-md"
        />
      </div>

      <DataTable columns={columns} data={paginatedData} actions={false} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register New Patient">
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          {['name', 'nic', 'mobile', 'email', 'age', 'address'].map((field) => (
            <div key={field} className={field === 'address' ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
              <input
                type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                required={field !== 'email'}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="w-full py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700">Register Patient</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
