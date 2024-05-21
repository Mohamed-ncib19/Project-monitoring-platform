'use client'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import NavbarSideBarLayout from '../../../layout/navbar-sidebar/page';
import {DecodeToken} from '../../../utils/auth/DecodeToken';
import UserRoute from '../../api/routes/user/userRoute';
const Dashboard = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const decoded = await DecodeToken(session?.token)
      const data = await UserRoute.getUserInfo(decoded.username, session?.token);
      setUserData(data);
      console.log(data)
    };

    fetchData();
  }, [session]);

  return (
    <NavbarSideBarLayout>
      <h1>Dashboard</h1>
      {userData && (
        <>
          <p>{userData.username + " " + userData.role}</p>
          <Link href={`/My/dashboard/members/approve`}>
            approve members
          </Link>
        </>
      )}
    </NavbarSideBarLayout>
  );
};

export default Dashboard;
