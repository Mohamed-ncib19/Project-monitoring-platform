'use client';
import React, { useEffect, useState } from 'react';

import EditDotsIcon from '@/../public/icons/edit-dots-icon';


import { EditForm } from '@/app/(authenticated)/permissions/_components/EditForm';
import { ToggleDropdown } from '@/app/(authenticated)/_components/Dropdown';
import DataTable from '@/layout/DataTable/';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import Link from 'next/link';
import ViewIcon from '../../../../public/icons/ViewIcon';
import AddModal from '@/app/(authenticated)/permissions/_components/modals/AddModal';
import EditModal from '@/app/(authenticated)/permissions/_components/modals/EditModal';
import { AddForm } from './_components/AddForm';
import {UserServices} from '@/app/api/services/UserServices/';

const Permissions = () => {
  const [users, setUsers] = useState([]);
  const [userRequests,setUserRequests] = useState([]);
  const [bannedUsers,setBannedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('requests');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = () => setIsModalOpen(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseEditModal = () =>setIsEditModalOpen(false);
  const handleEditShow = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };


  useEffect(() => {

    
    const getRequests = async () => {
      try {
        const res = await UserServices.getPendingUsers();
        if (res) {
          setUserRequests(res);
        } else {
          setUserRequests([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const getBanned = async () =>{
      try {
        const response = await UserServices.getBannedUsers();
        if(response){
          setBannedUsers(response);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const getActiveUsers = async () =>{
      try {
        const res = await UserServices.getUsers();
        if(res){
          setUsers(res);
        }
      } catch (error) {
        console.log(error);
      }
    }

    
      getRequests();
    
      getActiveUsers();
    
      getBanned();
    
  }, [activeTab]);

  const Requestcolumns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: row => `${row.firstname} ${row.lastname}`,
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Registration Date',
        accessor: 'joinedAt',
        Cell: ({ value }) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
          return <span>{formattedDate} {formattedTime}</span>;
        },
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <ToggleDropdown
              button={
                <button className="edit fs-4 text-dark-gray border-0 p-1 rounded-2">
                  <EditDotsIcon />
                </button>
              }
              items={[
                {
                  content: 'Set Profile',
                  onclick: () => handleShow(row.original),
                },
                {
                  content: 'Delete',
                  onclick: () => console.log('deleted'),
                },
              ]}
              lastItemDivide={false}
            />
          </div>
        ),
      }
    ],
    []
  );

  const UsersColumns = React.useMemo(
    ()=>[
      {
        Header:'Title',
        Cell: ({ row }) => {
          return (
            <div className='d-flex align-items-center gap-4' >
              <span>
                <Avatar name={`${row.original.firstname+' '+row.original.lastname}`} background={'light'} rounded={'circle'} />
              </span>
              <span className='d-flex flex-column' >
                <span className='fw-bold' >
                {`${row.original.firstname} ${row.original.lastname}`}
                </span>
                <span>
                {row.original.email}
                </span>
              </span>
            </div>
          );
        },
      },
      {
        Header:'Phone number',
        accessor:'phone'
      },
      {
        Header:'Email',
        accessor:'email'
      },
      {
        Header:'joined',
        accessor:'joinedAt'
      },
      {
        Header:'Statut',
        Cell:({row})=>{
          return(
            <div className={`${row.original.role === 'manager' ? 'bg-danger col-11 m-auto '
            : row.original.role === 'Team lead' ? 'tl col-9 m-auto'
            : row.original.role === 'Developer' ? 'dev col-10 m-auto '
            : '' }
            
            text-white text-center p-2 rounded-5 fw-semibold custom-letter-spacing-small `} >
              {`${row.original.role}`}
            </div>
          );
        }
      },
      {
        Header:' ',
        Cell:({row})=>{
          return(
            <Link
            className='view-profile p-2 rounded-2'
            href={`/profile/${row.original.username}`}>
              View profile <ViewIcon />
            </Link>
          );
        }
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <ToggleDropdown
              button={
                <button className="edit fs-4 text-dark-gray border-0 p-1 rounded-2">
                  <EditDotsIcon />
                </button>
              }
              items={[
                {
                  content: 'Edit account',
                  onclick: () => handleEditShow(row.original),
                },
                {
                  content: 'Deactivate',
                  onclick: () => console.log('deleted'),
                },
              ]}
              lastItemDivide={false}
            />
          </div>
        ),
      }
    ]
  );

  const BannedUsersColumns = React.useMemo(
    ()=>[
      {
        Header:'Title',
        Cell: ({ row }) => {
          return (
            <div className='d-flex align-items-center gap-4' >
              <span>
                <Avatar name={`${row.original.firstname+' '+row.original.lastname}`} background={'light'} rounded={'circle'} />
              </span>
              <span className='d-flex flex-column' >
                <span className='fw-bold' >
                {`${row.original.firstname} ${row.original.lastname}`}
                </span>
                <span>
                {row.original.email}
                </span>
              </span>
            </div>
          );
        },
      },
      {
        Header:'Phone number',
        accessor:'phone'
      },
      {
        Header:'Email',
        accessor:'email'
      },
      {
        Header:'Banned Date',
        accessor:'bannedDate  '
      },
      {
        Header:'Statut',
        Cell:({row})=>{
          return(
            <div className={`${row.original.role === 'manager' ? 'bg-danger col-11 m-auto '
            : row.original.role === 'Team lead' ? 'tl col-9 m-auto'
            : row.original.role === 'Developer' ? 'dev col-10 m-auto '
            : '' }
            ${row.original.role && 'text-white'}
             text-center p-2 rounded-5 fw-semibold custom-letter-spacing-small `} >
              {`${row.original.role || '-----'}`}
            </div>
          );
        }
      },
      {
        Header: ' ',
        Cell: ({ row }) => {
          return row.original.role ? (
            <Link
              className='view-profile p-2 rounded-2'
              href={`/profile/${row.original.username}`}
            >
              View profile <ViewIcon />
            </Link>
          ) : '------';
        },
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <ToggleDropdown
              button={
                <button className="edit fs-4 text-dark-gray border-0 p-1 rounded-2">
                  <EditDotsIcon />
                </button>
              }
              items={[
                {
                  content: 'Restore account',
                  onclick: () => console.log('Restored'),
                }
              ]}
              lastItemDivide={false}
            />
          </div>
        ),
      }
    ]
  )


  return (
      <>
        <div className='pb-4'>
          <p className='light-text-custom-color'>Users</p>
          <p className='fs-2 fw-bold'>Permission</p>
        </div>
        <div id="nav-links" className="mb-5  ">
          <button
            className={`${activeTab === 'requests' ? 'requests' : 'border-0'}  fw-bold px-4 p-2`}
            onClick={() => setActiveTab('requests')}
          >
            Requests <span className='nb-requests bg-light p-1 rounded-circle fs-5 ' >{userRequests.length}</span>
          </button>
          <button
            className={`${activeTab === 'users' ? 'users' : ' border-0'} fw-bold px-4 p-2`}
            onClick={() => setActiveTab('users')}
          >
            Users <span className='nb-users bg-light p-1 rounded-circle  fs-5' >{users.length}</span>
          </button>
          <button
            className={`${activeTab === 'bannedUsers' ? 'banned-user' : 'border-0'} fw-bold px-4 p-2`}
            onClick={() => setActiveTab('bannedUsers')}
          >
            Banned Users <span className='nb-banned-users bg-light p-1 rounded-circle  fs-5' >{bannedUsers.length}</span>
          </button>
        </div>

        {
  activeTab === 'requests' ? (
    userRequests.length > 0 ? (
    <DataTable columns={Requestcolumns} data={userRequests} />
    ):(
      <p className=' text-center ' >no requests</p>
    )
  ) : activeTab === 'users' ? (
    users.length > 0 ? (
      <DataTable columns={UsersColumns} data={users} />
      ):(
        <p className=' text-center ' >no users</p>
      )
  ) : (
    bannedUsers.length > 0 ? (
      <DataTable columns={BannedUsersColumns} data={bannedUsers} />
      ):(
        <p className=' text-center ' >no banned users</p>
      )
  )
}


          <AddModal
          headerTitle={'Setup account'}
          show={isModalOpen}
          handleClose={handleClose}
          buttonLabel={'Save'}
        >
            <AddForm user={selectedUser} />
        </AddModal>

        <EditModal
          headerTitle={'Edit account'}
          buttonLabel={'Save'}
          show={isEditModalOpen}
          handleClose={handleCloseEditModal}
        >
           <EditForm user={selectedUser} />
        </EditModal>
      </>
  );
};

export default Permissions;
