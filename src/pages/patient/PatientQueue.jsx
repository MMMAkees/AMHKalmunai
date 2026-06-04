import PageHeader from '../../components/PageHeader';
import QueueCard from '../../components/QueueCard';
import { patientQueue, queues } from '../../data/queues';
import { aiPredictions } from '../../data/analytics';

export default function PatientQueue() {
  return (
    <div>
      <PageHeader title="Queue Tracking" subtitle="Monitor your position in real-time" />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-6">Your Queue Status - {patientQueue.department}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-5 bg-primary-50 rounded-xl text-center">
            <p className="text-sm text-gray-500">Current Token</p>
            <p className="text-4xl font-bold text-primary-700 mt-1">{patientQueue.currentToken}</p>
          </div>
          <div className="p-5 bg-teal-50 rounded-xl text-center">
            <p className="text-sm text-gray-500">Your Token</p>
            <p className="text-4xl font-bold text-teal-700 mt-1">{patientQueue.yourToken}</p>
          </div>
          <div className="p-5 bg-orange-50 rounded-xl text-center">
            <p className="text-sm text-gray-500">Patients Ahead</p>
            <p className="text-4xl font-bold text-orange-700 mt-1">{patientQueue.patientsAhead}</p>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl text-center">
            <p className="text-sm text-gray-500">Est. Wait Time</p>
            <p className="text-4xl font-bold text-purple-700 mt-1">{patientQueue.estimatedWaitTime}m</p>
          </div>
        </div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Queue Progress</span>
          <span className="font-semibold text-primary-600">{patientQueue.progress}%</span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 via-teal-500 to-green-500 rounded-full transition-all duration-1000" style={{ width: `${patientQueue.progress}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-indigo-600 to-primary-700 rounded-xl p-6 text-white">
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI Feature - Phase 6</span>
          <h3 className="font-semibold text-lg mt-3">AI Waiting Time Prediction</h3>
          <p className="text-5xl font-bold mt-3">{aiPredictions.waitingTime.minutes} Minutes</p>
          <p className="text-indigo-200 mt-2">Confidence: {aiPredictions.waitingTime.confidence}%</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">AI Feature - Phase 6</span>
          <h3 className="font-semibold text-gray-900 mt-3">AI Patient Flow Analysis</h3>
          <div className="space-y-3 mt-4">
            <div>
              <p className="text-sm text-gray-500">Peak Hours</p>
              <p className="font-medium">{aiPredictions.peakHours.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Busy Departments</p>
              <p className="font-medium">{aiPredictions.busyDepartments.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Queue Congestion</p>
              <p className="font-medium text-orange-600">{aiPredictions.queueCongestion}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-gray-900 mb-4">Live Queue Panel - All Departments</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {queues.map((q) => (
          <QueueCard key={q.id} {...q} />
        ))}
      </div>
    </div>
  );
}
