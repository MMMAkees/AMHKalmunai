import { FaTicketAlt, FaCalendarCheck, FaStream, FaClock } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import PageHeader from '../../components/PageHeader';
import NotificationCard from '../../components/NotificationCard';
import AppointmentTable from '../../components/AppointmentTable';
import { patientQueue } from '../../data/queues';
import { appointments } from '../../data/appointments';
import { notifications } from '../../data/notifications';
import { aiPredictions } from '../../data/analytics';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  const myAppointments = appointments.filter((a) => a.patientId === 'PAT-001');
  const recentNotifs = notifications.slice(0, 3);

  return (
    <div>
      <PageHeader title="Patient Dashboard" subtitle="Welcome back, Mohamed Rizwan" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Active Token" value={patientQueue.yourToken} icon={FaTicketAlt} color="primary" subtitle={patientQueue.department} />
        <StatCard title="Upcoming Appointment" value="Jun 5" icon={FaCalendarCheck} color="teal" subtitle="Dr. A. Nazeer - 9:00 AM" />
        <StatCard title="Queue Position" value={`#${patientQueue.patientsAhead + 1}`} icon={FaStream} color="orange" subtitle={`${patientQueue.patientsAhead} patients ahead`} />
        <StatCard title="Est. Wait Time" value={`${patientQueue.estimatedWaitTime} min`} icon={FaClock} color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Live Queue Status</h2>
            <Link to="/patient/queue" className="text-sm text-primary-600 hover:underline">View Details</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-primary-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Current Token</p>
              <p className="text-3xl font-bold text-primary-700">{patientQueue.currentToken}</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">Your Token</p>
              <p className="text-3xl font-bold text-teal-700">{patientQueue.yourToken}</p>
            </div>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-primary-600">{patientQueue.progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full transition-all duration-1000" style={{ width: `${patientQueue.progress}%` }} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-primary-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI Prediction</span>
          </div>
          <h3 className="font-semibold text-lg mt-2">Estimated Waiting Time</h3>
          <p className="text-4xl font-bold mt-2">{aiPredictions.waitingTime.minutes} Minutes</p>
          <p className="text-purple-200 text-sm mt-1">Confidence: {aiPredictions.waitingTime.confidence}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Appointments</h2>
          <AppointmentTable appointments={myAppointments.slice(0, 3)} />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Notifications</h2>
          <div className="space-y-3">
            {recentNotifs.map((n) => (
              <NotificationCard key={n.id} {...n} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
