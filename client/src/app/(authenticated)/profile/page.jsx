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
    } catch (error) {
        alert('internal server error');
        return;
    }
  }

  useEffect(()=>{
    getUser();
  },[])

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

/*   const onSubmit = async (data) => {
    try {
      const { firstname, lastname, bio, phone } = data;
      const cleanData = {};

      if (firstname && firstname !== userData.firstname) {
        cleanData.firstname = firstname;
      }

      if (lastname && lastname !== userData.lastname) {
        cleanData.lastname = lastname;
      }

      if (bio && bio !== userData.bio) {
        cleanData.bio = bio;
      }

      if (phone && phone !== userData.phone) {
        cleanData.phone = phone;
      }

      if (Object.keys(cleanData).length > 0) {
        const resUpdateUser = await editUserInfo(cleanData);

        if (resUpdateUser.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Profile information updated successfully',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update',
            text: resUpdateUser.status === 404 ? 'Resource not found' : 'Server error',
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'You did not make any updates.',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update',
        text: 'An unexpected error occurred',
      });
    }
  }; */

  return (
    <div className="px-3 d-flex flex-column gap-2 col-11 m-auto">
      <div className="">
        <h1 className="fs-1">Profile</h1>
        <p className="light-text-custom-color fw-bold">
          Update your profile and personal details here
        </p>
      </div>

     {/*  <EditProfileForm /> */}

     
    </div>
  );
};

export default Profile;
