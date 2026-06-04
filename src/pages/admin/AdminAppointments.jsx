import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import AppointmentTable from '../../components/AppointmentTable';
import SearchBar from '../../components/SearchBar';
import { useFetch } from '../../hooks/useFetch';
import { amhApi } from '../../services/amhApi';

const filters = ['All', 'Pending', 'Approved', 'Completed', 'Cancelled'];

export default function AdminAppointments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { data: appointments, loading, error } = useFetch(
    () => amhApi.getAppointments({ search, status: statusFilter === 'All' ? undefined : statusFilter }),
    [search, statusFilter]
  );

  return (
    <div>
      <PageHeader title="Appointment Management" subtitle="View and manage all appointments" />
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search appointments..." className="max-w-md" />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${statusFilter === f ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>{f}</button>
          ))}
        </div>
      </div>
      <PageLoader loading={loading} error={error}>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <AppointmentTable appointments={appointments || []} showPatient />
        </div>
      </PageLoader>
    </div>
  );
}
