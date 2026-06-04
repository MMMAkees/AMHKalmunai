import PageHeader from '../../components/PageHeader';
import NotificationCard from '../../components/NotificationCard';
import { notifications } from '../../data/notifications';

export default function PatientNotifications() {
  return (
    <div>
      <PageHeader title="Notifications" subtitle="Stay updated on your appointments and queue status" />
      <div className="space-y-3">
        {notifications.map((n) => (
          <NotificationCard key={n.id} {...n} />
        ))}
      </div>
    </div>
  );
}
