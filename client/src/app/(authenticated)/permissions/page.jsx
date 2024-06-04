'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useNotifications } from 'reapop';

import { ToggleDropdown } from '@/app/(authenticated)/_components/Dropdown';
import DataTable from '@/layout/DataTable';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import ViewIcon from '@/../../public/icons/ViewIcon';
import {AddModal} from '@/app/(authenticated)/permissions/_components/modals/AddModal/';
import {EditModal} from '@/app/(authenticated)/permissions/_components/modals/EditModal/';
import {ConfirmModal} from '@/app/(authenticated)/_components/Modals/ConfirmModal/ConfirmModal';

import EditDotsIcon from '@/../public/icons/edit-dots-icon';
import requestsNotFound from '@/../../public/images/requests-not-found.png'; 
import usersNotFound from '@/../../public/images/users-not-found.png';
import bannedUsersNotFound from '@/../../public/images/banned-users-not-found.png'; 
import clsx from 'clsx';



const Permissions = () => {

  const {notify} = useNotifications();

  const [users, setUsers] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);

  const [activeTab, setActiveTab] = useState('requests');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDesactivateModalOpen, setIsDesactivateModalOpen] = useState(false);

  const [isRestoreModalOpen,setIsRestoreModalOpen] = useState(false);


const [restoreType,setRestoreType] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);


  const handleClose = () => setIsModalOpen(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleShowDeleteModal = (user) => {
    setIsDeleteModalOpen(true);
    setSelectedUser(user);
  };

  const handleCloseDesactivateModal = () => setIsDesactivateModalOpen(false);
  const handleShowDesactivateModal = (user) => {
    setIsDesactivateModalOpen(true);
    setSelectedUser(user)
  }

  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleEditShow = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  
  const handleCloseRestoreModal = () => setIsRestoreModalOpen(false);
  const handleRestoreShow = (user) => {
    setRestoreType(
      user.role != undefined ? 'account'
      :'request'
    )
    setSelectedUser(user);
    setIsRestoreModalOpen(true);
  };

  const handleRestoreMethod = () => {
    return restoreType === 'account' ? handleRestoreUser : handleRestoreRequest;
  };
  

  const api = {
    async getPendingUsers() {
      try {
        const response = await axios.get('/users?pending=true');
        return response.data.users;
      } catch (error) {
        throw new Error(
          JSON.stringify({
            status: error.response?.status,
            code: error?.code,
            data: error.response?.data,
          }),
        );
      }
    },

    async getUsers() {
      try {
        const response = await axios.get('/users?active=true');
        return response.data.users;
      } catch (error) {
        throw new Error(
          JSON.stringify({
            status: error.response?.status,
            code: error?.code,
            data: error.response?.data,
          }),
        );
      }
    },
    async getBannedUsers() {
      try {
        const response = await axios.get('/users?banned=true');
        return response.data.users;
      } catch (error) {
        throw new Error(
          JSON.stringify({
            status: error.response?.status,
            code: error?.code,
            data: error.response?.data,
          }),
        );
      }
    },
  




  

  };

  const deleteRequest = async(username) => {
    try {
      const response = await axios.delete(
        `/users/${username}/ban?type=request`,
      );
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };
  const desactivateUser = async (username) => {
    try {
      const response = await axios.delete(`/users/${username}/ban?type=user`);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };

  const restoreRequest =async (username) => {
    try {
      const response = await axios.put(`/users/${username}/restore?type=request`);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };

  const restoreUser = async (username) => {
    try {
      const response = await axios.put(`/users/${username}/restore?type=user`);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingUsers, bannedUsers, activeUsers] = await Promise.all([
          api.getPendingUsers(),
          api.getBannedUsers(),
          api.getUsers(),
        ]);

        setUserRequests(pendingUsers || []);
        setBannedUsers(bannedUsers || []);
        setUsers(activeUsers || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [activeTab]);

  const Requestcolumns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (row) => `${row.firstname} ${row.lastname}`,
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
          const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });
          return (
            <span>
              {formattedDate} {formattedTime}
            </span>
          );
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
                  onclick: () => handleShowDeleteModal(row.original),
                },
              ]}
              lastItemDivide={false}
            />
          </div>
        ),
      },
    ],
    [],
  );

  const UsersColumns = React.useMemo(() => [
    {
      Header: 'Title',
      Cell: ({ row }) => {
        return (
          <div className="d-flex align-items-center gap-4">
            <span>
              <Avatar
                name={`${row.original.firstname + ' ' + row.original.lastname}`}
                variant={'light'}
                rounded={'circle'}
              />
            </span>
            <span className="d-flex flex-column">
              <span className="fw-bold">
                {`${row.original.firstname} ${row.original.lastname}`}
              </span>
              <span>{row.original.email}</span>
            </span>
          </div>
        );
      },
    },
    {
      Header: 'Phone number',
      accessor: 'phone',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'joined',
      accessor: 'joinedAt',
      Cell: ({ value }) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return (
          <span>
            {formattedDate} {formattedTime}
          </span>
        );
      },
    },
    {
      Header: 'Statut',
      Cell: ({ row }) => {
        return (
          <div
            className={clsx('text-secondary text-center m-auto col-11 p-2 rounded-5 fw-normal fs-6 custom-letter-spacing-small',{
              'manager' : row.original.role === 'Manager',
              'tl' : row.original.role === 'Team lead',
              'dev' : row.original.role === 'Team member'
            })}
          >
            {`${row.original.role}`}
          </div>
        );
      },
    },
    {
      Header: ' ',
      Cell: ({ row }) => {
        return (
          <Link
            className="view-profile p-2 rounded-2"
            href={`/profile/${row.original.username}`}
          >
            View profile <ViewIcon />
          </Link>
        );
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
                content: 'Edit account',
                onclick: () => handleEditShow(row.original),
              },
              {
                content: 'Deactivate',
                onclick: () => handleShowDesactivateModal(row.original),
              },
            ]}
            lastItemDivide={false}
          />
        </div>
      ),
    },
  ]);

  const BannedUsersColumns = React.useMemo(() => [
    {
      Header: 'Title',
      Cell: ({ row }) => {
        return (
          <div className="d-flex align-items-center gap-4">
            <span>
              <Avatar
                name={`${row.original.firstname + ' ' + row.original.lastname}`}
                variant={'light'}
                rounded={'circle'}
              />
            </span>
            <span className="d-flex flex-column">
              <span className="fw-bold">
                {`${row.original.firstname} ${row.original.lastname}`}
              </span>
              <span>{row.original.email}</span>
            </span>
          </div>
        );
      },
    },
    {
      Header: 'Phone number',
      accessor: 'phone',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Banned Date',
      accessor: 'bannedDate  ',
      Cell: ({ value }) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        return (
          <span>
            {formattedDate} {formattedTime}
          </span>
        );
      },
    },
    {
      Header: 'Statut',
      Cell: ({ row }) => {
        return (
          <div
          className={clsx('text-secondary text-center m-auto col-11 p-2 rounded-5 fw-normal fs-6 custom-letter-spacing-small',{
            'manager' : row.original.role === 'Manager',
            'tl' : row.original.role === 'Team lead',
            'dev' : row.original.role === 'Team member'
          })}
        >
          {`${row.original.role || '-----' }`}
        </div>
        );
      },
    },
    {
      Header: ' ',
      Cell: ({ row }) => {
        return row.original.role ? (
          <Link
            className="view-profile p-2 rounded-2"
            href={`/profile/${row.original.username}`}
          >
            View profile <ViewIcon />
          </Link>
        ) : (
          '------'
        );
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
                onclick: () =>{
                  handleRestoreShow(row.original)
                },
              },
            ]}
            lastItemDivide={false}
          />
        </div>
      ),
    },
  ]);




  const handleDesactivateUser = async () => {
    if (selectedUser?.username) {
      try {
        const response = await desactivateUser(selectedUser?.username);
        if(response.message === 'User banned successfuly'){
          notify({message : response.message, status:'success'})
          handleCloseDesactivateModal();
          setActiveTab('bannedUsers');
        }else{
          notify({message : response.message, status:'danger'})
        }
      } catch (error) {
        notify({message : 'server error', status:'danger'})

      }
    }
  };

  const handleDeleteRequest = async () =>{
    try {
        const response = await deleteRequest(selectedUser?.username);
        console.log(response)
        if(response.message === 'User banned successfuly'){
            notify({message : response.message , status:'success'});
            handleCloseDeleteModal();
            setActiveTab('bannedUsers')
        }else{
            notify({message : response.message , status:'danger'});
        }
    } catch (error) {
      console.log(error)
        notify({message : 'internal server error' , status:'danger'});
    }
}



  const handleRestoreRequest = async (username) => {
    if (username) {
      try {
        const response = await restoreRequest(username);
        if(response.message === 'User Restored successfuly'){
          handleCloseRestoreModal();
          notify({message : response.message, status : 'success'});
          setActiveTab('requests')
        }else{
          notify({message : response.message, status : 'danger'});

        }
      } catch (error) {
        notify({message : 'server error' , status : 'danger'});
      }
    }
  };

  const handleRestoreUser = async (username) => {
    if (username) {
      try {
        const response = await restoreUser(username);
        if(response.message === 'User Restored successfuly'){
          handleCloseRestoreModal();
          notify({message : response.message, status : 'success'});
          setActiveTab('users')
        }else{
          notify({message : response.message, status : 'danger'});
        }
      } catch (error) {
        notify({message : 'server error', status:'danger'})

      }
    }
  };



  return (
    <>
      <div className="pb-2 fs-6">
        <p className="light-text-custom-color">Users</p>
        <p className=" fs-5 fw-bold">Permission</p>
      </div>
      <div id="nav-links" className=' d-flex flex-md-row flex-column justify-content-start align-items-start'>
        <button
          className={`${activeTab === 'requests' ? 'requests' : 'border-0'}  fw-bold p-2`}
          onClick={() => setActiveTab('requests')}
        >
          Requests{' '}
          <span className="nb-requests bg-light p-1 rounded-circle fs-5 ">
            {userRequests.length}
          </span>
        </button>
        <button
          className={`${activeTab === 'users' ? 'users' : ' border-0'} fw-bold p-2`}
          onClick={() => setActiveTab('users')}
        >
          Users{' '}
          <span className="nb-users bg-light p-1 rounded-circle  fs-5">
            {users.length}
          </span>
        </button>
        <button
          className={`${activeTab === 'bannedUsers' ? 'banned-user' : 'border-0'} fw-bold p-2`}
          onClick={() => setActiveTab('bannedUsers')}
        >
          Banned Users{' '}
          <span className="nb-banned-users bg-light p-1 rounded-circle  fs-5">
            {bannedUsers.length}
          </span>
        </button>
      </div>

      <>
        {activeTab === 'requests' &&
          (userRequests.length > 0 ? (
            <DataTable columns={Requestcolumns} data={userRequests} />
          ) : (
            <div className='m-auto d-flex flex-column justify-content-start align-items-center'>
            <Image
              src={requestsNotFound}
              alt='Not Found'
              className='image'
              loading='lazy'
              placeholder='blur'
            />
            <p className='text-center fs-1 fw-bold text-muted'>No requests found</p>
          </div>
            ))}
        {activeTab === 'users' &&
          (users.length > 0 ? (
            <DataTable columns={UsersColumns} data={users} />
          ) : (
            <div  className=' m-auto d-flex flex-column justify-content-center align-items-center' >
            <Image
              src={usersNotFound}
              alt='Not Found'
              className='image'
              loading='lazy'
              placeholder='blur'
            />
          <p className=" text-center fs-1 fw-bold text-muted">no users found</p>
          </div>  
         ))}
        {activeTab === 'bannedUsers' &&
          (bannedUsers.length > 0 ? (
            <DataTable columns={BannedUsersColumns} data={bannedUsers} />
          ) : (
            <div  className='m-auto d-flex flex-column justify-content-center align-items-center' >
              <Image
              src={bannedUsersNotFound}
              alt='Not Found'
              className='image'
              loading='lazy'
              placeholder='blur'
            />
            <p className=" text-center fs-1 fw-bold text-muted">no banned users found</p>
            </div>  
          ))}
      </>
      <AddModal
        headerTitle="Setup account"
        show={isModalOpen}
        handleClose={handleClose}
        buttonLabel={'Save'}
        user={selectedUser}
        setActiveTab={setActiveTab}
      />


      <ConfirmModal
        headerTitle="Delete request"
        username={selectedUser?.username}
        show={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
       handleClick={handleDeleteRequest}
      >
        <div className="text-muted fs-5 m-auto px-3">
          <p>Are you sure you want to delete this request?</p>
          <p>You can undo in the banned list</p>
        </div>
      </ConfirmModal>



      <EditModal
        headerTitle={'Edit account'}
        show={isEditModalOpen}
        handleClose={handleCloseEditModal}
        buttonLabel={'Save'}
        user={selectedUser}
        setActiveTab={setActiveTab}
      />


   
      <ConfirmModal
        headerTitle="Deactivate acount"
        username={selectedUser?.username}
        show={isDesactivateModalOpen}
        handleClose={handleCloseDesactivateModal}
        handleClick={handleDesactivateUser}
      >
        <div className="text-muted fs-5 m-auto px-3">
          <p>Are you sure you want to deactivate this account ? </p>
          <p>You can undo in the banned list</p>
        </div>
      </ConfirmModal>



   <ConfirmModal
  headerTitle={`Restore ${restoreType}`}
  username={selectedUser?.username}
  show={isRestoreModalOpen}
  handleClose={handleCloseRestoreModal}
  handleClick={() => handleRestoreMethod()(selectedUser?.username)}
>
  <div className="text-muted fs-5 m-auto px-3">
    <p>Are you sure you want to re-activate this {restoreType}?</p>
  </div>
</ConfirmModal>





    </>
  );
};

export default Permissions;