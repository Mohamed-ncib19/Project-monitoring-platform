import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import ClientLayout from '@/app/(authenticated)/_components/ClientLayout';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {Sidebar} from '@/app/(authenticated)/_components/Sidebar';
import {Navbar} from '@/app/(authenticated)/_components/Navbar';

const Layout = async ({ children }) => {
  const user = await getServerSession(authOptions);
  if (!user) redirect('/');

  return (
    <ClientLayout data={user}>
      <div className=" sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Navbar user={user} />
      </div>
      <div className="layout m-0">{children}</div>
    </ClientLayout>
  );
};

export default Layout;
