import { Controller, FormProvider, useForm } from 'react-hook-form';

import Image from 'next/image';

import logo from '@/../public/images/Logo.png';
import CoreButton from '@/components/buttons/CoreButton';


import { SelectInput } from '@/app/(authenticated)/_components/SelectInput';
import { EditUserSchema } from '@/app/(authenticated)/profile/_shcemas/profile.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Textarea from '@/components/Inputs/Textarea';
import CoreInput from '@/components/Inputs/CoreInput';
import TextareaInput from '@/components/Inputs/Textarea';
import axios from 'axios';
import { useNotifications } from 'reapop';

export const EditProfileForm = ({dataProvider}) =>{
  const { notify } = useNotifications();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(EditUserSchema),
      });
    


  const editUserInfo = async (userData) => {
    try {
      const response = await axios.put('/users/me', userData);
      return response;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status: error.response?.status,
          code: error?.code,
          data: error.response?.data,
        })
      );
    }
  };

   const onSubmit = async (data) => {

    try {

      if(data.firstname === ''){
        data.firstname = dataProvider?.firstname
      }

      if(data.lastname === ''){
        data.lastname = dataProvider?.lastname
      }


      if(data.bio === ''){
        data.bio = dataProvider?.bio
      }


      console.log(data)

      if (Object.keys(data).length > 0) {
        const resUpdateUser = await editUserInfo(data);
        console.log(resUpdateUser)
        if (resUpdateUser.status === 200) {
          notify({message: 'Saved', status:'success'});
        } else {
          notify({message: 'failed', status:'error'});
        }
      } else {
        notify({message: 'no changes', status:'info'});
      }
    } catch (error) {
      console.log(error);
      notify({message: 'server error', status:'error'});
    }
  }; 
    return(
        <>
         <FormProvider {...{ register, errors }}>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="border-2 py-4 border-top border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold fs-4">Your Photo</h2>
                <p className="text-soft-black">This will be displayed on your profile</p>
              </div>

              <div className="col-lg-6 col-md-7 col-12 d-flex align-items-center gap-4">
                <Image src={logo} className="bg-light rounded-circle" width={200} height={170} alt="user photo" />
                <div className="d-flex flex-column align-items-start gap-3 col-12 ">
                  <span>Upload new Image</span>
                  <input type="file" />
                  <span className="text-soft-black">
                    The ideal image is 192 x192 pixels. The maximum file size allowed is 200KB
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Username</h2>
              <div className="col-lg-6 col-md-7 col-12">
                <label className="fs-6 mb-2 text-soft-black">username</label>
            
                    <CoreInput 
                    readOnly={true}
                    name='username'
                    placeholder='Username'
                    defaultValue={dataProvider?.username}
                    />
                
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold fs-4">Your Bio</h2>
                <span className="text-soft-black">Write a short introduction</span>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <label className="fs-6 mb-2 text-soft-black">About me</label>
                  <TextareaInput
                    name="bio"
                    placeholder="Your bio"
                    defaultValue={dataProvider?.bio}
                    register={register}
                    errors={errors}
                  />
                
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Fullname</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">First Name</label>
                  
                        <CoreInput
                        name="firstname"
                        placeholder='firstname'
                        defaultValue={dataProvider?.firstname}
                        register={register}
                        errors={errors}
                        
                        />
                
                </div>

                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">Last Name</label>
                
                        <CoreInput
                        name='lastname'
                        placeholder='lastname'
                        defaultValue={dataProvider?.lastname}
                        register={register}
                        errors={errors}
                        />
                  
              
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Contact information</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">Email</label>
               
                        <CoreInput
                        readOnly={true}
                        name='email'
                        placeholder='email'
                        defaultValue={dataProvider?.email}
                        />
                </div>

                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">Phone number</label>
               
                        <CoreInput
                        readOnly={true}
                        name='phone'
                        placeholder='phone'
                        defaultValue={dataProvider?.phone}
                      
                        />
                   
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold fs-4">Business position/role</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <label className="fs-6 mb-2 py-1 text-soft-black">Business Position</label>
                  <SelectInput
                      name="businessPosition"
                      defaultValue={{ value: dataProvider?.businessPosition, label: dataProvider?.businessPosition }}
                      readOnly={true}
                      placeholder="Select a business position"
                    />
                            </div>

                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">User Role</label>
                  <div className="d-flex align-items-center">
                  
                        <CoreInput
                        name='role'
                        placeholder='role'
                        readOnly={true}
                        defaultValue={dataProvider?.role}
                        />
                                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end col-lg-4 col-md-8 col">
            <CoreButton type="submit" label="Update Profile" />
          </div>
        </form>
      </FormProvider>
      </>
    );
}