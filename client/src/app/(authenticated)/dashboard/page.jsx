'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ManagerDashboard from '@/app/(authenticated)/dashboard/layout/managerDash';
import TeamLeadDashboard from '@/app/(authenticated)/dashboard/layout/teamLeadDash';
import TeamMemberDashboard from '@/app/(authenticated)/dashboard/layout/teamMemberDash';
import { useNotifications } from 'reapop';

const Dashboard = () => {
  const { notify } = useNotifications();
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();


const getMe = async() =>{
  try {
    const response = await axios.get('/users/me');
    if (response.status === 200) {
      return { ok: true, data: response?.data.user};
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}
 
  useEffect(() => {
    const fetchUserData = async () => {
      if (session && !loading) {
        setLoading(true);
        const result = await getMe();
        setLoading(false);
        if (result.ok) {
          setUserData(result.data);
        } else {
          notify({
            message: 'Failed to load user information',
            status: 'danger',
          });
        }
      }
    };

    if(session){
      fetchUserData();
    }
  }, [session]);

  const renderDashboard = () => {
    
    switch (session?.profile.role) {
      case process.env.NEXT_PUBLIC_MANAGER_ROLE:
        return <ManagerDashboard user={userData} />;
      case process.env.NEXT_PUBLIC_TEAMLEAD_ROLE:
        return <TeamLeadDashboard user={userData} />;
      case process.env.NEXT_PUBLIC_TEAMMEMBER_ROLE:
        return <TeamMemberDashboard user={userData} />;
      default:
        return <p>Unknown Role</p>;
    }
  };

  return (
    <div>
      <div>
        <span className="text-muted">OVERVIEW</span>
        <p className="fw-bold">Your Dashboard</p>
      </div>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;