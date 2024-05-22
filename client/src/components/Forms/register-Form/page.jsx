import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthRoute from '../../../app/api/routes/auth/authRoute';
import Input from '../../Inputs/custom-input/page';
import Button from '../../buttons/simple-button/page';

const nameRegex = /^[A-Za-z]+$/;

const Schema = Yup.object().shape({
  firstName: Yup.string()
    .matches(nameRegex, 'First name must contain only letters')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(nameRegex, 'Last name must contain only letters')
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .min(8, 'phone number must have 8 digits ')
    .matches(/^\d+$/, 'Phone number must contain only numeric characters')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  /*   position: Yup.string().required('Position is required'),
  skills: Yup.array().of(Yup.string()).min(1, 'At least one skill is required').required('Skills are required') */
});

const RegistrationForm = ({ userName, loading }) => {
  const [registrationDone, setRegistrationDone] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

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

    setRegistrationDone(true);
  };

  return (
    <div className="w-100  m-auto d-flex flex-column gap-5">
      <FormProvider register={register} errors={errors} onSubmit={onSubmit}>
        <form className="w-100 d-flex flex-column gap-4">
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

          {/*     
        <SelectInput hookForm={true} register={register('position')} setValue={setValue} name='position' placeholder={"Choose Your Position"} errors={errors} search={true} content={[
      {text:'Frontend Developer',value:'frontDev'},
      {text:'Backend Developer',value:'backDev'},
      {text:'Full-stack Developer',value:'fullStackDev'},
      {text:'Mobile Developer (ANDROID)',value:'mobileDevAND'},
      {text:'Mobile Developer (IOS)',value:'mobileDevIOS'},
      {text:'IT Business Analyst',value:'itBAnalyst'},
      {text:'Quality Assurance (QA) Engineer',value:'qltAssuranceEng'},
      {text:'IT Project Manager ',value:'itProjectMng'},
      {text:'Product Owner',value:'prodOwn'},
      {text:'Scrum Master',value:'scrMstr'},
      {text:'Team Lead',value:'TL'},

    ]}
      
            
      />
          <SelectMultiple register={register} placeholder='Skills' setValue={setValue} name={'skills'} errors={errors} options={
       [
        { key: 'nextjs', text: 'nextJS', value: 'nextjs' },
        { key: 'reactjs', text: 'reactJS', value: 'reactjs' },
        { key: 'nodejs', text: 'nodeJS', value: 'nodejs' },
        { key: 'laravel', text: 'Laravel', value: 'laravel' },
        { key: 'symfony', text: 'Symfony', value: 'symfony' },
        { key: 'angular', text: 'Angular', value: 'angular' },
        { key: 'rn', text: 'reactNative', value: 'rn' },
        { key: 'flutter ', text: 'Flutter', value: 'flutter ' },
      
      ]
    } /> */}
          <Button onClick={handleSubmit(onSubmit)} content={'Submit'} />
        </form>
      </FormProvider>
    </div>
  );
};

export default RegistrationForm;
