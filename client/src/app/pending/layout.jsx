import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Header } from '@/app/(auth)/_components/Header';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Layout = async ({ children }) => {
  const user = await getServerSession(authOptions);
  if (!user) redirect('/');
  if (user.status === 'approved') redirect('/dashboard');

  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default Layout;
