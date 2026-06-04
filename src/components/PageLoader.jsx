import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function PageLoader({ loading, error, children, empty, emptyTitle }) {
  if (loading) return <LoadingSkeleton />;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-center">
        <p className="font-medium">Failed to load data</p>
        <p className="text-sm mt-1">{error}</p>
        <p className="text-xs mt-2 text-red-500">Ensure Laragon MySQL is running and backend is started (npm run dev in backend/)</p>
      </div>
    );
  }
  if (empty) return <EmptyState title={emptyTitle || 'No data found'} />;
  return children;
}
