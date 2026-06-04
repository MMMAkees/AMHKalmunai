import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import { useState } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapPatient } from '../../services/amhApi';

export default function DoctorPatients() {
  const [search, setSearch] = useState('');
  const { data: patients, loading, error } = useFetch(
    () => amhApi.getPatients(search).then((p) => p.map(mapPatient)),
    [search]
  );
  const { paginatedData, currentPage, totalPages, goToPage, resetPage } = usePagination(patients || []);

  const columns = [
    { key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' }, { key: 'blood_group', label: 'Blood Group' }, { key: 'mobile', label: 'Mobile' },
  ];

  return (
    <div>
      <PageHeader title="Patients" subtitle="View your patient records" />
      <div className="mb-4"><SearchBar value={search} onChange={(v) => { setSearch(v); resetPage(); }} placeholder="Search patients..." className="max-w-md" /></div>
      <PageLoader loading={loading} error={error}>
        <DataTable columns={columns} data={paginatedData} actions={false} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </PageLoader>
    </div>
  );
}
