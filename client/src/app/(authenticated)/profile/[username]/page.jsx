'use client';
import { useRouter } from 'next/navigation';
import { Avatar } from '../../_components/Avatar';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import ArrowIcons from '../../../../../public/icons/arrows/arrow-icon';

const ProfileCard = ({ params }) => {
  const username = params.username;
  const { back } = useRouter();

  const [user, setUser] = useState({});
  const [userSession, setUserSession] = useState(null);

  const getUserInfo= async (username) => {
    try {
      const response = await axios.get(`/users/${username}`);
      return response.data.data
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status:error.response?.status,
          code : error?.code,
          data : error.response?.data,
        })
      )
    }
  }


  useEffect(() => {
    const getUser = async (username) => {
      try {
        const response = await getUserInfo(username);
        if (response) {
          setUser(response);
          const session = await getSession();
          setUserSession(session?.username);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (username) getUser(username);
  }, [username]);

  const handleGoBack = () => {
    back();
  };

  return (
    <>
      <div className="profile-header rounded-5 rounded-md-0 p-4 mb-5">
        <button
          onClick={handleGoBack}
          className="back fs-3 d-flex justify-content-center align-items-center text-white font-bold rounded-4 border-0 px-3"
        >
          <ArrowIcons.ArrowLeftIcon /> Back
        </button>
        <p className="text-center h1 mb-5 font-bold text-white">Profile</p>
      </div>

      <div className="profile-card d-flex flex-column gap-4 bg-white rounded-4 p-4 py-5 my-5 mt-3 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto shadow-sm">
        <div className="d-flex justify-content-start align-items-center gap-5 mb-4">
          <div className='bg-light p-5 rounded-circle shadow-sm'>
            <Avatar name={'mohamed ncib'} background={'light'} rounded='3' textColor={'secondary'} />
          </div>
          <div className='d-flex flex-column justify-content-center'>
            <p className="fs-3">{`${user?.firstname || ''} ${user?.lastname || ''}`}</p>
            <p className="text-muted">{user?.position || ''}</p>
          </div>
        </div>

        <div className="card-section d-flex flex-column gap-3 py-3 px-5 mb-3 border rounded-3">
          <h4 className='fw-semibold'>Contact Information</h4>
          <div className="d-flex flex-md-column justify-content-between">
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope-fill me-2"></i>
              <p className="mb-0 text-secondary fw-bold">Email</p>
            </div>
            <p className="mb-0 custom-value-field">{user?.email || ''}</p>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-phone-fill me-2"></i>
              <p className="mb-0 text-secondary fw-bold">Phone Number</p>
            </div>
            <p className="mb-0 custom-value-field">{user?.phone || ''}</p>
          </div>
        </div>

        <div className="card-section d-flex flex-column gap-3 py-3 px-5 mb-3 border rounded-3">
          <h4>Bio</h4>
          {user ? (
            user.bio ? (
              <p className="mb-0 text-secondary">{user.bio}</p>
            ) : userSession === username ? (
              <p className='text-center'>
                <Link className='mb-0 text-muted text-decoration-underline p-2 rounded-3 link' href={'/profile'}>Add your Bio</Link>
              </p>
            ) : (
              <p className='mb-0 text-muted text-center'>No Bio</p>
            )
          ) : null}
        </div>

        <div className="card-section d-flex flex-column gap-3 py-3 px-5 mb-3 border rounded-3">
          <h4>System</h4>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <i className="bi bi-person-fill me-2"></i>
              <p className="mb-0 text-secondary fw-bold">Username</p>
            </div>
            <p className="mb-0 custom-value-field">{username}</p>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <div className="d-flex align-items-center">
              <i className="bi bi-people-fill me-2"></i>
              <p className="mb-0 text-secondary fw-bold">User Role</p>
            </div>
            <p className="mb-0 custom-value-field">{user?.role || ''}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
