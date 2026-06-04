import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import QueueCard from '../../components/QueueCard';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapQueue } from '../../services/amhApi';

export default function PatientQueue() {
  const { data: queue, loading: qLoad, error: qErr } = useFetch(() => amhApi.getPatientQueueStatus());
  const { data: queues, loading: lLoad, error: lErr } = useFetch(() => amhApi.getQueues().then((q) => q.map(mapQueue)));

  return (
    <div>
      <PageHeader title="Queue Tracking" subtitle="Monitor your position in real-time" />
      <PageLoader loading={qLoad && lLoad} error={qErr || lErr}>
        {queue && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-6">Your Queue Status - {queue.department}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Current Token', value: queue.currentToken, color: 'primary' },
                { label: 'Your Token', value: queue.yourToken, color: 'teal' },
                { label: 'Patients Ahead', value: queue.patientsAhead, color: 'orange' },
                { label: 'Est. Wait Time', value: `${queue.estimatedWaitTime}m`, color: 'purple' },
              ].map((item) => (
                <div key={item.label} className={`p-5 bg-${item.color}-50 rounded-xl text-center`}>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-4xl font-bold text-gray-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-teal-500 rounded-full" style={{ width: `${queue.progress || 0}%` }} />
            </div>
          </div>
        )}

        <h2 className="font-semibold text-gray-900 mb-4">Live Queue Panel</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(queues || []).map((q) => <QueueCard key={q.id} {...q} />)}
        </div>
      </PageLoader>
    </div>
  );
}
