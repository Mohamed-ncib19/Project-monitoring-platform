import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Input from '@/app/components/Inputs/custom-input/page';
import PhoneInput from '@/app/components/Inputs/phone/page';
import EmailInput from '@/app/components/Inputs/email/email-input';
import SubmitButton from '@/app/components/buttons/submit-button/submit-button';

const Schema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.number().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const FirstStep = ({ onSubmit }) => {
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(Schema) // Add the resolver to useForm
    });
  
    const onSubmitHandler = (data) => {
      onSubmit(data); 
    };
  
    return (
      <FormProvider {...{ register, errors }}>
        <form className="w-auto" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="d-flex flex-row justify-content-center align-items-center gap-5">
            <Input register={register('firstName')} name="firstName" errors={errors} placeholder={"First Name"} />
            <Input register={register('lastName')} name="lastName" errors={errors} placeholder={"Last Name"} /> {/* Corrected */}
          </div>
          <PhoneInput register={register('phoneNumber')} placeholder={"Phone number"} /> {/* Corrected */}
          <Input register={register('email')} name={"email"} placeholder={"Email"} /> {/* Corrected */}
          <SubmitButton content={"Continue"} />
        </form>
      </FormProvider>
    );
  }
  
  export default FirstStep;
