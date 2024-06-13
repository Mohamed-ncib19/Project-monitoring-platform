import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import ClientLayout from '@/app/(authenticated)/_components/ClientLayout';
import { Navbar } from '@/app/(authenticated)/_components/Navbar';
import { Sidebar } from '@/app/(authenticated)/_components/Sidebar';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthProvider } from './_context/AuthContext';

const Layout = async ({ children }) => {
  const user = await getServerSession(authOptions);
  if (!user) redirect('/');
  if (user.status === 'pending') redirect('/pending');

  return (
    <ClientLayout data={user}>
      <AuthProvider>
      <div className="sidebar">
        <Sidebar />
      </div>
        <Navbar user={user} />
      <div className="layout m-0">{children}</div>
      </AuthProvider>
    </ClientLayout>
  );
};

export default Layout;