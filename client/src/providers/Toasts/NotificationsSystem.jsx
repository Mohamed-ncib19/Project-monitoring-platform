'use client';
import NotificationsSystem, { bootstrapTheme, useNotifications } from 'reapop';

import Toast from '@/components/Toast/Toast';

const Notification = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <NotificationsSystem
      notifications={notifications}
      dismissNotification={(id) => dismissNotification(id)}
      theme={bootstrapTheme}
      components={{
        Notification: ({ notification, dismissNotification }) => (
          <Toast
            notification={notification}
            dismissNotification={dismissNotification}
          />
        ),
      }}
    />
  );
};

export default Notification;
