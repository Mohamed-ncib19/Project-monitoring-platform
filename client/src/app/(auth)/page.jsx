'use client';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { LoginForm } from '@/app/(auth)/_components/LoginForm';
import { RegisterForm } from '@/app/(auth)/_components/RegisterForm';
import { LoginSchema } from '@/app/(auth)/_schemas/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const username = searchParams.get('username');

  if (!username)
    return (
      <FormProvider {...form}>
        <LoginForm />
      </FormProvider>
    );

  return (
    <div id="registration">
      <FormProvider {...form}>
        <RegisterForm userName={username} />
      </FormProvider>
    </div>
  );
};

export default LoginPage;
