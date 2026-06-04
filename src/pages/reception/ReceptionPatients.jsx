import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import Pagination from '../../components/Pagination';
import { usePagination } from '../../hooks/usePagination';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapPatient } from '../../services/amhApi';

export default function ReceptionPatients() {
  const [search, setSearch] = useState('');
  const { data: patients, loading, error, refetch } = useFetch(
    () => amhApi.getPatients(search).then((p) => p.map(mapPatient)),
    [search]
  );
  const { paginatedData, currentPage, totalPages, goToPage, resetPage } = usePagination(patients || []);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', nic: '', mobile: '', email: '', age: '', gender: 'Male', address: '' });

  const columns = [
    { key: 'patient_code', label: 'Patient ID' },
    { key: 'name', label: 'Name' },
    { key: 'nic', label: 'NIC' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'gender', label: 'Gender' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await amhApi.createPatient({ ...form, age: Number(form.age) || null });
      setShowModal(false);
      refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <PageHeader title="Patient Management" subtitle="Register and search patients"
        action={<button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700"><FaUserPlus /> Register Patient</button>}
      />
      <div className="mb-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); resetPage(); }} placeholder="Search by NIC, Patient ID, or Mobile..." className="max-w-md" />
      </div>
      <PageLoader loading={loading} error={error} empty={!patients?.length}>
        <DataTable columns={columns} data={paginatedData} actions={false} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </PageLoader>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register New Patient">
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {['name', 'nic', 'mobile', 'email', 'age', 'address'].map((field) => (
            <div key={field} className={field === 'address' ? 'sm:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field}</label>
              <input type={field === 'age' ? 'number' : field === 'email' ? 'email' : 'text'} value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" required={field !== 'email'} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
              <option>Male</option><option>Female</option>
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
