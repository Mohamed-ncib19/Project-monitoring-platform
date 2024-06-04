'use client';
import { useEffect, useState } from 'react';
import PortfolioNotFound from '@/../../public/SVG/Portfolio-not-found.svg';
import { PortfolioHeader } from '@/app/(authenticated)/_components/Portfolio/PortfolioHeader';
import axios from 'axios';
import { useNotifications } from 'reapop';
import { EditModal } from '@/app/(authenticated)/_components/Modals/EditModal/';
import { FormProvider, useForm } from 'react-hook-form';
import CoreInput from '@/components/Inputs/CoreInput';
import TextareaInput from '@/components/Inputs/Textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import { PortfolioShcema } from '../_shcemas/portfolio.shcema';
import { ConfirmModal } from '../_components/Modals/ConfirmModal';
import { PortfolioCard } from '../_components/Portfolio/PortfolioCard';
import Image from 'next/image';
import { AlertModal } from '../_components/Modals/AlertModal';

const Portfolio = () => {

  const { notify } = useNotifications();
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAlertModal , setShowAlertModal] = useState(false);

  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [portfolios, setPortfolios] = useState([]);

  const methods = useForm({
    resolver: yupResolver(PortfolioShcema),
  });
  
  const { handleSubmit, formState: { errors }, register,reset } = methods;

  useEffect(() => {
    if (currentPortfolio) {
      reset({
        name: currentPortfolio.name,
        description: currentPortfolio.description,
      });
    }
  }, [currentPortfolio, reset]);
  
  


  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get('/portfolios');
        setPortfolios(response.data.portfolios);
      } catch (error) {
        notify({ message: JSON.parse(error.request.response).message, status: 'warning' });
      }
    };
    fetchPortfolios();
  }, []);


  

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const handleEditModalShow = (portfolio) => {
    setCurrentPortfolio(portfolio);
    setShowEditModal(true);
  };

  const handleDeleteModalShow = (portfolio) => {
    setCurrentPortfolio(portfolio);
    setShowDeleteModal(true);
  };

  const handleAlertModalShow = ()=>{
    setShowAlertModal(true);
  }

  const handleDelete = (portfolio) => portfolio.description ? handleAlertModalShow() : handleDeleteModalShow(portfolio);

  return (
    <>
      <div>
        <PortfolioHeader color={'success'} name={'Portfolio'} />
        <div className="mx-5">
          <div className="portfolio-container row justify-content-start align-items-center">
          
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  dataProvider={portfolio}
                  handleFunctions={{
                    editModal: () => handleEditModalShow(portfolio),
                    deleteModal: () => handleDelete(portfolio),
                  }}
                />
              ))
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-5">
                <Image priority src={PortfolioNotFound} alt="Portfolio Not Found" />
                <p className="text-dark-gray fw-bolder text-center fs-1">No portfolio Found</p>
              </div>
            )}
          
          </div>
        </div>
      </div>

      <EditModal show={showEditModal} handleClose={() => setShowEditModal(false)} headerTitle="Edit Portfolio" onSubmit={onSubmit}>
        <FormProvider {...methods}>
          <form className="d-flex flex-column gap-5 py-5">
            <div className="d-flex flex-lg-row flex-column justify-content-start col-10 gap-5 align-items-center m-auto">
              <label htmlFor="name" className="text-muted">Name<span className="text-danger">*</span></label>
              <div className="col-lg-7 col-12">
                <CoreInput
                  name="name"
                  placeholder="Required"
                  register={register}
                  errors={errors}
                  defaultValue={currentPortfolio?.name}
                />
              </div>
            </div>


            <div className="d-flex flex-lg-row flex-column justify-content-start col-10 gap-2 align-items-center m-auto">
              <label htmlFor="description" className="text-muted">Description</label>
              <div className="col-lg-7 col-12">
                <TextareaInput
                  name="description"
                  register={register}
                  errors={errors}
                  defaultValue={currentPortfolio?.description}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </EditModal>

      <ConfirmModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} headerTitle="Delete Portfolio" handleClick={() => console.log('deleted')}>
        <p className='text-muted' >This portfolio is empty. Are you sure you want to delete it?</p>
      </ConfirmModal>

      <AlertModal show={showAlertModal} handleClose={()=>setShowAlertModal(false)} headerTitle='Portfolio Not Empty' >
        <p className='text-muted' >The portfolio cannot be deleted because it currently contains <b>products</b>. To delete the portfolio, you'll need to remove all associated products first.</p>
      </AlertModal>

    </>
  );
};

export default Portfolio;
