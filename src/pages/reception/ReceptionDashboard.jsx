import { FaUsers, FaTicketAlt, FaCalendarCheck, FaClock } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';
import QueueCard from '../../components/QueueCard';
import { queues } from '../../data/queues';
import { appointments } from '../../data/appointments';
import { patients } from '../../data/patients';

export default function ReceptionDashboard() {
  const todayAppts = appointments.filter((a) => a.date === '2026-06-04' || a.date === '2026-06-05');

  return (
    <div>
      <PageHeader title="Reception Dashboard" subtitle="Patient registration and queue management" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Registered Patients" value={patients.length} icon={FaUsers} color="primary" />
        <StatCard title="Active Queues" value={queues.length} icon={FaTicketAlt} color="teal" />
        <StatCard title="Today's Appointments" value={todayAppts.length} icon={FaCalendarCheck} color="orange" />
        <StatCard title="Avg Wait Time" value="32 min" icon={FaClock} color="purple" />
      </div>

      <h2 className="font-semibold text-gray-900 mb-4">Active Queues Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {queues.slice(0, 6).map((q) => (
          <QueueCard key={q.id} {...q} />
        ))}
      </div>
    </div>
  );
}
