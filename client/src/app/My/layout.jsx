'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Loader from '../../components/loader/page';
import NavbarSideBarLayout from '../../layout/navbar-sidebar/page';
import { DecodeToken } from '../../utils/auth/DecodeToken';
import UserRoute from '../api/routes/user/userRoute';

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const decoded = await DecodeToken(session.token);
          const res = await UserRoute.getUserInfo(
            decoded.username,
            session.token,
          );
          if (res.ok) {
            setUser({
              firstname: res.data.firstname,
              lastname: res.data.lastname,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!session && status !== 'loading') {
      router.push(
        `/auth/login?callbackUrl=${encodeURIComponent(router.asPath)}`,
      );
    } else if (session) {
      fetchData();
    }
  }, [session]);

  if (status === 'loading' || !session || user === null) {
    return <Loader />;
  }

  return (
    <NavbarSideBarLayout user={user}>
      <div className="layout">{children}</div>
    </NavbarSideBarLayout>
  );
};

export default Layout;
