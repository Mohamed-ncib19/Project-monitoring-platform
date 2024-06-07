'use client';

import { ProductHeader } from '@/app/(authenticated)/_components/Product/ProductHeader';
import { ProductCard } from '@/app/(authenticated)/_components/Product/ProductCard';

import ProductNotFound from '@/../../public/SVG/Product-not-found.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotifications } from 'reapop';
import Image from 'next/image';
import { EditModal } from '@/app/(authenticated)/_components/Modals/EditModal';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import CoreInput from '@/components/Inputs/CoreInput';
import ComboBoxInput from '@/components/Inputs/ComboBoxInput';
import TextareaInput from '@/components/Inputs/Textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductSchema } from '@/app/(authenticated)/_shcemas/product.shcema';
import Select from 'react-select';
import { teamLeadsOptions } from '../_selectOptions/teamleads.options';
import { useRouter } from 'next/navigation';

const Products = () => {

  const [products,setProducts] = useState([]);

  const { notify } = useNotifications();

  const { refresh } = useRouter();

  const [portfolioOptions, setPortfolioOptions] = useState([]);

  const [currentProduct,setCurrentProduct] = useState(null);

const [showEditModal, setShowEditModal] = useState(false);

const [productName, setProductName] = useState('');
const [productCode, setProductCode] = useState('');


const handleShowEditModal = (product) => {
  setShowEditModal(true);
  setCurrentProduct(product)
};

const handleCloseEditModal = () => setShowEditModal(false);

const methods = useForm({
  resolver : yupResolver(ProductSchema),
});

const {handleSubmit , formState : {errors} , register , control,reset} = methods;


useEffect(() => {
  const fetchPortfoliosOptions = async () => {
    try {
      const response = await axios.get('/portfolios');
      const portfoliosOptions = response.data.portfolios.map(portfolio => ({
        value: portfolio._id,
        label: portfolio.name
      }));
      setPortfolioOptions(portfoliosOptions);
    } catch (error) {
      notify({ message: JSON.parse(error.request.response).message, status: 'warning' });
    }
  };
  fetchPortfoliosOptions();
}, []);


  const getPortfolioName = async (id) => {
    try {
      const response = await axios.get(`/portfolios/${id}`);
      return response.data.portfolio.name;
    } catch (error) {
      return null;
    }
  };

  
  
  const getAllProducts = async () => {
    try {
      const productsResponse = await axios.get('/products');
      const productsData = productsResponse.data.products;

      const transformedProducts = await Promise.all(
        productsData.map(async (product) => {
          const portfolioName = await getPortfolioName(product?.portfolio);
          return {
            ...product,
            portfolioName
          };
        })
      );
  
      return {
        ok: true,
        data: transformedProducts
      };
    } catch (error) {
      return {
        ok: false,
        message: JSON.parse(error?.request.response).message
      };
    }
  };


  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const response = await getAllProducts();
        if(response.ok){
          setProducts(response.data);
        }else{
          notify({message : response.message , status:'danger' });
        }
      } catch (error) {
        notify({message : error.message , status:'warning' });
      }
    }
      fetchData();
  },[])


  useEffect(() => {
    const generateProductCode = (name) => {
      const baseCode = name.toLowerCase().replace(/\s+/g, '-').substring(0, 5);
      const uniqueCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `${baseCode || 'prd'}${uniqueCode}`;
    };

    setProductCode(generateProductCode(productName));
  }, [productName]);

  useEffect(() => {
    if (currentProduct) {


      const startDate = currentProduct?.startDate.split('T')[0];
      const endDate = currentProduct?.endDate.split('T')[0];

      reset({
        portfolio:currentProduct?.portfolio,
        name: currentProduct?.name,
        code:currentProduct?.code,
        budget: currentProduct?.budget,
        currency : currentProduct?.currency,
        startDate : startDate,
        endDate : endDate,
        teamlead : currentProduct?.teamlead,
        description: currentProduct?.description,
      });

      setProductCode(currentProduct?.code);
    }
  }, [currentProduct, reset]);
  
  const EditProduct = async (id, data) => {
    try {
      const response = await axios.put(`/products/${id}`, data);
      if (response.status === 200) {
        return {
          ok: true,
          message: response.data.message
        };
      } else {
        return {
          ok: false,
          message: response.data.message
        };
      }
    } catch (error) {
      return {
        ok: false,
        message: JSON.parse(error?.request.response).message
      };
    }
  }
  

  const onSubmit = handleSubmit(async (data)=>{
    try {
      const response = await EditProduct(currentProduct?._id,data);
      if(response.ok){
        notify({message : response.message , status : 'success'});
        handleCloseEditModal();
        refresh();
      }else{
        notify({message : response.message , status : 'danger'});
      }
    } catch (error) {
      notify({message : 'Something went wrong!' , status : 'danger'});
    }
  })
  

  return (
    <>
      <ProductHeader color={'danger'} name={'Products'} />
      <div className="mx-5 ">
          <div className=" product-container row justify-content-start m-auto">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard dataProvider={product} supportBreadCumb={false} productsRootLayer={true} handleFunctions={{editModal : ()=>handleShowEditModal(product)}} productKey={product._id} />
              ))
            ) : (
              <div className=" d-flex flex-column justify-content-center align-items-center">
                <Image
                  priority
                  src={ProductNotFound}
                  alt="Product not found"
                  width={400}
                  draggable={false}
                />
                <p className=" text-dark-gray fw-bolder text-center fs-1">No Product  Found</p>
              </div>
            )}
          </div>
        </div>

        <EditModal show={showEditModal} handleClose={handleCloseEditModal} headerTitle='Edit Product' onSubmit={onSubmit} >
        <FormProvider {...methods}>
          <form className='d-flex flex-column gap-5 py-5' >

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center'>
              <label htmlFor="portfolio" className='text-muted'>Portfolio<span className='text-danger'>*</span></label>
              <div className='col-lg-7 col-12 z-index-999'>
                <Controller
                  name='portfolio'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={portfolioOptions}
                      onChange={(option) => field.onChange(option ? option.value : '')}
                      onBlur={field.onBlur}
                      value={portfolioOptions.find((option) => option.value === field.value) || ''}
                    />
                  )}
                />
                {errors.portfolio && <span className="text-danger">{errors.portfolio.message}</span>}
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center'>
              <label htmlFor="name" className='text-muted'>Product name<span className='text-danger'>*</span></label>
              <div className="col-lg-7 col-12">
                <CoreInput
                  name="name"
                  placeholder="Required"
                  register={register}
                  errors={errors}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center">
              <label htmlFor="prodcode" className="text-danger">Product Code</label>
              <div className="col-lg-7 col-12">
                <CoreInput
                  name="code"
                  placeholder="prd001"
                  readOnly={true}
                  value={productCode}
                />
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center'>
              <label htmlFor="budget" className='text-muted'>Budget</label>
              <div className='col-lg-7 col-12'>
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
                <span className='bg-soft-gray d-flex align-self-center px-2 py-3 text-center'>to</span>
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

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center'>
              <label htmlFor="teamlead" className='text-muted'>Team lead</label>
              <div className='col-lg-7 col-12 z-index-999'>
                <Controller
                  name='teamlead'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={teamLeadsOptions}
                      onChange={(option) => field.onChange(option ? option.value : '')}
                      onBlur={field.onBlur}
                      value={teamLeadsOptions.find((option) => option.value === field.value) || ''}
                    />
                  )}
                />
                {errors.teamlead && <span className="text-danger">{errors.teamlead.message}</span>}
              </div>
            </div>

            <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center'>
              <label htmlFor="description" className='text-muted'>Description</label>
              <div className='col-lg-7 col-12'>
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
    </>
  );
};

export default Products;
