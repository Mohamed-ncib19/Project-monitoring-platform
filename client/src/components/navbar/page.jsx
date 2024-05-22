'use client';

import 'semantic-ui-css/semantic.min.css';
import ToogleNotification from './notification/toggle-notication';
import ToggleDropdown from '../dropdown/toggle-dropdown';
import Avatar from '../avatar/page';
import { signOut, useSession } from 'next-auth/react';
import { use, useEffect, useState } from 'react';
import { DecodeToken } from '../../utils/auth/DecodeToken';
import UserRoute from '../../app/api/routes/user/userRoute';
const Navbar = ({ user }) => {
  console.log(user);
  const handlleSignOut = async () => {
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
        <ToogleNotification />

        <ToggleDropdown
          button={
            <button className=" user-dropdown px-2 py-4 rounded-circle border-0">
              <Avatar
                name={(user && user.firstname) + ' ' + (user && user.lastname)}
                rounded={'circle'}
              />
            </button>
          }
          items={[
            { content: 'Profile', link: '/My/profile' },
            { content: 'Settings', onclick: 'function' },
            { content: 'Log out', onclick: handlleSignOut },
          ]}
          lastItemDivide={true}
          nbItemsAfterDivide={1}
        />
      </div>
    </div>
  );
};

export default Navbar;
