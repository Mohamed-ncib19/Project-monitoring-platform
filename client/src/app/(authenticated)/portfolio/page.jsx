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
import { useBreadCumb } from '../_context/BreadcrumbsContext';
import { useAuth } from '@/app/(authenticated)/_context/AuthContext';
import { useRouter } from 'next/navigation';
const Portfolio = () => {

  const { notify } = useNotifications();

  const { show,setShow } = useBreadCumb();

  const { push } = useRouter();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAlertModal , setShowAlertModal] = useState(false);

  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [portfolios, setPortfolios] = useState([]);

  const [handleRefresh,setHandleRefresh] = useState(false);

  const { hasPermission } = useAuth();


 

  const methods = useForm({
    resolver: yupResolver(PortfolioShcema),
  });
  
  const { handleSubmit, formState: { errors }, register,reset } = methods;

  useEffect(() => {
    if (currentPortfolio) {

      console.log(currentPortfolio);


      reset({
        name: currentPortfolio?.name,
        description: currentPortfolio?.description || '',
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
  }, [handleRefresh]);


  const checkChanges = async (Edited, Saved) => {
    try {
      const changedFields = {};
      const editedKeys = Object.keys(Edited);
  
      for (const key of editedKeys) {
        if (Edited[key] !== Saved[key]) {
          changedFields[key] = Edited[key];
        }
      }
  
      return { ok: Object.keys(changedFields).length > 0, changedFields }; 
    } catch (error) {
      console.error(error);
      return { ok: false, changedFields: {} };
    }
  };
  
  const EditPortfolio = async (currentPortfolio, data) => {
    try {
      const { ok, changedFields } = await checkChanges(data, currentPortfolio);
      if (!ok) {
        return {
          ok: false,
          message: 'No changes'
        }; 
      } else {

        const response = await axios.put(`/portfolios/${currentPortfolio?._id}`, changedFields);
        return {
          ok: response.status === 200,
          message: response.data.message
        };
      }
    } catch (error){
      console.error(error);
      return {
        ok: false,
        message: JSON.parse(error?.request.response).message
      };
    }
  };
  
  

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await EditPortfolio(currentPortfolio, data);
      
      if (response?.ok) {
        notify({ message: response?.message, status: 'success' });
        setShowEditModal(false);
        setHandleRefresh(!handleRefresh);
      } else if (!response?.ok && response?.message === 'No changes') {
        notify({ message: 'There are no Modifications', status: 'warning' });
        setShowEditModal(false);
      } else {  
        notify({ message: response?.message, status: 'danger' });
      }
    } catch (error) {
      notify({ message: error?.message, status: 'danger' });
    }
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

  const handleDelete = (portfolio) => portfolio?.productCount > 0 ? handleAlertModalShow() : handleDeleteModalShow(portfolio);

  const DeleteEmptyPortfolio = async ()=>{
    try {
      console.log(currentPortfolio)
      const response = await axios.delete(`/portfolios/${currentPortfolio?._id}`);
        if(response.status === 200 ){
          notify({ message: response?.data?.message , status: 'success' });
          setShowDeleteModal(false);
          setHandleRefresh(!handleRefresh);
        }
    } catch (error) {
      notify({message : JSON.parse(error?.request?.response)?.message , status : 'danger' });
      setShowDeleteModal(false);
      
    }

  };

  return (
    <>
    { hasPermission('portfolio', 'consult') ? (
      <div>
        <PortfolioHeader color={'success'} name={'Portfolio'} />
        <div className="mx-5">
          <div className=" row justify-content-start align-items-center gap-5">
          
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => (
                <PortfolioCard
                  portfolioKey={portfolio._id}
                  dataProvider={portfolio}
                  handleFunctions={{
                    editModal: () => handleEditModalShow(portfolio),
                    deleteModal: () => handleDelete(portfolio),
                  }}
                />
              ))
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-5">
                <Image priority src={PortfolioNotFound} draggable={false} alt="Portfolio Not Found" />
                <p className="text-dark-gray fw-bolder text-center fs-1">No portfolio Found</p>
              </div>
            )}
          
          </div>
        </div>
      </div>
    )
    :push('/')
  }
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

      <ConfirmModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} headerTitle="Delete Portfolio" handleClick={DeleteEmptyPortfolio}>
        <p className='text-muted' >This Portfolio is empty. Are you sure you want to delete it?</p>
      </ConfirmModal>

      <AlertModal show={showAlertModal} handleClose={()=>setShowAlertModal(false)} headerTitle='Portfolio Not Empty' >
        <p className='text-muted' >The Portfolio cannot be deleted because it currently contains <b>Products</b>. To delete the Portfolio, you'll need to remove all associated Products first.</p>
      </AlertModal>

    </>
  );
};

export default Portfolio;