import { useAuth } from '@/app/(authenticated)/_context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useNotifications } from 'reapop';

const withAuth = (Component, page, action) => {
  return (props) => {
    const { hasPermission } = useAuth();
    const { notify } = useNotifications();
    const { push } = useRouter();

    useEffect(() => {
      console.log(page);
      console.log(action);
      console.log(hasPermission(page,action));
      if (!hasPermission(page, action)) {
        notify({ message: 'You are not authorized', status: 'danger' });
        push('/');    
      }
      return;
    }, []);

    return hasPermission(page, action) ? <Component {...props} /> : null;
  };
};

export default withAuth;
