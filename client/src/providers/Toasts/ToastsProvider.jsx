'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NotificationsProvider, setUpNotifications } from 'reapop';

const Notifications = dynamic(() => import('./NotificationsSystem'), {
  ssr: false,
});

const ToastsProvider = ({ children }) => {
  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        position: 'top-right',
        dismissible: true,
        dismissAfter: 2000,
      },
    });
  }, []);

  return (
    <NotificationsProvider>
      {children}
      <Notifications />
    </NotificationsProvider>
  );
};

export default ToastsProvider;
