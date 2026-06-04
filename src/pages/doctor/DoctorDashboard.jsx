import { FaUsers, FaUserCheck, FaClipboardCheck, FaHourglassHalf } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import Badge from '../../components/Badge';
import { useFetch } from '../../hooks/useFetch';
import { amhApi } from '../../services/amhApi';

export default function DoctorDashboard() {
  const { data, loading, error } = useFetch(() => amhApi.getDoctorQueue());
  const tokens = data?.tokens || [];
  const completed = tokens.filter((p) => p.status === 'Completed').length;
  const pending = tokens.filter((p) => p.status === 'Waiting').length;
  const current = tokens.find((p) => p.status === 'In Consultation');

  return (
    <div>
      <PageHeader title="Doctor Dashboard" subtitle={data?.doctor ? `${data.doctor.name} - ${data.doctor.specialization}` : 'Loading...'} />
      <PageLoader loading={loading} error={error}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Today's Patients" value={tokens.length} icon={FaUsers} color="primary" />
          <StatCard title="Current Patient" value={current?.patientName?.split(' ')[0] || '—'} icon={FaUserCheck} color="teal" subtitle={current?.token} />
          <StatCard title="Completed" value={completed} icon={FaClipboardCheck} color="green" />
          <StatCard title="Pending" value={pending} icon={FaHourglassHalf} color="orange" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Current Queue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Token</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Patient</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Wait Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((p) => (
                  <tr key={p.token} className={`border-b border-gray-50 ${p.status === 'In Consultation' ? 'bg-blue-50' : ''}`}>
                    <td className="py-3 px-4 font-mono font-bold text-primary-600">{p.token}</td>
                    <td className="py-3 px-4">{p.patientName}</td>
                    <td className="py-3 px-4">{p.waitTime} min</td>
                    <td className="py-3 px-4"><Badge variant={p.status.toLowerCase()}>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageLoader>
    </div>
  );
}
