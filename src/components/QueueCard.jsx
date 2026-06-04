import Badge from './Badge';

export default function QueueCard({ department, currentToken, totalWaiting, avgWaitTime, doctorName, status = 'Active' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{department}</h3>
        <Badge variant={status === 'Active' ? 'success' : 'default'}>{status}</Badge>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Current Token</p>
          <p className="text-xl font-bold text-primary-700">{currentToken}</p>
        </div>
        <div className="text-center p-3 bg-teal-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Waiting</p>
          <p className="text-xl font-bold text-teal-700">{totalWaiting}</p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Avg Wait</p>
          <p className="text-xl font-bold text-orange-700">{avgWaitTime}m</p>
        </div>
      </div>
      {doctorName && (
        <p className="text-sm text-gray-500 mt-3">Doctor: <span className="font-medium text-gray-700">{doctorName}</span></p>
      )}
    </div>
  );
}
