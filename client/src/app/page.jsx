'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const RedirectUser = (session) => {
      if (!session.user.exists) {
        router.push('/auth/welcome');
      }
    };
    if (session) {
      RedirectUser(session);
    }
  }, [session, router]);

  if (!session || !session.user.exists) {
    router.push('/auth/login');
  } else {
    router.push('/My/dashboard');
  }

  return (
    <div>
      <p>dashboard</p>
    </div>
  );
};

export default Home;
