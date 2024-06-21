import { useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Modal } from 'react-bootstrap';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useNotifications } from 'reapop';

import WarningIcon from '@/../../public/icons/warning-icon';
import { PositionOptions } from '@/app/(authenticated)/_selectOptions/positions.options';
import { RolesOptions } from '@/app/(authenticated)/_selectOptions/role.options';
import { EditSchema } from '@/app/(authenticated)/permissions/_schemas/permission.schema';
import CoreButton from '@/components/buttons/CoreButton';
import CoreInput from '@/components/Inputs/CoreInput';
import { yupResolver } from '@hookform/resolvers/yup';

export const EditModal = ({
  show,
  handleClose,
  headerTitle,
  buttonLabel,
  user,
  setActiveTab,
}) => {
  const { notify } = useNotifications();

  const methods = useForm({
    resolver: yupResolver(EditSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = methods;

  const EditUser = async (id, data) => {
    try {
      const response = await axios.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: JSON.parse(error?.request.response).message,
      });
    }
  };

  const checkChanges = (data) => {
    return Object.keys(data).every((key) => data[key] === user[key]);
  };

  useEffect(() => {
    if (user) {
      reset({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        phone: user.phone || '',
        email: user.email || '',
        salary: user.salary || '',
        businessPosition: user.businessPosition || '',
        role: user?.role || '',
      });
    }
  }, [user, reset, RolesOptions]);

  const handleEdit = handleSubmit(async (formData) => {
    try {
      if (checkChanges(formData)) {
        notify({ message: 'There are no Modifications', status: 'warning' });
        handleClose();
      } else {
        const response = await EditUser(user?._id, formData);
        if (response.message === 'Account setted up successfuly') {
          notify({ message: response.message, status: 'success' });
          handleClose();
          setActiveTab('requests');
        } else {
          notify({ message: response.message, status: 'danger' });
        }
      }
    } catch (error) {
      notify({ message: error.msg, status: 'danger' });
    }
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      dialogClassName="full-height-modal my-modal"
      contentClassName="full-height-modal-content"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-alert text-white d-flex justify-content-center align-items-center p-2 gap-2 rounded-5 mt-4">
          <i className="fs-4">
            <WarningIcon />
          </i>
          <p className="alert-content m-0">
            Alert: setting a user's role will adjust their access to information
            and actions
          </p>
        </div>

        <FormProvider {...methods}>
          <form className="d-flex flex-column gap-4 py-5" onSubmit={handleEdit}>
            <div className="d-flex flex-row justify-content-between align-items-center gap-4">
              <CoreInput
                name="firstname"
                placeholder="First name"
                errors={errors}
                control={control}
                register={register}
              />

              <CoreInput
                name="lastname"
                placeholder="Last name"
                errors={errors}
                control={control}
                type="text"
                register={register}
              />
            </div>

            <CoreInput
              name="phone"
              placeholder="Phone Number"
              errors={errors}
              control={control}
              type="number"
              register={register}
            />

            <CoreInput
              name="email"
              placeholder="Email"
              errors={errors}
              control={control}
              type="email"
              register={register}
            />

            <div className="d-flex justify-content-between align-items-center gap-2 border-top border-bottom py-4">
              <div className="col-6">
                <p className="fs-6 mb-2 py-1 text-soft-black">
                  Business Position
                </p>
                <Controller
                  name="businessPosition"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      className={clsx(' ', {
                        'is-invalid border-2 border-danger':
                          !!errors.businessPosition,
                      })}
                      options={PositionOptions}
                      onChange={(option) =>
                        field.onChange(option ? option.value : '')
                      }
                      value={PositionOptions.find(
                        (businessPosition) =>
                          businessPosition.value === field.value,
                      )}
                    />
                  )}
                />
                {errors.businessPosition && (
                  <span className={clsx('fs-6 text-danger')}>
                    {errors.businessPosition.message}
                  </span>
                )}
              </div>
              <div>
                <p className="fs-6 mb-2 text-soft-black">Salary</p>
                <CoreInput
                  name="salary"
                  placeholder="Salary"
                  errors={errors}
                  control={control}
                  type="number"
                  register={register}
                />
              </div>
            </div>

            <div>
              <p className="fs-6 mb-2 py-1 text-soft-black">Role</p>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    className={clsx(' ', {
                      'is-invalid border-2 border-danger': errors.role,
                    })}
                    {...field}
                    options={RolesOptions}
                    onChange={(option) =>
                      field.onChange(option ? option.value : '')
                    }
                    value={
                      RolesOptions.find(
                        (role) => role.value === field.value,
                      ) || {
                        value: 'manager',
                        label: 'Manager',
                      }
                    }
                  />
                )}
              />
              {errors.role && (
                <span className={clsx('fs-6 text-danger')}>
                  {errors.role.message}
                </span>
              )}
            </div>
          </form>
        </FormProvider>
      </Modal.Body>

      <Modal.Footer>
        <div className="col-12 d-flex justify-content-end">
          <CoreButton type="submit" label={buttonLabel} onClick={handleEdit} />
        </div>
      </Modal.Footer>
    </Modal>
  );
};
