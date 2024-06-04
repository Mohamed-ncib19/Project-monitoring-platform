'use client';
import { useEffect, useState } from 'react';
import PortfolioNotFound from '@/../../public/SVG/Portfolio-not-found.svg';
import { PortfolioHeader } from '@/app/(authenticated)/_components/Portfolio/PortfolioHeader';
import axios from 'axios';
import { useNotifications } from 'reapop';
import { EditModal } from '@/app/(authenticated)/_components/Modals/EditModal/';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import CoreInput from '@/components/Inputs/CoreInput';
import TextareaInput from '@/components/Inputs/Textarea';

import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { PortfolioShcema } from '../_shcemas/portfolio.shcema';
import { ConfirmModal } from '../_components/Modals/ConfirmModal';
import { PortfolioCard } from './_components/PortfolioCard';
import Image from 'next/image';

const Portfolio = () => {

  const fakeManagers = [
    {value: 'manager1', label: 'manager1'},
    {value: 'manager2', label: 'manager2'},];



const { notify } = useNotifications();
 
const [show,setShow] = useState(false);
const handleClose = ()=> setShow(false);
const handleShow = ()=> setShow(true);

const [showDelete,setShowDelete] = useState(false);
const handleCloseDelete = ()=> setShowDelete(false);
const handleShowDelete = ()=> setShowDelete(true);

const methods = useForm({
  resolver : yupResolver(PortfolioShcema),
});

const {
  handleSubmit,
  formState : {errors},
  register,
  control
} = methods;

   const [portfolios, setPortfolios] = useState([]);
 
   const getPortfolios = async () => {
     try {
       const response = await axios.get('/portfolios');
       setPortfolios(response.data.portfolios);
     } catch (error) {
       notify({message : JSON.parse(error.request.response).message , status : 'warning'});
     }
   };
 
   useEffect(() => {
 
     const fetchPortfolios = async () => {
       
         await getPortfolios();
       
     };
 
     fetchPortfolios();
  }, []);



  const onSubmit = handleSubmit(async (data) =>{
    console.log(data);
  })


  return (
    <>
      <div>
          <PortfolioHeader color={'success'} name={'Portfolio'} />

        <div className="mx-5 ">
          <div className=" portfolio-container row justify-content-start m-auto">
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
               <PortfolioCard dataProvider={portfolio} handleFunctions={[
                {editModal : handleShow},
                {deleteModal : handleShowDelete}
               ]} />
              ))
            ) : (
              <div className=" d-flex flex-column justify-content-center align-items-center gap-3 mt-5">
                <Image
                  priority
                  src={PortfolioNotFound}
                  alt='Portfolio Not Found'
                />
                <p className=" text-dark-gray fw-bolder text-center fs-1">No portfolio  Found</p>
              </div>
            )}
          </div>
        </div>
      </div>

        
      <EditModal show={show} handleClose={handleClose} headerTitle='Edit Portfolio' onSubmit={onSubmit} >
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
                    options={fakeManagers}
                    onChange={(option) => field.onChange(option ? option.value : '')}
                    onBlur={field.onBlur}
                    value={fakeManagers.find((option) => option.value === field.value) || ''}
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
      </EditModal>

        
<ConfirmModal show={showDelete} handleClose={handleCloseDelete} headerTitle='Delete portfolio' handleClick={()=>console.log('deleted')} >
  <p>This portfolio is empty. Are you sure you want to delete it ?</p>
</ConfirmModal>
    </>
  );
};

export default Portfolio;
