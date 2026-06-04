import PageHeader from '../../components/PageHeader';
import DataTable from '../../components/DataTable';
import { clinicSchedules } from '../../data/clinicSchedules';

export default function DoctorSchedule() {
  const mySchedule = clinicSchedules.filter((s) => s.doctorId === 'doc-003');

  const columns = [
    { key: 'clinicName', label: 'Clinic' },
    { key: 'day', label: 'Day' },
    { key: 'startTime', label: 'Start' },
    { key: 'endTime', label: 'End' },
  ];

  return (
    <div>
      <PageHeader title="My Schedule" subtitle="Weekly clinic schedule" />
      <DataTable columns={columns} data={mySchedule} actions={false} />

      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
            const schedule = mySchedule.find((s) => s.day.startsWith(day));
            return (
              <div key={day} className={`p-3 rounded-lg text-center text-sm ${schedule ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50 border border-gray-100'}`}>
                <p className="font-semibold text-gray-700">{day}</p>
                {schedule ? (
                  <p className="text-xs text-primary-600 mt-1">{schedule.startTime}-{schedule.endTime}</p>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">Off</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
