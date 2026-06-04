import Badge from './Badge';

export default function StatCard({ title, value, icon: Icon, color = 'primary', subtitle, trend }) {
  const colors = {
    primary: 'from-primary-500 to-primary-700',
    teal: 'from-teal-500 to-teal-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700',
    purple: 'from-purple-500 to-purple-700',
    red: 'from-red-500 to-red-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <Badge variant={trend > 0 ? 'success' : 'danger'} className="mt-2">
              {trend > 0 ? '+' : ''}{trend}%
            </Badge>
          )}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-md`}>
            <Icon className="text-white text-xl" />
          </div>
        )}
      </div>
    </div>
  );
}
