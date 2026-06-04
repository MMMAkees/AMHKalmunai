import Badge from './Badge';
import { formatDate, formatTime } from '../utils/formatters';

export default function AppointmentTable({ appointments, showPatient = false }) {
  if (!appointments.length) {
    return (
      <div className="text-center py-8 text-gray-400">No appointments found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Appt. No.</th>
            {showPatient && <th className="text-left py-3 px-4 font-semibold text-gray-600">Patient</th>}
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Department</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Doctor</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Time</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-4 font-mono text-primary-600">{apt.appointmentNumber}</td>
              {showPatient && <td className="py-3 px-4">{apt.patientName}</td>}
              <td className="py-3 px-4">{apt.department}</td>
              <td className="py-3 px-4">{apt.doctorName}</td>
              <td className="py-3 px-4">{formatDate(apt.date)}</td>
              <td className="py-3 px-4">{formatTime(apt.time)}</td>
              <td className="py-3 px-4">
                <Badge variant={apt.status?.toLowerCase()}>{apt.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
