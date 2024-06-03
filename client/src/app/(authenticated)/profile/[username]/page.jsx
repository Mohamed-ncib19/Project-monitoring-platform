'use client';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';

import { Avatar } from '@/app/(authenticated)/_components/Avatar';

const ProfileCard = ({ params }) => {
  const username = params.username;

  const [user, setUser] = useState({});
  const [userSession, setUserSession] = useState(false);

  const getUser = async (username) => {
    try {
      const response = await axios.get(`/users/${username}`);
      if (response && response.data) {
        const fetchedUser = response.data.user;
        setUser(fetchedUser);

        const session = await getSession();
        setUserSession(session.username === fetchedUser.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (username) {
      getUser(username);
    }
  }, [username]);

  return (
      <div className="profile-card d-flex flex-column gap-4 bg-white rounded-4 p-4  col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto shadow-sm">
        <div className="d-flex justify-content-start align-items-center gap-5 mb-4">
          <div className="bg-light p-5 rounded-circle shadow-sm">
            <Avatar
              name={'mohamed ncib'}
              variant={'light'}
              rounded="3"
              textColor={'secondary'}
            />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <p className="fs-3">{`${user?.firstname || ''} ${user?.lastname || ''}`}</p>
            <p className="text-muted">{user?.businessPosition || ''}</p>
          </div>
        </div>

        <div className="card-section d-flex flex-column gap-3 py-3 px-5 mb-3 border rounded-3">
          <h4 className="fw-semibold">Contact Information</h4>
          
          <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-envelope fs-3 text-muted "></i>
              <p className="mb-0 text-secondary fw-bold">Email</p>
            </div>
            <p className="mb-0 custom-value-field">{user?.email || ''}</p>
          </div>

          <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-whatsapp fs-3 text-muted"></i>
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
            ) : userSession ? (
              <p className='text-center'>
                <Link className='mb-0 text-muted text-decoration-underline p-2 rounded-3 link' href={'/profile'}>Add your Bio</Link>
              </p>
            ) : (
              <p className="mb-0 text-muted text-center">No Bio</p>
            )
          ) : null}
        </div>

        <div className="card-section d-flex flex-column gap-3 py-3 px-5 mb-3 border rounded-3">
          <h4>System</h4>

          <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-person fs-3 text-muted"></i>
              <p className="mb-0 text-secondary fw-bold">Username</p>
            </div>
            <p className="mb-0 custom-value-field">{username}</p>
          </div>

          <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-person-gear fs-3 text-muted"></i>
              <p className="mb-0 text-secondary fw-bold">User Role</p>
            </div>
            <p className="mb-0 custom-value-field">{user?.role || ''}</p>
          </div>
        </div>
      </div>
  );
};

export default ProfileCard;
