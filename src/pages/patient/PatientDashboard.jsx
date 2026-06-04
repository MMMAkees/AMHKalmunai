import { FaTicketAlt, FaCalendarCheck, FaStream, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import NotificationCard from '../../components/NotificationCard';
import AppointmentTable from '../../components/AppointmentTable';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapNotification } from '../../services/amhApi';
import { formatDate, formatTime } from '../../utils/formatters';

export default function PatientDashboard() {
  const { session } = useAuth();
  const { data: queue, loading: qLoad } = useFetch(() => amhApi.getPatientQueueStatus().catch(() => null));
  const { data: appointments, loading: aLoad, error: aErr } = useFetch(() => amhApi.getAppointments());
  const { data: notifications, loading: nLoad, error: nErr } = useFetch(() => amhApi.getNotifications().then((n) => n.map(mapNotification)));

  const loading = qLoad || aLoad || nLoad;
  const error = aErr || nErr;
  const upcoming = appointments?.find((a) => a.status === 'Approved' || a.status === 'Pending');

  return (
    <div>
      <PageHeader title="Patient Dashboard" subtitle={`Welcome back, ${session?.user?.name || 'Patient'}`} />

      <PageLoader loading={loading} error={error}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Active Token" value={queue?.yourToken || '—'} icon={FaTicketAlt} color="primary" subtitle={queue?.department || 'No active queue'} />
          <StatCard title="Upcoming Appointment" value={upcoming ? formatDate(upcoming.date) : '—'} icon={FaCalendarCheck} color="teal"
            subtitle={upcoming ? `${upcoming.doctorName} - ${formatTime(upcoming.time)}` : 'None scheduled'} />
          <StatCard title="Queue Position" value={queue ? `#${(queue.patientsAhead || 0) + 1}` : '—'} icon={FaStream} color="orange"
            subtitle={queue ? `${queue.patientsAhead} patients ahead` : 'Not in queue'} />
          <StatCard title="Est. Wait Time" value={queue ? `${queue.estimatedWaitTime} min` : '—'} icon={FaClock} color="purple" />
        </div>

        {queue && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Live Queue Status</h2>
                <Link to="/patient/queue" className="text-sm text-primary-600 hover:underline">View Details</Link>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-primary-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500">Current Token</p>
                  <p className="text-3xl font-bold text-primary-700">{queue.currentToken}</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500">Your Token</p>
                  <p className="text-3xl font-bold text-teal-700">{queue.yourToken}</p>
                </div>
              </div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-primary-600">{queue.progress || 0}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full" style={{ width: `${queue.progress || 0}%` }} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-primary-700 rounded-xl p-6 text-white">
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI Prediction</span>
              <h3 className="font-semibold text-lg mt-2">Estimated Waiting Time</h3>
              <p className="text-4xl font-bold mt-2">{queue.estimatedWaitTime || 0} Minutes</p>
              <p className="text-purple-200 text-sm mt-1">Based on queue load</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Appointments</h2>
            <AppointmentTable appointments={appointments?.slice(0, 5) || []} />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Notifications</h2>
            <div className="space-y-3">
              {(notifications || []).slice(0, 3).map((n) => (
                <NotificationCard key={n.id} {...n} />
              ))}
            </div>
          </div>
        </div>
      </PageLoader>
    </div>
  );
}
