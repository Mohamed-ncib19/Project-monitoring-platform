'use client';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';

import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import { useNotifications } from 'reapop';
import clsx from 'clsx';

const ProfileCard = ({ params }) => {
  const { userId } = params;

  const { notify } = useNotifications();

  const [user, setUser] = useState({});
  const [userSession, setUserSession] = useState(false);

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      if (response && response.status === 200 && response.data) {
        const fetchedUser = response.data.user;
        setUser(fetchedUser);

        const session = await getSession();
        setUserSession(session.profile.username === fetchedUser.username);
      }
    } catch (error) {
      notify({ message: 'Failed to load information. Please try again later.', status: 'danger' });
    }
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  return (
    <div className="profile-card d-flex flex-column gap-4 bg-white rounded-4 p-3 col-12 col-sm-8 col-md-6 col-lg-5 col-xl-3 mx-auto shadow-sm">
      <div className="d-flex justify-content-start align-items-center gap-4 mb-3">
        <div className="bg-light rounded-circle shadow-sm">
          <Avatar
            name={'mohamed ncib'}
            variant={'light'}
            rounded="circle"
            textColor={'secondary'}
          />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <p className="fs-3">{`${user?.firstname || ''} ${user?.lastname || ''}`}</p>
          <p className="text-muted">{user?.businessPosition || ''}</p>
        </div>
      </div>

      <div className="card-section d-flex flex-column gap-2 py-2 px-4 mb-2 border rounded-3">
        <h4 className="fw-semibold">Contact Information</h4>
        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-envelope fs-4 text-muted"></i>
            <p className="mb-0 text-secondary fw-bold">Email</p>
          </div>
          <p className="mb-0 custom-value-field">{user?.email || ''}</p>
        </div>

        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-whatsapp fs-4 text-muted"></i>
            <p className="mb-0 text-secondary fw-bold">Phone Number</p>
          </div>
          <p className="mb-0 custom-value-field">{user?.phone || ''}</p>
        </div>
      </div>

      <div className="card-section d-flex flex-column gap-2 py-2 px-4 mb-2 border rounded-3">
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

      <div className="card-section d-flex flex-column gap-2 py-2 px-4 mb-2 border rounded-3">
        <h4>System</h4>
        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-person fs-4 text-muted"></i>
            <p className="mb-0 text-secondary fw-bold">Username</p>
          </div>
          <p className="mb-0 custom-value-field">{user?.username}</p>
        </div>
        <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-person-gear fs-4 text-muted"></i>
            <p className="mb-0 text-secondary fw-bold">User Role</p>
          </div>
          <p className="mb-0 custom-value-field">{clsx({
            'Manager': user?.role === process.env.NEXT_PUBLIC_MANAGER_ROLE,
            'Team lead': user?.role === process.env.NEXT_PUBLIC_TEAMLEAD_ROLE,
            'Team member': user?.role === process.env.NEXT_PUBLIC_TEAMMEMBER_ROLE,
          }) || ''}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
