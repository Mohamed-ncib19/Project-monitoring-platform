import React, { useEffect } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CoreInput from '@/components/Inputs/CoreInput';
import { SelectInput } from '@/app/(authenticated)/_components/SelectInput';
import { SetupSchema } from '../../_schemas/permission.schema';

export const EditForm = ({ user, handleSubmitForm, setSubmitCallback }) => {
  const methods = useForm({
    resolver: yupResolver(SetupSchema),
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      phone: user?.phone || '',
      email: user?.email || '',
      businessPosition: user?.businessPosition || '',
      salary: user?.salary || '',
      role: user?.role || '',
    },
  });

  const { control, handleSubmit, formState: { errors } } = methods;

  const onSubmitFormData = async (data) => {
    try {
      if (handleSubmitForm) {
        await handleSubmitForm({username:user.username,data:data});
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  useEffect(() => {
    if (setSubmitCallback) {
      setSubmitCallback(() => handleSubmit(onSubmitFormData));
    }
  }, [setSubmitCallback, handleSubmit]);

  return (
    <FormProvider {...methods}>
      <form className="d-flex flex-column gap-4 py-5" onSubmit={handleSubmit(onSubmitFormData)}>
        <div className="d-flex flex-row justify-content-between align-items-center gap-4">
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <CoreInput
                field={field}
                placeholder="First name"
                errors={errors}
                name="firstname"
                type="text"
              />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <CoreInput
                field={field}
                placeholder="Last name"
                errors={errors}
                name="lastname"
                type="text"
              />
            )}
          />
        </div>

        <div className="d-flex flex-row justify-content-center gap-4">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <CoreInput
                field={field}
                placeholder="Phone number"
                errors={errors}
                name="phone"
                type="text"
              />
            )}
          />
        </div>

        <div className="d-flex flex-row justify-content-center gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CoreInput
                field={field}
                placeholder="Email"
                errors={errors}
                name="email"
                type="text"
              />
            )}
          />
        </div>

        <div className="d-flex justify-content-between border-top border-bottom py-4">
          <div>
            <p className="fs-6 mb-2 py-1 text-soft-black">Business Position</p>
            <Controller
              name="businessPosition"
              control={control}
              defaultValue={user?.businessPosition}
              render={({ field }) => (
                <SelectInput
                  field={field}
                  placeholder="Business Position"
                  errors={errors}
                  search={true}
                  defaultValue={user?.businessPosition}
                  content={[
                    { text: 'Frontend Developer', value: 'frontDev' },
                    { text: 'Backend Developer', value: 'backDev' },
                    { text: 'Full-stack Developer', value: 'fullStackDev' },
                    { text: 'Mobile Developer (ANDROID)', value: 'mobileDevAND' },
                    { text: 'Mobile Developer (IOS)', value: 'mobileDevIOS' },
                    { text: 'IT Business Analyst', value: 'itBAnalyst' },
                    { text: 'Quality Assurance (QA) Engineer', value: 'qltAssuranceEng' },
                    { text: 'IT Project Manager', value: 'itProjectMng' },
                    { text: 'Product Owner', value: 'prodOwn' },
                    { text: 'Scrum Master', value: 'scrMstr' },
                    { text: 'Team Lead', value: 'TL' },
                  ]}
                />
              )}
            />
          </div>
          <div>
            <p className="fs-6 mb-2 text-soft-black">Salary</p>
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <CoreInput
                  field={field}
                  placeholder="Salary"
                  errors={errors}
                  name="salary"
                  type="number"
                />
              )}
            />
          </div>
        </div>

        <div>
          <p className="fs-6 mb-2 py-1 text-soft-black">Role</p>
          <Controller
            name="role"
            control={control}
            defaultValue={user?.role}
            render={({ field }) => (
              <SelectInput
                field={field}
                placeholder="Role"
                errors={errors}
                defaultValue={user?.role}
                search={true}
                content={[
                  { text: 'Manager', value: 'Manager' },
                  { text: 'Team Lead', value: 'Team lead' },
                  { text: 'Team member', value: 'Team member' },
                ]}
              />
            )}
          />
        </div>
      </form>
    </FormProvider>
  );
};import { Modal } from 'react-bootstrap';

import CoreButton from '@/components/buttons/CoreButton';
import WarningIcon from '../../../../../../public/icons/warning-icon';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import Link from 'next/link';
import ViewIcon from '../../../../../../public/icons/ViewIcon';

const EditModal = ({
  show,
  handleClose,
  headerTitle,
  children,
  buttonLabel,
  user,
  handleSubmit
}) => {
  return (
<>
    <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName="full-height-modal my-modal"
        contentClassName="full-height-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>{headerTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3">
                <Avatar
                  name={(user?.firstname + ' ' + user?.lastname) || 'user name'}
                  background="primary"
                  rounded="1"
                  textColor="white"
                />
                <div>
                  <p>{(user?.firstname + ' ' + user?.lastname) || 'fullname'}</p>
                  <p>{user?.businessPosition || 'position'}</p>
                </div>
              </div>
              <Link href={`/profile/${user?.username}`}>view profile <ViewIcon /> </Link>
            </div>
        


       {   <div className="modal-alert text-white d-flex justify-content-center align-items-center p-2 gap-2 rounded-5 mt-4">
            <i className="fs-4">
              <WarningIcon />
            </i>
            <p className="alert-content">
              Alert: setting a user's role will adjust their access to
              information and actions
            </p>
          </div>}

          {children}
        </Modal.Body>
        <Modal.Footer>
          <div className="col-12 d-flex justify-content-end">
            <CoreButton type="submit" label={buttonLabel} onclick={handleSubmit} />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditModal;