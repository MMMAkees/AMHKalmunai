import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Badge from '../../components/Badge';
import { doctorQueue } from '../../data/queues';
import { DOCTOR_STATUS, CONSULTATION_STATUS } from '../../utils/constants';

export default function DoctorQueuePage() {
  const [queue, setQueue] = useState(doctorQueue);
  const [availability, setAvailability] = useState('Available');

  const updateStatus = (token, status) => {
    setQueue(queue.map((p) => p.token === token ? { ...p, status } : p));
  };

  return (
    <div>
      <PageHeader title="Today's Queue" subtitle="Manage your patient queue" />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Doctor Availability</h3>
        <div className="flex flex-wrap gap-2">
          {Object.values(DOCTOR_STATUS).map((s) => (
            <button
              key={s}
              onClick={() => setAvailability(s)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                availability === s ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Current Status: <Badge variant={availability.toLowerCase()}>{availability}</Badge></p>
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
                  <p className="text-sm text-gray-500">{p.patientId} &middot; Wait: {p.waitTime} min</p>
                  <Badge variant={p.status.toLowerCase()} className="mt-1">{p.status}</Badge>
                </div>
              </div>
              {p.status !== 'Completed' && (
                <div className="flex flex-wrap gap-2">
                  {Object.values(CONSULTATION_STATUS).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(p.token, s)}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
