import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import ClientLayout from '@/app/(authenticated)/_components/ClientLayout';
import { Navbar } from '@/app/(authenticated)/_components/Navbar';
import { Sidebar } from '@/app/(authenticated)/_components/Sidebar';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Layout = async ({ children }) => {
  const user = await getServerSession(authOptions);
  if (!user) redirect('/');
  if (user.status === 'pending') redirect('/pending');

  return (
    <ClientLayout data={user}>
      <div className="sidebar">
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
