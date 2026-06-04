import { FaUsers, FaUserMd, FaUserTie, FaCalendarCheck, FaTicketAlt, FaStream } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import AnalyticsCard from '../../components/AnalyticsCard';
import ChartCard from '../../components/ChartCard';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import QueueCard from '../../components/QueueCard';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapQueue } from '../../services/amhApi';

export default function AdminDashboard() {
  const { data: stats, loading: sLoad, error: sErr } = useFetch(() => amhApi.getDashboardStats());
  const { data: monthlyFlow, loading: mLoad } = useFetch(() => amhApi.getMonthlyFlow());
  const { data: departmentTraffic, loading: dLoad } = useFetch(() => amhApi.getDepartmentTraffic());
  const { data: queuePerformance, loading: qLoad } = useFetch(() => amhApi.getQueuePerformance());
  const { data: doctorUtilization, loading: uLoad } = useFetch(() => amhApi.getDoctorUtilization());
  const { data: queues, loading: lLoad } = useFetch(() => amhApi.getQueues().then((q) => q.map(mapQueue)));

  const loading = sLoad || mLoad || dLoad || qLoad || uLoad || lLoad;

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Hospital analytics and system overview" />
      <PageLoader loading={loading} error={sErr}>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <AnalyticsCard title="Total Patients" value={stats?.totalPatients?.toLocaleString() || 0} icon={FaUsers} color="primary" />
          <AnalyticsCard title="Total Doctors" value={stats?.totalDoctors || 0} icon={FaUserMd} color="teal" />
          <AnalyticsCard title="Total Staff" value={stats?.totalStaff || 0} icon={FaUserTie} color="green" />
          <AnalyticsCard title="Today's Appointments" value={stats?.todayAppointments || 0} icon={FaCalendarCheck} color="orange" />
          <AnalyticsCard title="Today's Tokens" value={stats?.todayTokens || 0} icon={FaTicketAlt} color="purple" />
          <AnalyticsCard title="Active Queues" value={stats?.activeQueues || 0} icon={FaStream} color="primary" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Patient Flow Analytics" subtitle="Monthly patient count">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyFlow || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip /><Legend />
                <Area type="monotone" dataKey="patients" stroke="#1565c0" fill="#1565c0" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="appointments" stroke="#00897b" fill="#00897b" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Department Traffic" subtitle="Patients by department">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentTraffic || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="department" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip />
                <Bar dataKey="patients" fill="#1565c0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Queue Performance" subtitle="Average waiting times">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={queuePerformance || []}>
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
              <BarChart data={doctorUtilization || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="doctor" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip /><Legend />
                <Bar dataKey="patients" fill="#1565c0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" fill="#e0e0e0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <h2 className="font-semibold text-gray-900 mb-4">Active Queues Monitor</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(queues || []).map((q) => <QueueCard key={q.id} {...q} />)}
        </div>
      </PageLoader>
    </div>
  );
}
