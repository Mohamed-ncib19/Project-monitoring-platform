'use client';
import { useSearchParams } from 'next/navigation';

import { LoginForm } from '@/app/(auth)/_components/LoginForm';
import { RegisterForm } from '@/app/(auth)/_components/RegisterForm';

const LoginPage = () => {
  const searchParams = useSearchParams();

  const username = searchParams.get('username');

  if (!username) return <LoginForm />;

  return (
    <div id="registration">
      <RegisterForm userName={username} />
    </div>
  );
};

export default LoginPage;
