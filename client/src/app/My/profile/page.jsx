'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import logo from '@/public/Logo.png';
import { yupResolver } from '@hookform/resolvers/yup';

import SubmitButton from '../../../components/buttons/submit-button/submit-button';
import Input from '../../../components/Inputs/custom-input/page';
import ReadOnlyInput from '../../../components/Inputs/read-only-input/page';
import SelectInput from '../../../components/Inputs/select-input/page';
import Textarea from '../../../components/Inputs/textarea/page';
import Loader from '../../../components/loader/page';
import { DecodeToken } from '../../../utils/auth/DecodeToken';
import UserRoute from '../../api/routes/user/userRoute';

const Profile = () => {
  const Schema = Yup.object().shape({
    bio: Yup.string(),
    firstname: Yup.string(),
    lastname: Yup.string(),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid'),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decoded = await DecodeToken(session?.token);
        const res = await UserRoute.getUserInfo(
          decoded.username,
          session?.token,
        );

        if (res.ok) {
          setUserData(res.data);
          setLoading(false);

          if (res.data?.skills && Array.isArray(res.data.skills)) {
            const skillsAsObjects = res.data.skills.map((skill) => ({
              key: skill,
              text: skill.charAt(0).toUpperCase() + skill.slice(1),
              value: skill,
            }));
          } else {
            console.error('userSkills is null or not an array.');
          }

          setValue('bio', res.data.bio || '');
          setValue('firstname', res.data.firstname || '');
          setValue('lastname', res.data.lastname || '');
          setValue('phone', res.data.phone || '');
        } else {
          alert('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session, setValue]);
  console.log(userData);
  const onSubmit = async (data) => {
    try {
      const { firstname, lastname, bio, phone } = data;
      const cleanData = {};

      if (firstname && firstname !== userData.firstname) {
        cleanData.firstname = firstname;
      }

      if (lastname && lastname !== userData.lastname) {
        cleanData.lastname = lastname;
      }

      if (bio && bio !== userData.bio) {
        cleanData.bio = bio;
      }

      if (phone && phone !== userData.phone) {
        cleanData.phone = phone;
      }

      if (Object.keys(cleanData).length > 0) {
        const resUpdateUser = await UserRoute.editUserInfo(
          cleanData,
          userData?.username,
          session?.token,
        );

        if (resUpdateUser.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Profile information updated successfully',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update',
            text:
              resUpdateUser.status === 404
                ? 'Resource not found'
                : 'Server error',
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Changes',
          text: 'You did not make any updates.',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to update',
        text: 'An unexpected error occurred',
      });
    }
  };

  return (
    <div className="px-3 d-flex flex-column gap-2 col-11 m-auto">
      <div className="">
        <h1 className="fs-1">Profile</h1>
        <p className="light-text-custom-color fw-bold">
          Update your profile and personal details here
        </p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <FormProvider register={register} errors={errors}>
          <form
            className="d-flex flex-column gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="border-2 py-4 border-top border-bottom border-secondary-subtle">
              <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
                <div>
                  <h2 className="fw-bold fs-4  ">Your Photo</h2>
                  <p className=" text-soft-black">
                    This will be displayed on your profile
                  </p>
                </div>

                <div className="col-lg-6 col-md-7 col-12 d-flex align-items-center gap-4">
                  <Image
                    src={logo}
                    className=" bg-light rounded-circle"
                    width={200}
                    height={170}
                    alt="user photo"
                  />
                  <div className="d-flex flex-column align-items-start gap-3 col-12 ">
                    <p>Upload new Image</p>
                    <input type="file" />
                    <p className=" text-soft-black">
                      The ideal image is 192 x192 pixels. The maximum file size
                      allowed is 200KG
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 py-4 border-bottom border-secondary-subtle">
              <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
                <h2 className="fw-bold fs-4  ">Username</h2>
                <div className="col-lg-6 col-md-7 col-12">
                  <p className="fs-6 mb-2 text-soft-black">username</p>
                  <div className="d-flex align-items-center">
                    <ReadOnlyInput
                      disabled={true}
                      type={'text'}
                      value={userData?.username}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 py-4 border-bottom border-secondary-subtle">
              <div className="col-lg-8 col-md-9 d-flex flex-md-row flex-column justify-content-between align-items-center">
                <div>
                  <h2 className="fw-bold fs-4  ">Your Bio</h2>
                  <p className=" text-soft-black">Write a short introduction</p>
                </div>
                <div className="col-lg-6 col-md-7 col-12">
                  <p className="fs-6 mb-2 text-soft-black ">About me</p>
                  <div className="d-flex align-items-center">
                    <Textarea
                      register={register('bio')}
                      value={userData?.bio && userData?.bio}
                      errors={errors}
                      placeholder={'Your bio'}
                      name={'bio'}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 py-4 border-bottom border-secondary-subtle">
              <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                <h2 className="fw-bold fs-4  ">Fullname</h2>

                <div className="row d-flex justify-content-start  col-8 mx-2">
                  <div className="col-4">
                    <p className="fs-6 mb-2 text-soft-black">First Name</p>
                    <div className="d-flex align-items-center">
                      <Input
                        value={userData?.firstname}
                        register={register('firstname')}
                        name="firstname"
                        errors={errors}
                        type={'text'}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <p className="fs-6 mb-2 text-soft-black">Last Name</p>
                    <div className="d-flex align-items-center">
                      <Input
                        value={userData?.lastname}
                        register={register('lastname')}
                        name="lastname"
                        errors={errors}
                        type={'text'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 py-4 border-bottom border-secondary-subtle">
              <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                <h2 className="fw-bold fs-4  ">Contact information</h2>

                <div className="row d-flex justify-content-start  col-8 mx-2">
                  <div className="col-4">
                    <p className="fs-6 mb-2 text-soft-black">Email</p>
                    <div className="d-flex align-items-center">
                      <ReadOnlyInput
                        disabled={true}
                        type={'email'}
                        value={userData?.email}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <p className="fs-6 mb-2 text-soft-black">Phone number</p>
                    <div className="d-flex align-items-center">
                      <Input
                        register={register('phone')}
                        value={userData?.phone}
                        name="phone"
                        errors={errors}
                        type={'number'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 py-4 border-bottom border-secondary-subtle">
              <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                <h2 className="fw-bold fs-4  ">Business position/role</h2>

                <div className="row d-flex justify-content-start  col-8 mx-2">
                  <div className="col-4">
                    <p className="fs-6 mb-2 py-1 text-soft-black">
                      Business Position
                    </p>
                    <SelectInput
                      hookForm={false}
                      placeholder={userData?.position}
                      disabled={true}
                      name="position"
                    />
                  </div>

                  <div className="col-4">
                    <p className="fs-6 mb-2 text-soft-black">User Role</p>
                    <div className="d-flex align-items-center">
                      <ReadOnlyInput
                        disabled={true}
                        type={'text'}
                        value={userData?.role}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" d-flex justify-content-end col-lg-4 col-md-8 col">
              <SubmitButton content={'Update Profile'} />
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default Profile;