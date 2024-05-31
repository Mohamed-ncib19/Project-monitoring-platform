import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNotifications } from 'reapop';

import { LoginSchema } from '@/app/(auth)/_schemas/auth.schema';
import CoreButton from '@/components/buttons/CoreButton';
import CoreInput from '@/components/Inputs/CoreInput';
import PasswordInput from '@/components/Inputs/PasswordInput';
import { yupResolver } from '@hookform/resolvers/yup';

export const LoginForm = () => {
  const [isValid, setIsValid] = useState(true);
  const { push } = useRouter();
  const { data } = useSession();
  const { notify } = useNotifications();

  useEffect(() => {
    if (data?.status === 'pending') {
      push('/pending');
    }
    if (data?.status === 'approved') {
      push('/dashboard');
    }
  }, [data]);

  const form = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        ...data,
      });
      const error = JSON.parse(response.error);
      if (error?.status === 422) {
        push(`/?username=${data.username}`);
        return;
      }
   

      if (error && error.status !== 200) {
        setIsValid(false);
        notify({ message: 'User not Found', status: 'danger' });
      }
      
      if(response.ok){
        notify({message: 'Welcome Back', status:'success'});
      }

    } catch (error) {
      if (error.response.status === 422) {
        push(`/username=${data.username}`);
      }
    }
  });

  return (
    <>
      <div className="col-10 pt-5">
        <p className="welcome custom-letter-spacing-wider text-dark h2">
          Welcome
        </p>
        <p className="content light-text-custom-color">
          Log in to your account
        </p>
      </div>
      <FormProvider {...form}>
        <form
          className=" col-12 col-md-8 col-lg-10 col-xl-10 mx-auto d-flex flex-column gap-4"
          onSubmit={onSubmit}
        >
          <CoreInput
            name="username"
            placeholder="LDAP Username"
            errors={errors}
            register={register}
          />
          <PasswordInput
            register={register('password')}
            errors={errors}
            placeholder={'Password'}
          />
          {!isValid && (
            <div className="text-danger d-flex flex-row gap-2">
              <p>Login failed. Please verify if your account exists in LDAP</p>
            </div>
          )}
          <CoreButton type="submit" label="Log in" />
        </form>
      </FormProvider>
    </>
  );
};
