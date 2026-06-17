const variants = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-600',
  available: 'bg-green-100 text-green-800',
  busy: 'bg-red-100 text-red-800',
  break: 'bg-orange-100 text-orange-800',
  leave: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-700',
  waiting: 'bg-amber-100 text-amber-800',
  called: 'bg-indigo-100 text-indigo-800',
  'in consultation': 'bg-blue-100 text-blue-800',
  skipped: 'bg-red-100 text-red-800',
  recalled: 'bg-orange-100 text-orange-800',
  referred: 'bg-teal-100 text-teal-800',
  patient: 'bg-blue-100 text-blue-800',
  doctor: 'bg-green-100 text-green-800',
  reception: 'bg-purple-100 text-purple-800',
  admin: 'bg-red-100 text-red-800',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  const style = variants[variant?.toLowerCase()] || variants.default;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style} ${className}`}>
      {children}
    </span>
  );
}
