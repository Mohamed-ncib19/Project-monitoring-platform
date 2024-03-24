import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@/app/components/Inputs/custom-input/page';
import SubmitButton from '@/app/components/buttons/submit-button/submit-button';
import Button from '@/app/components/buttons/simple-button/page';
import SelectInput from '@/app/components/Inputs/select-input/page';
import RadioWithLabel from '@/app/components/Inputs/radio-with-label/page';


const Schema = Yup.object().shape({
  position: Yup.string().required('Position is required'),
  workSince: Yup.string().required('Select a start time for your work schedule'),
  isStudent: Yup.boolean().required('indicate if you are still studying'),

});


const SecondStep = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(Schema) 
  });

  return (
    <div className='w-100 m-auto d-flex flex-column gap-5'>
    <FormProvider  register={register}  errors={errors} >
      <p className=' w-100 align-middle m-auto fw-thin h5 light-text-custom-color ' >Just a Few Steps Away from Completing Your Registration!</p>
    <form className="w-100 d-flex flex-column gap-4 light-text-custom-color  ">
    <SelectInput register={register('position')} name={'position'} placeholder={"Choose Your Position"} errors={errors} content={[
      {text:'Team Lead',value:'teamLead'},
      {text:'Manager',value:'manager'},
      {text:'Developer',value:'developer'}]} />
    <SelectInput register={register('workSince')} name={'workSince'} placeholder={"Work Begin Date"} errors={errors}  content={[
       { text: '1 month', value: '1m' },
       { text: '3 months', value: '3m' },
       { text: '6 months', value: '6m' },
       { text: '1 year', value: '1y' },
       { text: '+2 years', value: '2y' }
    ]} />
    <RadioWithLabel register={register('isStudent')} label={"Are You Still Studying ?"} />
        <Button  onClick={handleSubmit(onSubmit)} content={"Continue"} />
    </form>
    </FormProvider>
    </div>
  );
}

export default SecondStep;
