import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';

import { RegisterSchema } from '@/app/(auth)/_schemas/auth.schema';
import AuthRoute from '@/app/api/routes/auth/authRoute';
import CoreButton from '@/components/buttons/CoreButton';
import Input from '@/components/Inputs/custom-input/page';
import { yupResolver } from '@hookform/resolvers/yup';

export const RegisterForm = ({ userName }) => {
  const [registrationDone, setRegistrationDone] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      const res = await AuthRoute.registerRoute(
        {
          username: userName,
          firstname: data.firstName,
          lastname: data.lastName,
          bio: '',
          phone: data.phoneNumber,
          email: data.email,

          /*       position: data.position,
        skills: data.skills */
        },
        session.token,
      );

      if (res.data.ok) {
        router.push('/auth/pending');
      } else {
        alert('Error in the system');
      }
    } catch (error) {
      console.error('Error creating new user:', error);
      alert('Error creating new user');
    }
  };

  return (
    <>
      <div className=" col-10 mt-5 custom-transition">
        <p className="welcome custom-letter-spacing-wider text-dark h2">
          Welcome Back, <span className="text-custom-primary">{userName}!</span>
        </p>
        <p className="content light-text-custom-color">
          Just fill out the steps form below to complete your registration.
        </p>
      </div>
      <div className="w-100  m-auto d-flex flex-column gap-5">
        <FormProvider {...form}>
          <form
            className="w-100 d-flex flex-column gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center gap-5 pt-5">
              <Input
                register={register('firstName')}
                name="firstName"
                errors={errors}
                placeholder={'First Name'}
                type={'text'}
              />
              <Input
                register={register('lastName')}
                name="lastName"
                errors={errors}
                placeholder={'Last Name'}
                type={'text'}
              />
            </div>
            <Input
              register={register('phoneNumber')}
              name={'phoneNumber'}
              placeholder={'Phone number'}
              errors={errors}
              type={'number'}
            />
            <Input
              register={register('email')}
              name={'email'}
              placeholder={'Email'}
              errors={errors}
              type={'email'}
            />

            <CoreButton type="submit" label={'Submit'} />
          </form>
        </FormProvider>
      </div>
    </>
  );
};
