import PageHeader from '../../components/PageHeader';
import Badge from '../../components/Badge';
import { currentPatient } from '../../data/patients';
import { getInitials } from '../../utils/formatters';

export default function PatientProfile() {
  const p = currentPatient;
  const fields = [
    { label: 'Patient ID', value: p.id },
    { label: 'NIC', value: p.nic },
    { label: 'Mobile', value: p.mobile },
    { label: 'Email', value: p.email },
    { label: 'Age', value: p.age },
    { label: 'Gender', value: p.gender },
    { label: 'Blood Group', value: p.bloodGroup },
    { label: 'Address', value: p.address },
    { label: 'Registered', value: p.registeredDate },
  ];

  return (
    <div>
      <PageHeader title="My Profile" subtitle="View and manage your personal information" />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-2xl">
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
            {getInitials(p.name)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{p.name}</h2>
            <p className="text-gray-500">{p.email}</p>
            <Badge variant="active" className="mt-2">Active Patient</Badge>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.label} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 font-medium">{f.label}</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
