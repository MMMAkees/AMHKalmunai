import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import Badge from '../../components/Badge';
import { useFetch } from '../../hooks/useFetch';
import { amhApi } from '../../services/amhApi';
import { DOCTOR_STATUS, CONSULTATION_STATUS } from '../../utils/constants';

export default function DoctorQueuePage() {
  const { data, loading, error, refetch } = useFetch(() => amhApi.getDoctorQueue());
  const [queue, setQueue] = useState([]);
  const [availability, setAvailability] = useState('Available');

  useEffect(() => {
    if (data?.tokens) setQueue(data.tokens);
    if (data?.doctor?.availability) setAvailability(data.doctor.availability);
  }, [data]);

  const updateStatus = async (tokenDisplay, status) => {
    try {
      const tokens = await amhApi.getQueueTokens(data.queueId);
      const token = tokens.find((t) => t.token_display === tokenDisplay);
      if (token) {
        await amhApi.updateTokenStatus(token.id, status);
        refetch();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const setAvail = async (s) => {
    if (!data?.doctor?.id) return;
    try {
      await amhApi.updateDoctorAvailability(data.doctor.id, s);
      setAvailability(s);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <PageHeader title="Today's Queue" subtitle="Manage your patient queue" />
      <PageLoader loading={loading} error={error}>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Doctor Availability</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(DOCTOR_STATUS).map((s) => (
              <button key={s} onClick={() => setAvail(s)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${availability === s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {queue.map((p) => (
            <div key={p.token} className={`bg-white rounded-xl border shadow-sm p-5 ${p.status === 'In Consultation' ? 'border-primary-300 ring-2 ring-primary-100' : 'border-gray-100'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center">
                    <span className="font-bold text-primary-700 text-lg">{p.token}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{p.patientName}</h4>
                    <p className="text-sm text-gray-500">{p.patientId} · Wait: {p.waitTime} min</p>
                    <Badge variant={p.status?.toLowerCase()} className="mt-1">{p.status}</Badge>
                  </div>
                </div>
                {p.status !== 'Completed' && (
                  <div className="flex flex-wrap gap-2">
                    {Object.values(CONSULTATION_STATUS).map((s) => (
                      <button key={s} onClick={() => updateStatus(p.token, s)}
                        className="px-3 py-1.5 text-xs font-medium bg-gray-100 rounded-lg hover:bg-primary-100">{s}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </PageLoader>
    </div>
  );
}
