import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CoreButton from '@/components/buttons/CoreButton';
import { AddModal } from '@/app/(authenticated)/_components/Modals/AddModal/';
import CoreInput from '@/components/Inputs/CoreInput';
import TextareaInput from '@/components/Inputs/Textarea';
import ComboBoxInput from '@/components/Inputs/ComboBoxInput';
import Select from 'react-select';
import axios from 'axios';
import { useNotifications } from 'reapop';
import { ProductSchema } from '@/app/(authenticated)/_shcemas/product.shcema';
import { useRouter } from 'next/navigation';


export const ProductHeader = ({ color, name, productRootLayer = true ,defaultPortfolio }) => {
  
  const { notify } = useNotifications();
  
  const {refresh} = useRouter();

  const [portfoliosOptions, setPortfolios] = useState([]);
  const [teamleadsOptions , setTeamleadsOptions] = useState([]);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');





  const [show, setShow] = useState(false);
  
  const methods = useForm({
    resolver: yupResolver(ProductSchema),
  });

  const { handleSubmit, formState: { errors }, register, control,reset } = methods;

  useEffect(() => {
    if (!productRootLayer && defaultPortfolio) {
      reset({
        portfolio: defaultPortfolio
      });
    }
  }, [reset, defaultPortfolio]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchPortfoliosOptions = async () => {
      try {
        const response = await axios.get('/portfolios');
        const portfoliosOptions = response.data.portfolios.map(portfolio => ({
          value: portfolio._id,
          label: portfolio.name
        }));
        setPortfolios(portfoliosOptions);
      } catch (error) {
        notify({ message: JSON.parse(error.request.response).message, status: 'warning' });
      }
    };
    fetchPortfoliosOptions();
  }, []);

  useEffect(()=>{

    const getTeamLeadsOptions = async () =>{
      try {
        const response = await axios.get('/users/roles/teamlead');
        console.log(response);
        const formatedTeamLeads = response.data.users.map(user => ({
          value: user?._id,
          label: `${user?.firstname}  ${user?.lastname}`
          }));
          setTeamleadsOptions(formatedTeamLeads)
      } catch (error) {
        notify({message : JSON.parse(error?.request?.response).message,status : 'warning'})
      }
    }

    getTeamLeadsOptions();
  },[]);

  useEffect(() => {
    const generateProductCode = (name) => {
      const baseCode = name.toLowerCase().replace(/\s+/g, '-').substring(0, 5);
      const uniqueCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${baseCode || 'prd'}${uniqueCode}`;
    };

    setProductCode(generateProductCode(productName));
  }, [productName]);

const CreateProduct = async (data) =>{
  try {
    const response = await axios.post(`/products`,data);
    if(response.status === 201){
      return Promise.resolve({
        ok:true,
        message:response.data.message,
      })
    }else{
      return Promise.reject({
        ok:false,
        message:response.data.message,
      })
    }
  } catch (error) {
    return Promise.reject({
      ok:false,
      message:JSON.parse(error?.request.response).message,
    })
  }
}

const onSubmit = handleSubmit(async (formData) => {
  try {
    let startDate = new Date(formData.startDate);
    startDate.setDate(startDate.getDate() + 1);

    let endDate = new Date(formData.endDate);
    endDate.setDate(endDate.getDate() + 1);

    if (formData.startDate) {
      formData.startDate = startDate;
    }

    if (formData.endDate) {
      formData.endDate = endDate;
    }
      const productData = {...formData , code : productCode};
      const response = await CreateProduct(productData);
      if(response.ok){
        notify({message : response.message,status:'success'});
        handleClose();
        window.location.reload();
      }else{
        notify({message : response.message,status:'danger'});
      }
    } catch (error) {
      console.log(error)
      notify({message : error?.message , status:'danger'});
    }
  }
);

  return (
    <>
      <div className={`bg-light flex-md-row flex-column p-3 px-5 m-3 border-4 border-start border-${color} d-flex justify-content-md-between justify-content-center `}>
        <div className="text-center text-md-start mb-3 mb-md-0">
          <p className="fw-bolder fs-4">{name}</p>
          <p className="text-secondary fs-6">Hi, welcome to client {name} management</p>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center col-md-4">
          <CoreButton type="button" label={`Add ${name}`} onClick={handleShow} />
        </div>
      </div>

      <AddModal show={show} handleClose={handleClose} headerTitle='Create Product' onSubmit={onSubmit}>
        <FormProvider {...methods}>
          <form className='d-flex flex-column gap-5 py-5' onSubmit={handleSubmit(onSubmit)} >

          <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
              <label htmlFor="portfolio" className='text-muted'>Portfolio<span className='text-danger'>*</span></label>
              <div className='col-lg-8 col-12 z-index-999'>
                <Controller
                  name='portfolio'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className='custom-select-container'
                      classNamePrefix='custom-select'
                      options={portfoliosOptions}
                      isDisabled={!productRootLayer && true}
                      onChange={(option) => field.onChange(option ? option.value : '')}
                      onBlur={field.onBlur}
                      value={portfoliosOptions.find((option) => option.value === field.value) || ''}
                    
                    />
                  )}
                />
                {errors.portfolio && <span className="text-danger">{errors.portfolio.message}</span>}
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
              <label htmlFor="name" className='text-muted'>Product name<span className='text-danger'>*</span></label>
              <div className="col-lg-8 col-12 mx-4">
                <CoreInput
                  name="name"
                  placeholder="Required"
                  register={register}
                  errors={errors}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
              <label htmlFor="prodcode" className="text-danger">Product Code</label>
              <div className="col-lg-8 col-12 mx-3">
                <CoreInput
                  name="code"
                  placeholder="prd001"
                  readOnly={true}
                  value={productCode}
                />
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
              <label htmlFor="budget" className='text-muted'>Budget</label>
              <div className='col-lg-8 col-12 px-2'>
                <ComboBoxInput
                  name='budget'
                  placeholder='Budget'
                  type='number'
                  register={register}
                  errors={errors}
                  options={[
                    { label: 'TND', value: 'TND' },
                    { label: 'EUR', value: 'EUR' },
                    { label: 'USD', value: 'USD' }
                  ]}
                />
                {errors.budget && <span className="text-danger">{errors.budget.message}</span>}
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-7 col-12 align-items-center'>
              <label htmlFor="date" className='text-muted'>Duration<span className='text-danger'>*</span></label>
              <div className='d-flex flex-lg-row flex-column col-lg-6 col-12'>
                <div className='col-lg-10 col-12'>
                  <CoreInput
                    name='startDate'
                    placeholder='Start date'
                    type='date'
                    register={register}
                    errors={errors}
                  />
                </div>
                <span className='bg-soft-gray d-flex align-self-start px-2 py-3 text-center'>to</span>
                <div className='col-lg-10 col-12'>
                  <CoreInput
                    name='endDate'
                    placeholder='End date'
                    type='date'
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
              <label htmlFor="teamlead" className='text-muted'>Team lead</label>
              <div className='col-lg-8 col-12 z-index-999'>
                <Controller
                  name='teamlead'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className='custom-select-container'
                      classNamePrefix='custom-select'
                      options={teamleadsOptions}
                      onChange={(option) => field.onChange(option ? option.value : '')}
                      onBlur={field.onBlur}
                      value={teamleadsOptions.find((option) => option.value === field.value) || ''}
                    />
                  )}
                />
                {errors.teamlead && <span className="text-danger">{errors.teamlead.message}</span>}
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
              <label htmlFor="description" className='text-muted'>Description</label>
              <div className='col-lg-8 col-12'>
                <TextareaInput
                  name='description'
                  placeholder='Describe The Product , Technologies , Core Features ....'
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

          </form>
        </FormProvider>
      </AddModal>
    </>
  );
};
