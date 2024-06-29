'use client';
import { signOut } from 'next-auth/react';
import { Button, Dropdown } from 'react-bootstrap';

import { Avatar } from '@/app/(authenticated)/_components/Avatar';
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
    <div className="custom-bg-primary py-2 d-flex justify-content-end align-items-center">
      <div className="col-md-10 col-12 d-flex d-flex flex-row justify-content-md-between justify-content-around align-items-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 ps-3  col-lg-3 col-md-4 rounded-3 border-0"
        />

        <div className=" d-md-flex d-none justify-content-end align-items-center gap-4 mx-md-5">
          <ToggleNotification data={notifications} />

          <Dropdown>
            
           <div>
           <Dropdown.Toggle
              as={Button}
              className=" btn btn-light py-4 rounded-circle"
            >
              <Avatar
                name={profile.firstName + ' ' + profile.lastName}
                variant="light"
                rounded="circle"
              />
            </Dropdown.Toggle>
           </div>

            <Dropdown.Menu className="mt-2">
              <Dropdown.Item href="/profile">Manage Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
        <div className='d-md-none d-flex' >
          navbar responsive contain : 
          {/*<ToggleNotification data={notifications} responsive={true} />*/}
          <Button>test</Button>
        </div>
      </div>
    </div>
  );
};
