import {
  FaUsers, FaUserMd, FaUserTie, FaCalendarCheck, FaTicketAlt, FaStream,
} from 'react-icons/fa';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area,
} from 'recharts';
import AnalyticsCard from '../../components/AnalyticsCard';
import ChartCard from '../../components/ChartCard';
import PageHeader from '../../components/PageHeader';
import QueueCard from '../../components/QueueCard';
import {
  adminStats, monthlyPatientFlow, departmentTraffic,
  queuePerformance, doctorUtilization, aiPredictions,
} from '../../data/analytics';
import { queues } from '../../data/queues';

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Hospital analytics and system overview" />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <AnalyticsCard title="Total Patients" value={adminStats.totalPatients.toLocaleString()} icon={FaUsers} color="primary" />
        <AnalyticsCard title="Total Doctors" value={adminStats.totalDoctors} icon={FaUserMd} color="teal" />
        <AnalyticsCard title="Total Staff" value={adminStats.totalStaff} icon={FaUserTie} color="green" />
        <AnalyticsCard title="Today's Appointments" value={adminStats.todayAppointments} icon={FaCalendarCheck} color="orange" />
        <AnalyticsCard title="Today's Tokens" value={adminStats.todayTokens} icon={FaTicketAlt} color="purple" />
        <AnalyticsCard title="Active Queues" value={adminStats.activeQueues} icon={FaStream} color="primary" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Patient Flow Analytics" subtitle="Monthly patient count">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyPatientFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="patients" stroke="#1565c0" fill="#1565c0" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="appointments" stroke="#00897b" fill="#00897b" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Department Traffic" subtitle="Patients by department today">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentTraffic} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="department" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip />
              <Bar dataKey="patients" fill="#1565c0" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Queue Performance" subtitle="Average waiting times (minutes)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={queuePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="avgWait" stroke="#f57c00" strokeWidth={3} dot={{ fill: '#f57c00', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Doctor Utilization" subtitle="Patient load vs capacity">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={doctorUtilization}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="doctor" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#1565c0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="capacity" fill="#e0e0e0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-600 to-primary-700 rounded-xl p-6 text-white">
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI - Phase 6</span>
          <h3 className="font-semibold text-lg mt-3">AI Waiting Time Prediction</h3>
          <p className="text-5xl font-bold mt-3">{aiPredictions.waitingTime.minutes} min</p>
          <p className="text-indigo-200 mt-1">Confidence: {aiPredictions.waitingTime.confidence}%</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">AI - Phase 6</span>
          <h3 className="font-semibold text-gray-900 mt-3">AI Patient Flow Analysis</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Peak Hours</p>
              <p className="text-sm font-semibold mt-1">{aiPredictions.peakHours[0]}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Busy Dept.</p>
              <p className="text-sm font-semibold mt-1">{aiPredictions.busyDepartments[0]}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Congestion</p>
              <p className="text-sm font-semibold text-orange-600 mt-1">{aiPredictions.queueCongestion}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-gray-900 mb-4">Active Queues Monitor</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {queues.slice(0, 6).map((q) => (
          <QueueCard key={q.id} {...q} />
        ))}
      </div>
    </div>
  );
}
