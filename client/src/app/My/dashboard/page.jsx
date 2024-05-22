'use client'
import Link from 'next/link';
const Dashboard = () => {


  return (
    <>
      <h1>Dashboard</h1>
      
        <>
          <Link href={`/My/dashboard/members/approve`}>
            approve members
          </Link>
        </>
        </>
    
  );
};

export default Dashboard;
