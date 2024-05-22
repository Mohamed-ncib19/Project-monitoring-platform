'use client';
import React, { useEffect, useState } from 'react';

import ToggleDropdown from '../../../../../components/dropdown/toggle-dropdown';
import SetupEditForm from '../../../../../components/Forms/setup-edit-Form/setupEditForm';
import Loader from '../../../../../components/loader/page';
import CustomModal from '../../../../../components/rightside-modal/modal';
import Table from '../../../../../layout/table/table';
import EditDotsIcon from '../../../../../public/icons/edit-dots-icon';
import UserRoute from '../../../../api/routes/user/userRoute';

import './approve.styles.css';

const Approve = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = () => setIsModalOpen(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await UserRoute.getPendingUsers();
        if (res.ok) {
          setUsers(res.data);
          setLoading(false);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  const Requestcolumns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstname',
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
                  onclick: () => console.log('deleted'),
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

  return (
    <div className="vh-100 p-4">
      <div className="pb-4">
        <p className="light-text-custom-color">Users</p>
        <p className="fs-2 fw-bold">Permission</p>
      </div>
      <div id="nav-links" className="mb-5">
        <button
          className={`${activeTab === 'requests' ? 'requests' : ''} border-0 px-4`}
          onClick={() => setActiveTab('requests')}
        >
          Requests <span>1</span>
        </button>
        <button
          className={`${activeTab === 'users' ? 'users' : ''} border-0 px-4`}
          onClick={() => setActiveTab('users')}
        >
          Users <span>3</span>
        </button>
        <button
          className={`${activeTab === 'bannedUsers' ? 'banned-user' : ''} border-0 px-4`}
          onClick={() => setActiveTab('bannedUsers')}
        >
          Banned User <span>5</span>
        </button>
      </div>

      {loading ? <Loader /> : <Table columns={Requestcolumns} data={users} />}

      <CustomModal
        form={<SetupEditForm user={selectedUser} />}
        headerTitle={'Account setup'}
        show={isModalOpen}
        handleClose={handleClose}
        edit={false}
      />
    </div>
  );
};

export default Approve;
