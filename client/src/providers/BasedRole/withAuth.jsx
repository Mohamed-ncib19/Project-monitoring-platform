// withAuth.js

import { useAuth } from '@/app/(authenticated)/_context/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useNotifications } from 'reapop';

const withAuth = (Component, page, action) => {
  return (props) => {
    const { hasPermission } = useAuth();
    const { notify } = useNotifications();

    useEffect(() => {
      console.log(hasPermission(page,action));

      if (!hasPermission(page, action)) {
        notify({ message: 'You are not authorized', status: 'danger' });
        redirect('/');    
      }
      return;
    }, [page, action]);

    return hasPermission(page, action) ? <Component {...props} /> : null;
  };
};

export default withAuth;
