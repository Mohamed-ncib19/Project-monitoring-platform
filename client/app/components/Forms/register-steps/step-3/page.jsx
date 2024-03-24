'use client'
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '@/app/components/buttons/simple-button/page';
import Username from '@/app/components/Inputs/username/page';
import SelectMultiple from '@/app/components/Inputs/select-multiple/page';
import RangeInput from '@/app/components/Inputs/range/page';


const Schema = Yup.object().shape({
  skills: Yup.array().of(Yup.string()).min(1, 'At least one skill is required').required('Skills are required'),
  softSkills: Yup.array().of(
    Yup.object().shape({
      softSkillComm: Yup.number().integer().min(0).max(100),
      TimeManagement: Yup.number().integer().min(0).max(100),
      Adaptability: Yup.number().integer().min(0).max(100),
      Teamwork: Yup.number().integer().min(0).max(100)
    })
  )
});



const ThirdStep = ({onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(Schema) 
  } );

  return (
    <div className='w-100 m-auto d-flex flex-column gap-5' >
<FormProvider register={register} errors={errors} >
      <p className=' w-100 align-middle m-auto fw-thin h5 light-text-custom-color ' >Finalize Your Account Setup with Just a Few More Details!</p>
    <form className="w-100">
    <SelectMultiple register={register} setValue={setValue} name={'skills'} errors={errors} options={
       [
        { key: 'nextjs', text: 'nextJS', value: 'nextjs' },
        { key: 'reactjs', text: 'reactJS', value: 'reactjs' },
        { key: 'nodejs', text: 'nodeJS', value: 'nodejs' },
        { key: 'laravel', text: 'Laravel', value: 'laravel' },
        { key: 'symfony', text: 'Symfony', value: 'symfony' },
        { key: 'angular', text: 'Angular', value: 'angular' },
        { key: 'figma', text: 'Figma', value: 'figma' },
        { key: 'pm', text: 'Project management', value: 'pm' },
        { key: 'rn', text: 'reactNative', value: 'rn' },
        { key: 'flutter ', text: 'Flutter', value: 'flutter ' },
      
      ]
    } />
    <div>
  <p>Rate your skills in : </p>
 <div className='w-75  d-flex flex-lg-row flex-md-column flex-sm-column flex-xs-column justify-content-lg-between justify-content-md-center justify-content-sm-center justify-content-xs-center align-items-center gap-3'>
    <p className='p-2' >Communication :</p>
    <RangeInput register={register} name={'softSkills[0].softSkillComm'} setValue={setValue} getValues={getValues} />
 </div>

 <div className='w-75  d-flex flex-lg-row flex-md-column flex-sm-column flex-xs-column justify-content-lg-between justify-content-md-center justify-content-sm-center justify-content-xs-center align-items-center gap-3'>
    <p className='p-2' >Time Management :</p>
    <RangeInput register={register} name={'softSkills[0].TimeManagement'} setValue={setValue} getValues={getValues} />
 </div>

 <div className='w-75  d-flex flex-lg-row flex-md-column flex-sm-column flex-xs-column justify-content-lg-between justify-content-md-center justify-content-sm-center justify-content-xs-center align-items-center gap-3'>
    <p className='p-2' >Adaptability :</p>
    <RangeInput register={register} name={'softSkills[0].Adaptability'} setValue={setValue} getValues={getValues} />
 </div>

 <div className='w-75  d-flex flex-lg-row flex-md-column flex-sm-column flex-xs-column justify-content-lg-between justify-content-md-center justify-content-sm-center justify-content-xs-center align-items-center gap-3'>
    <p className='p-2' >Teamwork :</p>
    <RangeInput register={register} name={'softSkills[0].Teamwork'} setValue={setValue} getValues={getValues} />
 </div>
</div>
        <Button  onClick={handleSubmit(onSubmit)} content={"Finish"} />
    </form>
    </FormProvider>
    </div>
  );
}

export default ThirdStep;
