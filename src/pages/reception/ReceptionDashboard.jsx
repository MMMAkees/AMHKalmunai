import { FaUsers, FaTicketAlt, FaCalendarCheck, FaClock } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import QueueCard from '../../components/QueueCard';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapQueue } from '../../services/amhApi';

export default function ReceptionDashboard() {
  const { data: patients, loading: pLoad } = useFetch(() => amhApi.getPatients());
  const { data: queues, loading: qLoad, error } = useFetch(() => amhApi.getQueues().then((q) => q.map(mapQueue)));
  const { data: appointments, loading: aLoad } = useFetch(() => amhApi.getAppointments());

  const todayAppts = appointments?.filter((a) => a.date === new Date().toISOString().split('T')[0]) || [];
  const avgWait = queues?.length
    ? Math.round(queues.reduce((s, q) => s + (q.avgWaitTime || 0), 0) / queues.length)
    : 0;

  return (
    <div>
      <PageHeader title="Reception Dashboard" subtitle="Patient registration and queue management" />
      <PageLoader loading={pLoad || qLoad || aLoad} error={error}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Registered Patients" value={patients?.length || 0} icon={FaUsers} color="primary" />
          <StatCard title="Active Queues" value={queues?.length || 0} icon={FaTicketAlt} color="teal" />
          <StatCard title="Today's Appointments" value={todayAppts.length} icon={FaCalendarCheck} color="orange" />
          <StatCard title="Avg Wait Time" value={`${avgWait} min`} icon={FaClock} color="purple" />
        </div>
        <h2 className="font-semibold text-gray-900 mb-4">Active Queues Overview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(queues || []).map((q) => <QueueCard key={q.id} {...q} />)}
        </div>
      </PageLoader>
    </div>
  );
}
