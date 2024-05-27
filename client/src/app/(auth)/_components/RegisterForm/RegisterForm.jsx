import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { RegisterSchema } from '@/app/(auth)/_schemas/auth.schema';
import AuthRoute from '@/app/api/routes/auth/authRoute';
import CoreButton from '@/components/buttons/CoreButton';
import { yupResolver } from '@hookform/resolvers/yup';
import CoreInput from '@/components/Inputs/CoreInput';

export const RegisterForm = ({ userName }) => {

  const { push } = useRouter();

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
          firstname: data.firstname,
          lastname: data.lastname,
          bio: '',
          phone: data.phoneNumber,
          email: data.email,
        },
      );
      console.log(res)
      
      if(res.msg.response.status === 500){
        alert('server error')
        return;
      }

      if(res.data.status === 'pending'  ){
        push('/pending');
      }
      if (res.ok) {
        push('/auth/pending');
      } else {
        alert('Error in the system');
        console.log(res.message)
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
              <CoreInput
                register={register}
                name="firstname"
                errors={errors}
                placeholder={'Firstname'}
                type={'text'}
              />
              <CoreInput
                register={register}
                name="lastname"
                errors={errors}
                placeholder={'Lastname'}
                type={'text'}
              />
            </div>
            <CoreInput
              register={register}
              name={'phoneNumber'}
              placeholder={'Phone number'}
              errors={errors}
              type={'number'}
            />
            <CoreInput
              register={register}
              name={'email'}
              placeholder={'Email'}
              errors={errors}
              type={'email'}
            />

           { <CoreButton type="submit" label={'Submit'} />}
          </form>
        </FormProvider>
      </div>
    </>
  );
};
