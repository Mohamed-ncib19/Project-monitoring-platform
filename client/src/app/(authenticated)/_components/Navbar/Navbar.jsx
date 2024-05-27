'use client';

import { signOut } from 'next-auth/react';

import { Avatar } from '@/app/(authenticated)/_components/Avatar';

import {ToggleDropdown} from '@/app/(authenticated)/_components/Dropdown';
import { ToggleNotification } from '@/app/(authenticated)/_components/ToggleNotification';


export const Navbar = ({ user }) => {
  const { profile } = user;
  const handleSignOut = async () => {
    await signOut();
  };


  const notifications = [
    {
      id: 1,
      type: 'new user',
      status: 'unread',
      name: 'adem zerri',
    },
    {
      id: 2,
      type: 'group',
      status: 'unread',
      name: 'mohamed ncib',
    },
    {
      id: 3,
      type: 'project',
      status: 'unread',
      name: 'ahmed boumiza',
    },
    {
      id: 4,
      type: 'top 1',
      status: 'unread',
      name: 'haider hani',
    },
    {
      id: 5,
      type: 'top 3',
      status: 'unread',
      name: 'nabil',
    },
  ];

  return (
    <div className="custom-bg-primary py-4 w-100 d-flex flex-md-row flex-column justify-content-between px-5 align-items-center">
      <input
        type="text"
        placeholder="search"
        className="p-3 mx-5 rounded-3 border-0"
      />

      <div className="d-flex justify-content-end align-items-center gap-4">
        <ToggleNotification data={notifications} />

        <ToggleDropdown
          button={
            <button className=" user-dropdown px-2 py-4 rounded-circle border-0">
              <Avatar
                name={
                  profile
                    ? `${profile.firstName} ${profile.lastName}`
                    : 'Pixel Bord'
                }
                rounded={'circle'}
              />
            </button>
          }
          items={[
            { content: 'Profile', link: '/profile' },
            { content: 'Settings', onclick: 'function' },
            { content: 'Log out', onclick: handleSignOut },
          ]}
          lastItemDivide={true}
          nbItemsAfterDivide={1}
        />
      </div>
    </div>
  );
};
