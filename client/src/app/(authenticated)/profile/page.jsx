'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';


import { EditProfileForm } from './_components/EditProfileForm';
import axios from 'axios';


const Profile = () => {

const [userData,setUserData] = useState(null);

  const getUser = async () =>{
    try {
      const response = await axios.get('/users/me');
      console.log(response)
      setUserData(response.data.user);
    } catch (error) {
        alert('internal server error');
        return;
    }
  }

  useEffect(()=>{
    getUser();
  },[])

console.log(userData)


  const editUserInfo = async (userData) => {
    try {
      const response = await axios.put('/users/me', userData);
      return response.data.data;
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
  return (
    <div className="px-3 d-flex flex-column gap-2 col-11 m-auto">
      <div className="">
        <h1 className="fs-1">Profile</h1>
        <p className="light-text-custom-color fw-bold">
          Update your profile and personal details here
        </p>
      </div>

      <EditProfileForm dataProvider={userData} />

     
    </div>
  );
};

export default Profile;
