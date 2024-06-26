import { useState } from 'react';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useNotifications } from 'reapop';

import { AddModal } from '@/app/(authenticated)/_components/Modals/AddModal/';
import { PortfolioShcema } from '@/app/(authenticated)/_shcemas/portfolio.shcema';
import CoreButton from '@/components/buttons/CoreButton';
import CoreInput from '@/components/Inputs/CoreInput';
import TextareaInput from '@/components/Inputs/Textarea';
import { yupResolver } from '@hookform/resolvers/yup';

export const PortfolioHeader = ({
  color,
  name,
  handleRefresh,
  setHandleRefresh,
}) => {
  const { notify } = useNotifications();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const methods = useForm({
    resolver: yupResolver(PortfolioShcema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = methods;

  const addPortfolio = async (data) => {
    try {
      const response = await axios.post('/portfolios', data);
      if (response.status === 201) {
        return { ok: true, message: response.data.message };
      } else {
        return { ok: false, message: response.data.message };
      }
    } catch (error) {
      return { ok: false, message: JSON.parse(error.request.response).message };
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await addPortfolio(data);
      if (res.ok) {
        notify({ message: res.message, status: 'success' });
        handleClose();
        setHandleRefresh(!handleRefresh);
      } else {
        notify({ message: res.message, status: 'danger' });
      }
    } catch (error) {
      notify({ message: 'Server error', status: 'danger' });
    }
  });

  return (
    <div
      className={`bg-light flex-md-row flex-column p-2 px-5 m-3 border-4 border-start border-${color} d-flex justify-content-md-between justify-content-center `}
    >
      <div className="text-center text-md-start mb-3 mb-md-0">
        <p className="fw-bolder fs-4">{name}</p>
        <p className="text-secondary fs-6">
          Hi, welcome to client {name} management
        </p>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center col-md-4">
        <CoreButton type="button" label={`Add ${name}`} onClick={handleShow} />
      </div>

      <AddModal
        show={show}
        handleClose={handleClose}
        headerTitle="Create Portfolio"
        onSubmit={onSubmit}
      >
        <FormProvider {...methods}>
          <form className="d-flex flex-column gap-5 py-5">
            <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center">
              <label htmlFor="name" className=" text-muted">
                Name<span className="text-danger">*</span>
              </label>
              <div className="col-lg-8 col-12">
                <CoreInput
                  name="name"
                  placeholder="Required"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center">
              <label htmlFor="description" className="text-muted">
                Description
              </label>
              <div className="col-lg-8 col-12">
                <TextareaInput
                  name="description"
                  placeholder="Describe yout Client`s Portfolio..."
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </AddModal>
    </div>
  );
};
