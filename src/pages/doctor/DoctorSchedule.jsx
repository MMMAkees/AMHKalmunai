import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import DataTable from '../../components/DataTable';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapClinic } from '../../services/amhApi';

export default function DoctorSchedule() {
  const { data: doctor } = useFetch(() => amhApi.getDoctorMe());
  const { data: schedules, loading, error } = useFetch(
    () => amhApi.getClinics(doctor?.id).then((s) => s.map(mapClinic)),
    [doctor?.id]
  );

  const columns = [
    { key: 'clinicName', label: 'Clinic' }, { key: 'day', label: 'Day' },
    { key: 'startTime', label: 'Start' }, { key: 'endTime', label: 'End' },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div>
      <PageHeader title="My Schedule" subtitle="Weekly clinic schedule" />
      <PageLoader loading={loading} error={error}>
        <DataTable columns={columns} data={schedules || []} actions={false} />
        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Overview</h3>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => {
              const schedule = schedules?.find((s) => s.day?.startsWith(day));
              return (
                <div key={day} className={`p-3 rounded-lg text-center text-sm ${schedule ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50 border border-gray-100'}`}>
                  <p className="font-semibold text-gray-700">{day}</p>
                  {schedule ? <p className="text-xs text-primary-600 mt-1">{schedule.startTime}-{schedule.endTime}</p> : <p className="text-xs text-gray-400 mt-1">Off</p>}
                </div>
              );
            })}
          </div>
        </div>
      </PageLoader>
    </div>
  );
}
