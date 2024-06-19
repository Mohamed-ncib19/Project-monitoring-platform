'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import clsx from 'clsx';
import { useNotifications } from 'reapop';

import ViewIcon from '@/../../public/icons/ViewIcon';
import bannedUsersNotFound from '@/../../public/images/banned-users-not-found.png';
import requestsNotFound from '@/../../public/images/requests-not-found.png';
import usersNotFound from '@/../../public/images/users-not-found.png';
import EditDotsIcon from '@/../public/icons/edit-dots-icon';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import { ToggleDropdown } from '@/app/(authenticated)/_components/Dropdown';
import { ConfirmModal } from '@/app/(authenticated)/_components/Modals/ConfirmModal/ConfirmModal';
import { AddModal } from '@/app/(authenticated)/permissions/_components/modals/AddModal/';
import { EditModal } from '@/app/(authenticated)/permissions/_components/modals/EditModal/';
import DataTable from '@/layout/DataTable';

const Permissions = () => {
  const { notify } = useNotifications();

  const [users, setUsers] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);

  const [activeTab, setActiveTab] = useState('requests');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDesactivateModalOpen, setIsDesactivateModalOpen] = useState(false);

  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);

  const [restoreType, setRestoreType] = useState(null);

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
    setSelectedUser(user);
  };

  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleEditShow = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseRestoreModal = () => setIsRestoreModalOpen(false);
  const handleRestoreShow = (user) => {
    setRestoreType(user.role != undefined ? 'account' : 'request');
    setSelectedUser(user);
    setIsRestoreModalOpen(true);
  };

  const handleRestoreMethod = () => {
    return restoreType === 'account' ? handleRestoreUser : handleRestoreRequest;
  };


    const getPendingUsers = async () => {
      try {
        const response = await axios.get('/users/status/pending');
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
    };

    const getUsers = async () => {
      try {
        const response = await axios.get('/users/status/active');
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
    };

    const getBannedUsers = async () => {
      try {
        const response = await axios.get('/users/status/banned');
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
    };
  

  const deleteRequest = async (id) => {
    try {
      const response = await axios.delete(`/users/${id}/ban?type=request`);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };
  const desactivateUser = async (id) => {
    try {
      const response = await axios.delete(`/users/${id}/ban?type=user`);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };

  const restoreRequest = async (id) => {
    try {
      const response = await axios.put(`/users/${id}/restore?type=request`);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };

  const restoreUser = async (id) => {
    try {
      const response = await axios.put(`/users/${id}/restore?type=user`);
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
          getPendingUsers(),
          getBannedUsers(),
          getUsers(),
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
            timeZone: 'UTC',
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
        const formattedDate = date.toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC',
        });
        const formattedTime = date.toLocaleTimeString(undefined, {
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
            className={clsx(
              'text-secondary fw-semibold text-center m-auto col-11 p-2 rounded-5 fw-normal fs-6',
              {
                manager: row.original.role === 'Manager',
                tl: row.original.role === 'teamlead',
                dev: row.original.role === 'teammember',
              },
            )}
          >
            {`${clsx({
              Manager: row.original.role === 'Manager',
              'Team Lead': row.original.role === 'teamlead',
              'Team Member': row.original.role === 'teammember',
            })}`}
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
            href={`/profile/${row.original._id}`}
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
      accessor: 'bannedAt  ',
      Cell: ({ row }) => {
        const date = new Date(row?.original.bannedAt);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC',
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
            className={clsx(
              'text-secondary fw-semibold text-center m-auto col-11 p-2 rounded-5 fw-normal fs-6',
              {
                manager: row.original.role === 'Manager',
                tl: row.original.role === 'teamlead',
                dev: row.original.role === 'teammember',
              },
            )}
          >
            {`${clsx({
              Manager: row.original.role === 'Manager',
              'Team Lead': row.original.role === 'teamlead',
              'Team Member': row.original.role === 'teammember',
            })}`}
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
            href={`/profile/${row.original._id}`}
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
                onclick: () => {
                  handleRestoreShow(row.original);
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
    if (selectedUser?._id) {
      try {
        const response = await desactivateUser(selectedUser?._id);
        if (response.message === 'User banned successfuly') {
          notify({ message: response.message, status: 'success' });
          handleCloseDesactivateModal();
          setActiveTab('bannedUsers');
        } else {
          notify({ message: response.message, status: 'danger' });
        }
      } catch (error) {
        notify({ message: 'Something went wrong', status: 'danger' });
      }
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await deleteRequest(selectedUser?._id);
      if (response.message === 'User banned successfuly') {
        notify({ message: response.message, status: 'success' });
        handleCloseDeleteModal();
        setActiveTab('bannedUsers');
      } else {
        notify({ message: response.message, status: 'danger' });
      }
    } catch (error) {
      notify({ message: 'Something went wrong', status: 'danger' });
    }
  };

  const handleRestoreRequest = async (id) => {
    if (id) {
      try {
        const response = await restoreRequest(id);
        if (response.message === 'User Restored successfuly') {
          handleCloseRestoreModal();
          notify({ message: response.message, status: 'success' });
          setActiveTab('requests');
        } else {
          notify({ message: response.message, status: 'danger' });
        }
      } catch (error) {
        notify({ message: 'Something went wrong', status: 'danger' });
      }
    }
  };

  const handleRestoreUser = async (id) => {
    if (id) {
      try {
        const response = await restoreUser(id);
        if (response.message === 'User Restored successfuly') {
          handleCloseRestoreModal();
          notify({ message: response.message, status: 'success' });
          setActiveTab('users');
        } else {
          notify({ message: response.message, status: 'danger' });
        }
      } catch (error) {
        notify({ message: 'Something went wrong', status: 'danger' });
      }
    }
  };

  return (
    <>
      <div className="pb-2 fs-6">
        <span className=" fs-5 fw-bold">Permission</span>
      </div>
      <div
        id="nav-links"
        className=" d-flex flex-md-row flex-column justify-content-start align-items-start"
      >
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
            <div className="m-auto d-flex flex-column justify-content-start align-items-center">
              <Image
                src={requestsNotFound}
                alt="Not Found"
                className="image"
                loading="lazy"
                placeholder="blur"
                draggable={false}
              />
              <p className="text-center fs-3 text-muted">No requests found</p>
            </div>
          ))}
        {activeTab === 'users' &&
          (users.length > 0 ? (
            <DataTable columns={UsersColumns} data={users} />
          ) : (
            <div className=" m-auto d-flex flex-column justify-content-center align-items-center">
              <Image
                src={usersNotFound}
                alt="Not Found"
                className="image"
                loading="lazy"
                placeholder="blur"
                draggable={false}
              />
              <p className=" text-center fs-3 text-muted">No users found</p>
            </div>
          ))}
        {activeTab === 'bannedUsers' &&
          (bannedUsers.length > 0 ? (
            <DataTable columns={BannedUsersColumns} data={bannedUsers} />
          ) : (
            <div className="m-auto d-flex flex-column justify-content-center align-items-center">
              <Image
                src={bannedUsersNotFound}
                alt="Not Found"
                className="image"
                loading="lazy"
                placeholder="blur"
                draggable={false}
              />
              <p className=" text-center fs-3 text-muted">
                No banned users found
              </p>
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
        show={isRestoreModalOpen}
        handleClose={handleCloseRestoreModal}
        handleClick={() => handleRestoreMethod()(selectedUser?._id)}
      >
        <div className="text-muted fs-5 m-auto px-3">
          <p>Are you sure you want to re-activate this {restoreType}?</p>
        </div>
      </ConfirmModal>
    </>
  );
};

export default Permissions;
