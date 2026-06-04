import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const typeConfig = {
  success: { icon: FaCheckCircle, bg: 'bg-green-50', border: 'border-green-100', iconColor: 'text-green-500' },
  warning: { icon: FaExclamationTriangle, bg: 'bg-amber-50', border: 'border-amber-100', iconColor: 'text-amber-500' },
  info: { icon: FaInfoCircle, bg: 'bg-blue-50', border: 'border-blue-100', iconColor: 'text-blue-500' },
};

export default function NotificationCard({ title, message, type = 'info', time, read = false }) {
  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className={`flex gap-4 p-4 rounded-xl border ${config.border} ${config.bg} ${read ? 'opacity-60' : ''} transition-opacity`}>
      <Icon className={`${config.iconColor} text-lg shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
          {!read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
        </div>
        <p className="text-sm text-gray-600 mt-1">{message}</p>
        {time && <p className="text-xs text-gray-400 mt-2">{time}</p>}
      </div>
    </div>
  );
}
