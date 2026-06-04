import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import { useSearch } from '../../hooks/useSearch';
import { usePagination } from '../../hooks/usePagination';
import { patients } from '../../data/patients';

export default function DoctorPatients() {
  const { query, setQuery, filteredData } = useSearch(patients, ['name', 'id', 'nic']);
  const { paginatedData, currentPage, totalPages, goToPage, resetPage } = usePagination(filteredData);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'bloodGroup', label: 'Blood Group' },
    { key: 'mobile', label: 'Mobile' },
  ];

  return (
    <div>
      <PageHeader title="Patients" subtitle="View your patient records" />
      <div className="mb-4">
        <SearchBar value={query} onChange={(v) => { setQuery(v); resetPage(); }} placeholder="Search patients..." className="max-w-md" />
      </div>
      <DataTable columns={columns} data={paginatedData} actions={false} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
    </div>
  );
}
