import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { IconInfoCircle } from '@tabler/icons-react';

import SubmitButton from '../../buttons/submit-button/submit-button';
import Input from '../../Inputs/custom-input/page';
import PasswordInput from '../../Inputs/password/password-input';
import Loader from '../../loader/page';

import './loginForm.styles.css';

const Schema = Yup.object().shape({
  username: Yup.string().required('LDAP username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const [isValid, setIsValid] = useState(true);
  const [loginLoader, setLoginLoader] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoginLoader(true);
      const response = await signIn('credentials', {
        redirect: false,
        ...data,
      });
      console.log(response);
      if (response.ok) {
        setIsValid(true);
      } else {
        setIsValid((isValid) => !isValid);
      }
      setLoginLoader(false);
    } catch (error) {
      console.error('Error during signIn:', error);
      setLoginLoader(false);
    }
  };

  return (
    <FormProvider register={register} errors={errors}>
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
        <SubmitButton content={'Log in'} />
        {loginLoader && <Loader />}
      </form>
    </FormProvider>
  );
};

export default LoginForm;