'use client';

import { signOut } from 'next-auth/react';

import { Avatar } from '@/app/(authenticated)/_components/Avatar';

import {ToggleDropdown} from '@/app/(authenticated)/_components/Dropdown';

import ToggleNotification from './notification/toggle-notication';

const Navbar = ({ user }) => {
  const { profile } = user;
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="custom-bg-primary py-4 w-100 d-flex flex-md-row flex-column justify-content-between px-5 align-items-center ">
      <input
        type="text"
        placeholder="search"
        className="p-3 rounded-3 border-0"
      />

      <div className="d-flex justify-content-end align-items-center gap-4">
        <ToggleNotification />

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

export default Navbar;
