import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import QueueCard from '../../components/QueueCard';
import ChartCard from '../../components/ChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapQueue } from '../../services/amhApi';

export default function AdminQueue() {
  const { data: queues, loading, error } = useFetch(() => amhApi.getQueues().then((q) => q.map(mapQueue)));
  const { data: departmentTraffic } = useFetch(() => amhApi.getDepartmentTraffic());

  const totalWaiting = queues?.reduce((s, q) => s + (q.totalWaiting || 0), 0) || 0;
  const avgWait = queues?.length ? Math.round(queues.reduce((s, q) => s + (q.avgWaitTime || 0), 0) / queues.length) : 0;

  return (
    <div>
      <PageHeader title="Queue Management" subtitle="Monitor all active queues and department performance" />
      <PageLoader loading={loading} error={error}>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <p className="text-sm text-gray-500">Total Active Queues</p>
            <p className="text-3xl font-bold text-primary-700">{queues?.length || 0}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <p className="text-sm text-gray-500">Total Waiting</p>
            <p className="text-3xl font-bold text-orange-600">{totalWaiting}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
            <p className="text-sm text-gray-500">Avg Wait Time</p>
            <p className="text-3xl font-bold text-teal-600">{avgWait}m</p>
          </div>
        </div>
        <ChartCard title="Department Performance" subtitle="Patient volume by department">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentTraffic || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="patients" fill="#00897b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <h2 className="font-semibold text-gray-900 mb-4 mt-8">All Active Queues</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {queues?.map((q) => <QueueCard key={q.id} {...q} />)}
        </div>
      </PageLoader>
    </div>
  );
}
