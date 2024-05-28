'use client';
import { useRouter } from 'next/navigation';
import { Avatar } from '../../_components/Avatar';
import { useEffect, useState } from 'react';
import { UserServices } from '@/app/api/services/UserServices';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import ArrowIcons from '../../../../../public/icons/arrows/arrow-icon';

const ProfileCard = ({ params }) => {
  const username = params.username;
  const { back } = useRouter();

  const [user,setUser] = useState([]);
  const [userSession,setUserSession] = useState(null);



useEffect(()=>{
const getUser = async (username)=>{
  try {
    const response = await UserServices.getUserInfo(username);
    if (response) 
      {
        setUser(response);
        const userSession = await getSession();
        setUserSession(userSession.username);
      }
  } catch (error) {
    console.log(error)
  }
}
  if(username) getUser(username);
},[username]);

  const handleGoBack = () => {
    back();
  };

  return (
    <>
      
        <div className="profile-header rounded-5 p-4 mb-5">
          <button
            onClick={handleGoBack}
            className="back d-flex justify-content-center align-items-center text-white font-bold  rounded-4 border-0 px-3"
          >
            <ArrowIcons.ArrowLeftIcon /> Back
          </button>
          <p className="text-center fs-2 mb-5 font-bold text-white">Profile</p>
        </div>
      

      <div className="profile-card bg-white rounded-4 p-4 mt-3 col-4 m-auto shadow-sm">
        <div className="d-flex justify-content-around align-items-center gap-5 mb-4">
          <Avatar name={'mohamed ncib'} background={'primary'} rounded='3' textColor={'white'} />
          <div className='d-flex flex-column justify-content-center ' >
            <p className="fs-3">{(user && user?.firstname) +' '+ (user && user?.lastname)}</p>
            <p className="text-muted">{user && user?.position}</p>
          </div>
        </div>

        <div className="card-section py-3 px-5 mb-3 border rounded-3">
          <h4 className=' fw-semibold' >Contact Information</h4>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope-fill me-2"></i> 
              <p className="mb-0">Email</p>
            </div>
            <p className="mb-0">{user && user?.email}</p>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-phone-fill me-2"></i> 
              <p className="mb-0">Phone Number</p>
            </div>
            <p className="mb-0">{user && user.phone}</p>
          </div>
        </div>

        <div className="card-section py-3 px-5 mb-3 border rounded-3">
          <h4>Bio</h4>
         <>
         {user &&(
          user?.bio ? (
            <p className="mb-0">{user?.bio}</p>
          ): (userSession === username) ?(
            <p className='text-center' >
            <Link className='mb-0 text-muted p-2 rounded-3 link' href={'/profile'} >link to edit profile</Link>
            </p>
          ):
          (
            <p className='mb-0 text-muted text-center'>No Bio</p>
          )
         )}
         </>
        </div>

        <div className="card-section py-3 px-5 mb-3 border rounded-3">
          <h4>System</h4>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-fill me-2"></i> 
              <p className="mb-0">Username</p>
            </div>
            <p className="mb-0">{username}</p>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-people-fill me-2"></i>
              <p className="mb-0">User Role</p>
            </div>
            <p className="mb-0">{user && user?.role}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
