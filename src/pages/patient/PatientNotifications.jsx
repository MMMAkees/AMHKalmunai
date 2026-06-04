import PageHeader from '../../components/PageHeader';
import PageLoader from '../../components/PageLoader';
import NotificationCard from '../../components/NotificationCard';
import { useFetch } from '../../hooks/useFetch';
import { amhApi, mapNotification } from '../../services/amhApi';

export default function PatientNotifications() {
  const { data: notifications, loading, error } = useFetch(() =>
    amhApi.getNotifications().then((n) => n.map(mapNotification))
  );

  return (
    <div>
      <PageHeader title="Notifications" subtitle="Stay updated on your appointments and queue status" />
      <PageLoader loading={loading} error={error} empty={!notifications?.length}>
        <div className="space-y-3">
          {notifications?.map((n) => <NotificationCard key={n.id} {...n} />)}
        </div>
      </PageLoader>
    </div>
  );
}
