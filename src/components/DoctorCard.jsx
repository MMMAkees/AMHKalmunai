import Badge from './Badge';
import { getInitials } from '../utils/formatters';

export default function DoctorCard({ name, specialization, department, availability, patientsToday, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-primary-600">{specialization}</p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{department}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={availability?.toLowerCase()}>{availability}</Badge>
            {patientsToday !== undefined && (
              <span className="text-xs text-gray-400">{patientsToday} patients today</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
