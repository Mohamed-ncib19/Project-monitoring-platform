import { signIn } from 'next-auth/react';
import axios from 'axios';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useNotifications } from 'reapop';

import { RegisterSchema } from '@/app/(auth)/_schemas/auth.schema';
import CoreButton from '@/components/buttons/CoreButton';
import CoreInput from '@/components/Inputs/CoreInput';
import { yupResolver } from '@hookform/resolvers/yup';

export const RegisterForm = async ({ userName }) => {
  const { notify } = useNotifications();
  const form = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const formLogin = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { watch } = formLogin;

  const onSubmit = async (data) => {
    const credentials = watch();

    try {
      const signUpResponse = await axios.post('/register', {
        username: userName,
        firstname: data.firstname,
        lastname: data.lastname,
        bio: '',
        phone: data.phoneNumber,
        email: data.email,
      });
      if (signUpResponse.status === 200) {
        await signIn('credentials', {
          redirect: true,
          ...credentials,
          callbackUrl:
            signUpResponse.data.status === 'pending'
              ? '/pending'
              : '/dashboard',
        });
        notify({ message: 'Welcome Back', status: 'success' });
      }
    } catch (error) {
      if (error.response?.status === 403) {
        notify({ message: 'User already exist', status: 'warning' });
        return;
      }
      notify({ message: 'Error creating new user', status: 'danger' });
    }
  };

  return (
    <>
      <div className=" col-10 mt-5">
        <p className="welcome text-dark h2">
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
              <CoreInput
                name="firstname"
                placeholder="Firstname"
                errors={errors}
                register={register}
              />

              <CoreInput
                name="lastname"
                placeholder="Lastname"
                errors={errors}
                register={register}
              />
            </div>
            <CoreInput
              name="phoneNumber"
              placeholder="Phone number"
              errors={errors}
              register={register}
            />
            <CoreInput
              name="email"
              placeholder="email"
              type="email"
              errors={errors}
              register={register}
            />

            <CoreButton type="submit" label="Submit" />
          </form>
        </FormProvider>
      </div>
    </>
  );
};
