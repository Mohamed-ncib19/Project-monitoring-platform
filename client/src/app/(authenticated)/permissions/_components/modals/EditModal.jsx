import { Modal } from 'react-bootstrap';
import CoreButton from '@/components/buttons/CoreButton';
import WarningIcon from '../../../../../../public/icons/warning-icon';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { EditSchema } from '../../_schemas/permission.schema';
import CoreInput from '@/components/Inputs/CoreInput';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useNotifications } from 'reapop';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditModal = ({ show, handleClose, headerTitle, buttonLabel, user,setActiveTab }) => {
  const { notify } = useNotifications();
  const options = [
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Full-stack Developer', label: 'Full-stack Developer' },
    {
      value: 'Mobile Developer (ANDROID)',
      label: 'Mobile Developer (ANDROID)',
    },
    { value: 'Mobile Developer (IOS)', label: 'Mobile Developer (IOS)' },
    { value: 'IT Business Analyst', label: 'IT Business Analyst' },
    {
      value: 'Quality Assurance (QA) Engineer',
      label: 'Quality Assurance (QA) Engineer',
    },
    { value: 'IT Project Manager', label: 'IT Project Manager' },
    { value: 'Product Owner', label: 'Product Owner' },
    { value: 'Scrum Master', label: 'Scrum Master' },
    { value: 'Team Lead', label: 'Team Lead' },
  ];

  const rolesOptions = [
    { value: 'Manager', label: 'Manager' },
    { value: 'Team lead', label: 'Team lead' },
    { value: 'Team member', label: 'Team member' },
  ];

  const methods = useForm({
    resolver: yupResolver(EditSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = methods;

  const EditUser = async (username, data) => {
    try {
      const response = await axios.put(`/users/${username}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject({
        ok: false,
        status: 500,
        msg: 'internal server',
      });
    }
  };

  const {refresh} = useRouter();

  const handleEdit = handleSubmit(async (formData) => {

    try {
      const response = await EditUser(user?.username, formData);
      if (response.message === 'Account setted up successfuly') {
        notify({ message: 'Account updated successfuly', status: 'success' });
        handleClose();
        refresh();
      } else {
        notify({ message: 'Failed to setup user account', status: 'error' });
      }
    } catch (error) {
      notify({ message: 'server error', status: 'error' });
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
          <p className="alert-content">
            Alert: setting a user's role will adjust their access to information
            and actions
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            className="d-flex flex-column gap-4 py-5 "
            onSubmit={handleEdit}
          >
            <div className="d-flex flex-row justify-content-between align-items-center gap-4">
              <CoreInput
                name="firstname"
                placeholder="First name"
                errors={errors}
                control={control}
                register={register}
                defaultValue={user && user?.firstname}
              />

              <CoreInput
                name="lastname"
                placeholder="Last name"
                errors={errors}
                control={control}
                type="text"
                register={register}
                defaultValue={user && user?.lastname}
              />
            </div>

            <CoreInput
              name="phone"
              placeholder="Phone Number"
              errors={errors}
              control={control}
              type="number"
              register={register}
              defaultValue={user && user?.phone}
            />

            <CoreInput
              name="email"
              placeholder="Email"
              errors={errors}
              control={control}
              type="email"
              register={register}
              defaultValue={user && user?.email}
            />

            <div className="d-flex justify-content-between align-items-center gap-2 border-top border-bottom py-4">
              <div className="col-6">
                <p className="fs-6 mb-2 py-1 text-soft-black">
                  Business Position
                </p>
                <Controller
                name="businessPosition"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <div>
                        <Select
                          className={clsx(' ', {
                            'is-invalid  border-2 border-danger': !!errors.businessPosition,
                          })}
                          {...field}
                          options={options}
                          onChange={(option) =>
                            field.onChange(option ? option.value : '')
                          }
                         
                          value={
                            options.find((businessPosition) => businessPosition.value === field.value)
                          }
                          defaultValue={{value:user?.businessPosition , label: user?.businessPosition}}

                        />
                        {errors && errors.businessPosition && (
                          <span
                            className={clsx('fs-6', {
                              'text-danger': errors && errors.businessPosition,
                            })}
                          >
                            {errors.businessPosition.message}
                          </span>
                        )}
                      </div>
                    </>
                  );
                }}
              />
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
                  defaultValue={user && user?.salary}
                />
              </div>
            </div>

            <div>
              <p className="fs-6 mb-2 py-1 text-soft-black">Role</p>
              <Controller
                name="role"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <div>
                        <Select
                          className={clsx(' ', {
                            'is-invalid  border-2 border-danger': !!errors.role,
                          })}
                          {...field}
                          options={rolesOptions}
                          onChange={(option) =>
                            field.onChange(option ? option.value : '')
                          }
                         
                          value={
                            rolesOptions.find((role) => role.value === field.value)
                          }
                          defaultValue={{value:user?.role , label: user?.role}}

                        />
                        {errors && errors.role && (
                          <span
                            className={clsx('fs-6', {
                              'text-danger': errors && errors.role,
                            })}
                          >
                            {errors.role.message}
                          </span>
                        )}
                      </div>
                    </>
                  );
                }}
              />
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

export default EditModal;
