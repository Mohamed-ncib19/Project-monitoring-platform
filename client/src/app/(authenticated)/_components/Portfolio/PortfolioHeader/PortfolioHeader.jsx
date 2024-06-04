import { useState } from 'react';
import Select from 'react-select';

import CoreButton from '@/components/buttons/CoreButton';
import { AddModal } from '@/app/(authenticated)/_components/Modals/AddModal/';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import CoreInput from '@/components/Inputs/CoreInput';
import { yupResolver } from '@hookform/resolvers/yup';
import TextareaInput from '@/components/Inputs/Textarea';
import { PortfolioShcema } from '@/app/(authenticated)/_shcemas/portfolio.shcema';
import axios from 'axios';
import { useNotifications } from 'reapop';
import { useRouter } from 'next/navigation';

export const PortfolioHeader = ({ color, name }) => {

  const { notify } = useNotifications();
  const { refresh } = useRouter();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fakeManagers = [
    {value: 'manager1', label: 'manager1'},
    {value: 'manager2', label: 'manager2'},
  ];



  const methods = useForm({
    resolver: yupResolver(PortfolioShcema),
  });




  const { handleSubmit,
          formState: { errors },
          register,
          control
        } = methods;


        const addPortfolio = async (data) =>{
          try {
            const response = await axios.post('/portfolios',data);
            if(response.status === 201){
              return {ok:true, message: response.data.message};
            }else{
              return {ok:false, message: response.data.message};
            }
          } catch (error) {
            return {ok:false, message: JSON.parse(error.request.response).message};
          }
        }


        const onSubmit = handleSubmit(async (data) => {
          try {
            console.log(data)
           /*  const res = await addPortfolio(data);
            if (res.ok) {
              notify({ message: res.message, status: 'success' });
              handleClose();
              refresh();
            } else {
              notify({ message: res.message, status: 'danger' });
            } */
          } catch (error) {
            console.log(error)
            notify({ message: 'Server error', status: 'danger' });
          }
        });

  return (
    <div
      className={`bg-light flex-md-row flex-column p-3 px-5 m-3 border-4 border-start border-${color} d-flex justify-content-md-between justify-content-center `}
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

      <AddModal show={show} handleClose={handleClose} headerTitle='Create Portfolio' onSubmit={onSubmit} >
      <FormProvider {...methods}>
          <form className='d-flex flex-column gap-5 py-5' >

            <div className='d-flex flex-lg-row flex-column justify-content-start col-10 gap-5 align-items-center m-auto ' >
              <label htmlFor="name" className=' text-muted' >Name<span className='text-danger' >*</span></label>
              <div className='col-lg-7 col-12' >
              <CoreInput
              name='name'
              placeholder='Required'
              register={register}
              errors={errors}
              />
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-start col-10 gap-4 align-items-center m-auto ' >
              <label htmlFor="manager" className='text-muted' >Manager</label>
              <div className='col-lg-7 col-12' >
              <Controller
      name='manager'
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          isClearable
          isMulti
          options={fakeManagers}
          onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])}
          onBlur={field.onBlur}
          value={fakeManagers.filter(option => field.value?.includes(option.value))}
        />
      )}
    />
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-start col-10 gap-2 align-items-center m-auto ' >
              <label htmlFor="description" className='text-muted' >Description</label>
              <div className='col-lg-7 col-12' >
              <TextareaInput
              name='description'
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