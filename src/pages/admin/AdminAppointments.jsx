import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import AppointmentTable from '../../components/AppointmentTable';
import SearchBar from '../../components/SearchBar';
import { appointments } from '../../data/appointments';
import { useSearch } from '../../hooks/useSearch';

const filters = ['All', 'Pending', 'Approved', 'Completed', 'Cancelled'];

export default function AdminAppointments() {
  const { query, setQuery, filteredData } = useSearch(appointments, ['patientName', 'appointmentNumber', 'department', 'doctorName']);
  const [statusFilter, setStatusFilter] = useState('All');

  const displayed = statusFilter === 'All'
    ? filteredData
    : filteredData.filter((a) => a.status === statusFilter);

  return (
    <div>
      <PageHeader title="Appointment Management" subtitle="View and manage all appointments" />
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={query} onChange={setQuery} placeholder="Search appointments..." className="max-w-md" />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${statusFilter === f ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <AppointmentTable appointments={displayed} showPatient />
      </div>
    </div>
  );
}
