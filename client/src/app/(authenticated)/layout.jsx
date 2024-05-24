import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import ClientLayout from '@/app/(authenticated)/_components/ClientLayout';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Navbar from '@/components/navbar/page';
import SideBar from '@/components/sidebar/page';

const Layout = async ({ children }) => {
  const user = await getServerSession(authOptions);
  if (!user) redirect('/');

  return (
    <ClientLayout data={user}>
      <div className=" sidebar ">
        <SideBar />
      </div>
      <div className="main-content">
        <Navbar user={user} />
      </div>
      <div className="layout">{children}</div>
    </ClientLayout>
  );
};

export default Layout;
