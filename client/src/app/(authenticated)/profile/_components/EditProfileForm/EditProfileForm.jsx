import { Controller, FormProvider, useForm } from 'react-hook-form';

import Image from 'next/image';

import logo from '@/../public/images/Logo.png';
import CoreButton from '@/components/buttons/CoreButton';


import { SelectInput } from '@/app/(authenticated)/_components/SelectInput';
import { EditUserSchema } from '@/app/(authenticated)/profile/_shcemas/profile.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Textarea from '@/components/Inputs/Textarea';
import CoreInput from '@/components/Inputs/CoreInput';

export const EditProfileForm = ({DataProvider}) =>{
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(EditUserSchema),
      });
    
    return(
        <>
         <FormProvider {...{ register, errors }}>
        <form className="d-flex flex-column gap-3" /* onSubmit={handleSubmit(onSubmit)} */>
          <div className="border-2 py-4 border-top border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold fs-4">Your Photo</h2>
                <p className="text-soft-black">This will be displayed on your profile</p>
              </div>

              <div className="col-lg-6 col-md-7 col-12 d-flex align-items-center gap-4">
                <Image src={logo} className="bg-light rounded-circle" width={200} height={170} alt="user photo" />
                <div className="d-flex flex-column align-items-start gap-3 col-12 ">
                  <p>Upload new Image</p>
                  <input type="file" />
                  <p className="text-soft-black">
                    The ideal image is 192 x192 pixels. The maximum file size allowed is 200KB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Username</h2>
              <div className="col-lg-6 col-md-7 col-12">
                <p className="fs-6 mb-2 text-soft-black">username</p>
                <div className="d-flex align-items-center">
                    <Controller 
                    name='username'
                    control={control}
                    defaultValue='username'
                    render={({field})=>{
                        <CoreInput
                        field={field}
                        readOnly={true}
                        placeholder='username'
                        name='username'
                        />
                    }}
                    />
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold fs-4">Your Bio</h2>
                <p className="text-soft-black">Write a short introduction</p>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <p className="fs-6 mb-2 text-soft-black">About me</p>
                <div className="d-flex align-items-center">
                  <Textarea
                    register={register('bio')}
                    defaultValue={userData?.bio || ''}
                    errors={errors}
                    placeholder="Your bio"
                    name="bio"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Fullname</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <p className="fs-6 mb-2 text-soft-black">First Name</p>
                  <div className="d-flex align-items-center">
                  <Controller 
                    name='firstname'
                    control={control}
                    defaultValue='firstname'
                    render={({field})=>{
                        <CoreInput
                        field={field}
                        errors={errors}
                        placeholder='firstname'
                        name='firstname'
                        />
                    }}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <p className="fs-6 mb-2 text-soft-black">Last Name</p>
                  <div className="d-flex align-items-center">
                  <Controller 
                    name='lastname'
                    control={control}
                    defaultValue='lastname'
                    render={({field})=>{
                        <CoreInput
                        field={field}
                        placeholder='lastname'
                        name='lastname'
                        />
                    }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Contact information</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <p className="fs-6 mb-2 text-soft-black">Email</p>
                  <div className="d-flex align-items-center">
                  <Controller 
                    name='email'
                    control={control}
                    defaultValue='email'
                    render={({field})=>{
                        <CoreInput
                        field={field}
                        readOnly={true}
                        placeholder='email'
                        name='email'
                        />
                    }}
                    />                  </div>
                </div>

                <div className="col-4">
                  <p className="fs-6 mb-2 text-soft-black">Phone number</p>
                  <div className="d-flex align-items-center">
                  <Controller 
                    name='phone'
                    control={control}
                    defaultValue='phone'
                    render={({field})=>{
                        <CoreInput
                        field={field}
                        readOnly={true}
                        placeholder='phone'
                        name='phone'
                        />
                    }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Business position/role</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <p className="fs-6 mb-2 py-1 text-soft-black">Business Position</p>
                  <SelectInput
                    hookForm={false}
                    placeholder={userData?.position || ''}
                    disabled
                    name="position"
                  />
                </div>

                <div className="col-4">
                  <p className="fs-6 mb-2 text-soft-black">User Role</p>
                  <div className="d-flex align-items-center">
                  <Controller 
                    name='role'
                    control={control}
                    defaultValue='role'
                    render={({field})=>{
                        <CoreInput
                        field={field}
                        readOnly={true}
                        placeholder='role'
                        name='role'
                        />
                    }}
                    />                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end col-lg-4 col-md-8 col">
            <CoreButton type="submit" label="Update Profile" />
          </div>
        </form>
      </FormProvider></>
    );
}