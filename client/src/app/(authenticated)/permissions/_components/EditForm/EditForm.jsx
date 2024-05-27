import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import CoreInput from '@/components/Inputs/CoreInput';
import { SelectInput } from '@/app/(authenticated)/_components/SelectInput';

export const EditForm = ({ user }) => {
  console.log(user);
  const Schema = Yup.object().shape({
    firstname: Yup.string(),
    lastname: Yup.string(),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid'),
    email: Yup.string().email('Invalid email address'),
    position: Yup.string(),
    salary: Yup.number()
      .typeError('Salary must be a number')
      .positive('Salary must be a positive number'),
    role: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      phone: user?.phone || '',
      email: user?.email || '',
      position: user?.position || '',
      salary: user?.salary || '',
      role: user?.role || '',
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setValue('firstname', user.firstname);
      setValue('lastname', user.lastname);
      setValue('phone', user.phone);
      setValue('email', user.email);
      setValue('position', user.position);
      setValue('salary', user.salary);
      setValue('role', user.role);
      setLoading(false);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const { firstname, lastname, bio, phone, email, position, salary, role } =
        data;
      const cleanData = {};

      if (firstname && firstname !== user.firstname)
        cleanData.firstname = firstname;
      if (lastname && lastname !== user.lastname) cleanData.lastname = lastname;
      if (bio && bio !== user.bio) cleanData.bio = bio;
      if (phone && phone !== user.phone) cleanData.phone = phone;
      if (email && email !== user.email) cleanData.email = email;
      if (position && position !== user.position) cleanData.position = position;
      if (salary && salary !== user.salary) cleanData.salary = salary;
      if (role && role !== user.role) cleanData.role = role;

      if (Object.keys(cleanData).length > 0) {
        console.log(cleanData);

        /*   const resUpdateUser = await UserRoute.editUserInfo(cleanData, user.username, session.token);

        if (resUpdateUser.ok) {
          Swal.fire({
            icon: "success",
            title: "Profile information updated successfully",
          });
        } else {
          const errorText = resUpdateUser.status === 404 ? "Resource not found" : "Server error";
          Swal.fire({
            icon: "error",
            title: "Failed to update",
            text: errorText,
          });
        } */
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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="d-flex flex-column gap-4 py-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="d-flex flex-row justify-content-between align-items-center gap-4">
            <CoreInput
              register={register('firstname')}
              name="firstname"
              placeholder="First name"
              errors={errors}
              type="text"
            />
            <CoreInput
              register={register('lastname')}
              name="lastname"
              placeholder="Last name"
              errors={errors}
              type="text"
            />
          </div>

          <div className="d-flex flex-row justify-content-center gap-4">
            <CoreInput
              register={register('phone')}
              name="phone"
              placeholder="Phone number"
              errors={errors}
              type="text"
            />
          </div>

          <div className="d-flex flex-row justify-content-center gap-4">
            <CoreInput
              register={register('email')}
              name="email"
              placeholder="Email address"
              errors={errors}
              type="email"
            />
          </div>

          <div className="d-flex justify-content-between border-top border-bottom py-4">
            <div className="">
              <p className="fs-6 mb-2 py-1 text-soft-black">
                Business Position
              </p>
              <SelectInput
                hookForm={true}
                register={register('position')}
                setValue={setValue}
                name="position"
                placeholder="Business Position"
                errors={errors}
                search={true}
                content={[
                  { text: 'Frontend Developer', value: 'frontDev' },
                  { text: 'Backend Developer', value: 'backDev' },
                  { text: 'Full-stack Developer', value: 'fullStackDev' },
                  { text: 'Mobile Developer (ANDROID)', value: 'mobileDevAND' },
                  { text: 'Mobile Developer (IOS)', value: 'mobileDevIOS' },
                  { text: 'IT Business Analyst', value: 'itBAnalyst' },
                  {
                    text: 'Quality Assurance (QA) Engineer',
                    value: 'qltAssuranceEng',
                  },
                  { text: 'IT Project Manager ', value: 'itProjectMng' },
                  { text: 'Product Owner', value: 'prodOwn' },
                  { text: 'Scrum Master', value: 'scrMstr' },
                  { text: 'Team Lead', value: 'TL' },
                ]}
              />
            </div>
            <div className="">
              <p className="fs-6 mb-2 text-soft-black">Salary</p>
              <CoreInput
                register={register('salary')}
                name="salary"
                placeholder="In TND"
                errors={errors}
                type="number"
              />
            </div>
          </div>

          <div className="">
            <p className="fs-6 mb-2 py-1 text-soft-black">Role</p>
            <SelectInput
              hookForm={true}
              register={register('role')}
              setValue={setValue}
              name="role"
              placeholder="Role"
              errors={errors}
              search={true}
              content={[
                { text: 'Manager', value: 'manager' },
                { text: 'Team Lead', value: 'TL' },
                { text: 'Team member', value: 'TM' },
              ]}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};