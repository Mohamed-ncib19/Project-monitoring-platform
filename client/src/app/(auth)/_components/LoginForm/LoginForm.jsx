import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';

import { LoginSchema } from '@/app/(auth)/_schemas/auth.schema';
import CoreButton from '@/components/buttons/CoreButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconInfoCircle } from '@tabler/icons-react';

import PasswordInput from '../../../../components/Inputs/password/password-input';
import Loader from '../../../../components/loader/page';

import Input from '@/components/Input';

export const LoginForm = () => {
  const [isValid, setIsValid] = useState(true);
  const [loginLoader, setLoginLoader] = useState(false);
  const { push } = useRouter();

  const form = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (data) => {
    try {
      setLoginLoader(true);
      const response = await signIn('credentials', {
        redirect: false,
        ...data,
      });
      if (JSON.parse(response.error)?.status === 422) {
        push(`/?username=${data.username}`);
      }

      if (!response.ok) {
        setIsValid(false);
        setLoginLoader(false);
        return;
      }

      setIsValid(true);
      setLoginLoader(false);
      push('/dashboard');
    } catch (error) {
      if (error.response.status === 422) {
        push(`/username=${data.username}`);
      }
      setLoginLoader(false);
    }
  };

  return (
    <>
      <div className=" col-10 mt-5 custom-transition">
        <p className="welcome custom-letter-spacing-wider text-dark h2">
          Welcome
        </p>
        <p className="content light-text-custom-color">
          Log in to your account
        </p>
      </div>
      <FormProvider {...form}>
        <form
          className="login-form col-12 col-md-8 col-lg-10 col-xl-10 mx-auto d-flex flex-column gap-4   "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register('username')}
            errors={errors}
            isValid={isValid}
            name={'username'}
            type={'text'}
            placeholder={'LDAP Username'}
          />
          <PasswordInput
            register={register('password')}
            errors={errors}
            isValid={isValid}
            placeholder={'Password'}
          />
          {!isValid && (
            <div className="text-danger d-flex flex-row gap-2">
              <i>
                <IconInfoCircle />
              </i>
              <p>Login failed. Please verify if your account exists in LDAP</p>
            </div>
          )}
          <CoreButton type="submit" label={'Log in'} />
          {loginLoader && <Loader />}
        </form>
      </FormProvider>
    </>
  );
};
