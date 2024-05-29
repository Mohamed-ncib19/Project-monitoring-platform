import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { FormProvider, useForm, Controller } from 'react-hook-form';

import { LoginSchema } from '@/app/(auth)/_schemas/auth.schema';
import CoreButton from '@/components/buttons/CoreButton';
import { yupResolver } from '@hookform/resolvers/yup';

import CoreInput from '@/components/Inputs/CoreInput';
import PasswordInput from '@/components/Inputs/PasswordInput';
import InfoIcon from '../../../../../public/icons/info-icon';

export const LoginForm = () => {
  const [isValid, setIsValid] = useState(true);
  const { push } = useRouter();

  const form = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = form;

  const onSubmit = async (data) => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        ...data,
      });
      if (JSON.parse(response.error)?.status === 422) {
        push(`/?username=${data.username}`);
      }

      if (!response.ok) {
        setIsValid(false);
        return;
      }
      const user = await getSession();

      if(user){
        if(user.profile.role){
          push('/dashboard');
        }else{
          push('/pending');
        }
      }
    } catch (error) {
      if (error.response.status === 422) {
        push(`/username=${data.username}`);
      }
    }  };

  return (
    <>
      <div className=" col-10 mt-5">
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
          <Controller
          name='username'
          control={control}
          render={({field})=>(
            <CoreInput
            field={field}
            errors={errors}
            name='username'
            type={'text'}
            placeholder={'LDAP Username'}
          />
          )}
          />
         <Controller
         name='password'
         control={control}
         render={({field})=>(
          <PasswordInput
          field={field}
          errors={errors}
          placeholder={'Password'}
        />
         )}
         />
          {!isValid && (
            <div className="text-danger d-flex flex-row gap-2">
              <i>
                <InfoIcon />
              </i>
              <p>Login failed. Please verify if your account exists in LDAP</p>
            </div>
          )}
          <CoreButton type="submit" label={'Log in'} />
        </form>
      </FormProvider>
    </>
  );
};
