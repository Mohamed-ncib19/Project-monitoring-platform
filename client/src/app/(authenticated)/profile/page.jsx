'use client';
import { useEffect, useState } from 'react';

import { EditProfileForm } from '@/app/(authenticated)/profile/_components/EditProfileForm/';
import axios from 'axios';
import { useNotifications } from 'reapop';


const Profile = () => {

const { notify } = useNotifications();

const [userData,setUserData] = useState(null);

  const getUser = async () =>{
    try {
      const response = await axios.get('/users/me');
      setUserData(response.data.user);
    } catch (error) {
      notify({ message: 'Failed to load information. Please try again later.', status: 'danger' });
    }
  }

  useEffect(()=>{
    getUser();
  },[]);



  return (
    <div className="px-3 d-flex flex-column gap-2 col-11 m-auto">
      <div className="">
        <h1 className="fs-2">Profile</h1>
        <p className="light-text-custom-color fw-bold profile-page-label  ">
          Update your profile and personal details here
        </p>
      </div>

      <EditProfileForm dataProvider={userData} />

     
    </div>
  );
};

export default Profile;
