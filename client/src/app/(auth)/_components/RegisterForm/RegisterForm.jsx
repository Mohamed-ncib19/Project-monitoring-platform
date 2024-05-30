import { useRouter } from 'next/navigation';
import { FormProvider, useForm,Controller } from 'react-hook-form';

import { RegisterSchema } from '@/app/(auth)/_schemas/auth.schema';

import CoreButton from '@/components/buttons/CoreButton';
import { yupResolver } from '@hookform/resolvers/yup';
import CoreInput from '@/components/Inputs/CoreInput';
import axios from 'axios';

export const RegisterForm = async ({ userName }) => {

  const { push } = useRouter();

  
  const form = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const api = {

    async Register (userData) {
      try {
        const res = await axios.post(`/register`, userData);
       return Promise.resolve({
        ok:true,
        data:res.data
       });
      } catch (error) {
        return Promise.reject({ ok: false, msg: error })
      }
    }
  }
  
    const onSubmit = async (data) => {
      try {
        const res = await api.Register(
          {
            username: userName,
            firstname: data.firstname,
            lastname: data.lastname,
            bio: '',
            phone: data.phoneNumber,
            email: data.email,
          },
        );
        
        if(!res.ok){
        if(res.msg.response.status === 500){
          alert('server error')
        }
        
        if(res.msg.response.status === 403){
          alert('user already exist') 
        }
        return;
      }
        if(res.data.status === 'pending'  ){
          
          push('/pending');
        }
        
      } catch (error) {
        console.error('Error creating new user:', error);
      }
    };
  return (
    <>
      <div className=" col-10 mt-5">
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
              <Controller
              name='firstname'
              control={control}
              render={({field})=>(
                <CoreInput
                field={field}
                name="firstname"
                errors={errors}
                placeholder={'Firstname'}
                type={'text'}
              />
              )}
              />

            <Controller
              name='lastname'
              control={control}
              render={({field})=>(
                <CoreInput
                field={field}
                name="lastname"
                errors={errors}
                placeholder={'Lastname'}
                type={'text'}
              />
              )}
              />
            </div>
            <Controller
              name='phoneNumber'
              control={control}
              render={({field})=>(
                <CoreInput
                field={field}
                name="phoneNumber"
                errors={errors}
                placeholder={'Phone number'}
                type={'text'}
              />
              )}
              />
            <Controller
              name='email'
              control={control}
              render={({field})=>(
                <CoreInput
                field={field}
                name="email"
                errors={errors}
                placeholder={'email'}
                type={'text'}
              />
              )}
              />

           { <CoreButton type="submit" label={'Submit'} />}
          </form>
        </FormProvider>
      </div>
    </>
  );
};
