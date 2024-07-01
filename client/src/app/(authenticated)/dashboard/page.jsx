'use client';

import { useEffect, useState } from 'react';
import ManagerDashboard from '@/app/(authenticated)/dashboard/layout/managerDash';
import TeamLeadDashboard from '@/app/(authenticated)/dashboard/layout/teamLeadDash';
import TeamMemberDashboard from '@/app/(authenticated)/dashboard/layout/teamMemberDash';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setUserRole(sessionStorage.getItem('userRole'));
  }, []);

  const renderDashboard = () => {
    switch (userRole) {
      case process.env.NEXT_PUBLIC_MANAGER_ROLE:
        return <ManagerDashboard />;
      case process.env.NEXT_PUBLIC_TEAMLEAD_ROLE:
        return <TeamLeadDashboard />;
      case process.env.NEXT_PUBLIC_TEAMMEMBER_ROLE:
        return <TeamMemberDashboard />;
      default:
        return <p>Unknown Role</p>;
    }
  };

  return (
    <>
      <div>
        <span className="text-muted">OVERVIEW</span>
        <p className="fw-bold">Your Dashboard</p>
      </div>
      {renderDashboard()}
    </>
  );
};

export default Dashboard;
