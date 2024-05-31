import React, { useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CoreInput from '@/components/Inputs/CoreInput';
import { SelectInput } from '@/app/(authenticated)/_components/SelectInput';
import { SetupSchema } from '../../_schemas/permission.schema';

export const AddForm = ({ user, handleSubmitForm, setSubmitCallback }) => {
  const methods = useForm({
    resolver: yupResolver(SetupSchema),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      phone: user?.phone || '',
      email: user?.email || '',
      businessPosition: user?.businessPosition || '',
      salary: user?.salary || '',
      role: user?.role || '',
    },
  });

  const { control, handleSubmit, formState: { errors },register } = methods;

  const onSubmitFormData = async (data) => {
    console.log(data)
    try {
      if (handleSubmitForm) {
        await handleSubmitForm({username:user.username,data:data});
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  useEffect(() => {
    if (setSubmitCallback) {
      setSubmitCallback(() => handleSubmit(onSubmitFormData));
    }
  }, [setSubmitCallback, handleSubmit]);

  return (
    <FormProvider {...methods}>
      <form className="d-flex flex-column gap-4 py-5" onSubmit={handleSubmit(onSubmitFormData)}>
        <div className="d-flex flex-row justify-content-between align-items-center gap-4">
         
              <CoreInput
                
                name="firstname"
                placeholder="First name"
                register={register}
                errors={errors}
                type="text"
              />
          
          <CoreInput
                
                name="lastname"
                placeholder="Last name"
                register={register}
                errors={errors}
                type="text"
              />
        </div>

        <div className="d-flex flex-row justify-content-center gap-4">
        <CoreInput
                
                name="phone"
                placeholder="Phone Number"
                register={register}
                errors={errors}
                type="number"
              />
        </div>

        <div className="d-flex flex-row justify-content-center gap-4">
        <CoreInput
                
                name="email"
                placeholder="Email"
                register={register}
                errors={errors}
                type="email"
              />
        </div>

        <div className="d-flex justify-content-between border-top border-bottom py-4">
          <div>
            <p className="fs-6 mb-2 py-1 text-soft-black">Business Position</p>
            
                <SelectInput
                  name='businessPosition'
                  placeholder="Business Position"
                  errors={errors}
                  register={register}
                  options={[
                    { value: 'Frontend Developer', label: 'Frontend Developer' },
                    { value: 'Backend Developer', label: 'Backend Developer' },
                    { value: 'Full-stack Developer', label: 'Full-stack Developer' },
                    { value: 'Mobile Developer (ANDROID)', label: 'Mobile Developer (ANDROID)' },
                    { value: 'Mobile Developer (IOS)', label: 'Mobile Developer (IOS)' },
                    { value: 'IT Business Analyst', label: 'IT Business Analyst' },
                    { value: 'Quality Assurance (QA) Engineer', label: 'Quality Assurance (QA) Engineer' },
                    { value: 'IT Project Manager', label: 'IT Project Manager' },
                    { value: 'Product Owner', label: 'Product Owner' },
                    { value: 'Scrum Master', label: 'Scrum Master' },
                    { value: 'Team Lead', label: 'Team Lead' },
                  ]}
                />
             
          </div>
          <div>
            <p className="fs-6 mb-2 text-soft-black">Salary</p>
          
                <CoreInput
                  name="salary"
                  placeholder="Salary"
                  errors={errors}
                  register={register}
                  type="number"
                />
              
          </div>
        </div>

        <div>
          <p className="fs-6 mb-2 py-1 text-soft-black">Role</p>
       
              <SelectInput
                name='role'
                placeholder="Role"
                errors={errors}
                register={register}
                options={[
                  { value: 'Manager', label: 'Manager' },
                  { value: 'Team lsead', label: 'Team lead' },
                  { value: 'Team member', label: 'Team member' },
                ]}
              />
        
        </div>
        <button type="submit">save</button>
      </form>
    </FormProvider>
  );
};