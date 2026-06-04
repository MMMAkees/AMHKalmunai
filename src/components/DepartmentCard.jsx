import {
  FaHospital, FaAmbulance, FaStethoscope, FaProcedures, FaBaby,
  FaBone, FaBrain, FaFemale, FaTooth, FaXRay, FaTint, FaFlask, FaPills,
} from 'react-icons/fa';

const iconMap = {
  FaHospital, FaAmbulance, FaStethoscope, FaProcedures, FaBaby,
  FaBone, FaBrain, FaFemale, FaTooth, FaXRay, FaTint, FaFlask, FaPills,
};

export default function DepartmentCard({ name, description, icon, code }) {
  const Icon = iconMap[icon] || FaHospital;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-4 transition-colors">
        <Icon className="text-primary-600 text-xl" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
      {code && <span className="text-xs font-mono text-primary-500 bg-primary-50 px-2 py-0.5 rounded">{code}</span>}
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{description}</p>
    </div>
  );
}
