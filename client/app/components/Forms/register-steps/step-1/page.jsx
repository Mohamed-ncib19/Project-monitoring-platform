import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@/app/components/Inputs/custom-input/page';
import Button from '@/app/components/buttons/simple-button/page';

const Schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string().min(8,"phone number must have 8 digits ")
    .matches(/^\d+$/, 'Phone number must contain only numeric characters') // Ensure only numeric characters
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});


const FirstStep = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(Schema) 
  });



  return (
    <div className='w-100 m-auto d-flex flex-column gap-5' >
    <FormProvider  register={register} errors={errors} >
    <p className=" w-100 align-middle m-auto fw-thin h5 light-text-custom-color ">Welcome! Please fill out the form below to create your account</p>
    <form className="w-100 d-flex flex-column gap-4" >
        <div className="d-flex flex-row justify-content-between align-items-center gap-2">
          <Input register={register('firstName')} name="firstName" errors={errors} placeholder={"First Name"} type={"text"} />
          <Input register={register('lastName')} name="lastName" errors={errors} placeholder={"Last Name"} type={"text"} />
        </div>
        <Input register={register('phoneNumber')} name={"phoneNumber"} placeholder={"Phone number"} errors={errors} type={"number"} />
        <Input register={register('email')} name={"email"} placeholder={"Email"} errors={errors} type={"email"} />
        <Button onClick={handleSubmit(onSubmit)} content={"Continue"} />
      </form>
    </FormProvider>
    </div>
  );
}

export default FirstStep;
