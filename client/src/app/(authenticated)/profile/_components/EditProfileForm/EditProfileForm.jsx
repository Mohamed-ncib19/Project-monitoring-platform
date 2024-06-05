import { FormProvider, useForm } from 'react-hook-form';
import Select from 'react-select';
import Image from 'next/image';

import logo from '@/../../public/Logo/Logo.svg';
import CoreButton from '@/components/buttons/CoreButton';


import { EditUserSchema } from '@/app/(authenticated)/profile/_shcemas/profile.schema';
import { yupResolver } from '@hookform/resolvers/yup';
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

 const checkChanges = (data) => {
  return Object.values(data).every(value => value === '');
};

   const onSubmit = async (data) => {


    try {
      if(checkChanges(data)){
        notify({message : 'no chnages' , status:'warning'});
        return;
      }else{

      

      if(data.firstname === ''){
        data.firstname = dataProvider?.firstname
      }

      if(data.lastname === ''){
        data.lastname = dataProvider?.lastname
      }


      if(data.bio === ''){
        data.bio = dataProvider?.bio
      }


      if (Object.keys(data).length > 0) {
        const resUpdateUser = await editUserInfo(data);
        if (resUpdateUser.status === 200) {
          notify({message: 'Your profile updated successfully', status:'success'});
        } else {
          notify({message: 'Profile update failed. Please try again', status:'danger'});
        }
      } else {
        notify({message: 'No updates made to your profile', status:'warning'});
      }
    }
    } catch (error) {
      notify({message: 'An unexpected error occurred', status:'danger'});
    }
  }; 
    return(
        <>
         <FormProvider {...{ register, errors }}>
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="border-2 py-4 border-top border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold   row-label">Your Photo</h2>
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
              <h2 className="fw-bold   row-label ">Username</h2>
              <div className="col-lg-6 col-md-7 col-12">
                <label className="fs-6 mb-2 text-soft-black">username</label>
            
                    <CoreInput 
                    name='username'
                    readOnly={true}
                    placeholder='Username'
                    defaultValue={dataProvider && dataProvider?.username}
                    />
                
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold   row-label">Your Bio</h2>
                <span className="text-soft-black">Write a short introduction</span>
              </div>
              <div className="col-lg-6 col-md-7 col-12">
                <label className="fs-6 mb-2 text-soft-black">About me</label>
                  <TextareaInput
                    name="bio"
                    placeholder="Your bio"
                    defaultValue={dataProvider && dataProvider?.bio}
                    register={register}
                    errors={errors}
                  />
                
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold   row-label">Fullname</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">First Name</label>
                  
                        <CoreInput
                        name="firstname"
                        placeholder='firstname'
                        defaultValue={dataProvider && dataProvider?.firstname}
                        register={register}
                        errors={errors}
                        />
                     
                
                </div>

                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">Last Name</label>
              
                  <CoreInput
                        name="lastname"
                        placeholder='lastname'
                        defaultValue={dataProvider && dataProvider?.lastname}
                        register={register}
                        errors={errors}
                        
                        />                     
                
                  
              
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold   row-label">Contact information</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">Email</label>
               
                        <CoreInput
                        readOnly={true}
                        name='email'
                        placeholder='email'
                        defaultValue={ dataProvider && dataProvider?.email}
                        />
                </div>

                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">Phone number</label>
               
                        <CoreInput
                        readOnly={true}
                        name='phone'
                        placeholder='phone'
                        defaultValue={dataProvider && dataProvider?.phone}
                      
                        />
                   
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 py-4 border-bottom border-secondary-subtle">
            <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
              <h2 className="fw-bold   row-label ">Business position / role</h2>

              <div className="row d-flex justify-content-start col-8 mx-2">
                <div className="col-4">
                  <label className="fs-6 mb-2 py-1 text-soft-black">Business Position</label>

               <CoreInput
               name='businessPosition'
               placeholder='Business Position'
               readOnly={true}
               defaultValue={dataProvider && dataProvider?.businessPosition}
               />
                            </div>

                <div className="col-4">
                  <label className="fs-6 mb-2 text-soft-black">User Role</label>
                  <div className="d-flex align-items-center">
                  
                        <CoreInput
                        name='role'
                        placeholder='Role'
                        readOnly={true}
                        defaultValue={dataProvider && dataProvider?.role}
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