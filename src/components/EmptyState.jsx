import { FaInbox } from 'react-icons/fa';

export default function EmptyState({ icon: Icon = FaInbox, title = 'No data found', description = 'There are no items to display at the moment.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="text-gray-400 text-2xl" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 max-w-sm">{description}</p>
    </div>
  );
}
