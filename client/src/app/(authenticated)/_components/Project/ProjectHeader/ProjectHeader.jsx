import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotifications } from 'reapop';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

import { AddModal } from '@/app/(authenticated)/_components/Modals/AddModal/';
import { StepsBar } from '@/app/(authenticated)/_components/StepsBar';

import CoreButton from '@/components/buttons/CoreButton';
import CoreInput from '@/components/Inputs/CoreInput';
import TextareaInput from '@/components/Inputs/Textarea';
import ComboBoxInput from '@/components/Inputs/ComboBoxInput';
import InlinedLabelInput from '@/components/Inputs/InlinedLabedInput';

import { ProductSchema } from '@/app/(authenticated)/_shcemas/product.shcema';

import DetailsIcon from '@/../../public/icons/details-icon';
import MembersIcon from '@/../../public/icons/members-icon';
import FrameworkIcon from '@/../../public/icons/framework-icon';
import { Avatar } from '../../Avatar';
import CancelIcon from '../../../../../../public/icons/cencel-icon';

import ScrumImage from '@/../../public/images/Scrum.png';
import KanbanImage from '@/../../public/images/Kanban.png';
import CustomRadio from '@/components/Inputs/CustomRadio';
import { ProjectSchema } from '@/app/(authenticated)/_shcemas/project.schema';

const Step1Form = ({ control, register, errors, portfolios,notify,projectCode,setProjectCode }) => {
  
  const [selectedPortfolio,setSelectedPortfolio] = useState([]);
  const [productOptions,setProductOption] = useState([]);

  const [startDateValue,setStartDateValue] = useState(null);
  const [endDateValue,setEndDateValue] = useState(null);

  const [daysValue,setDaysValue] = useState(null);

  const [projectName , setProjectName] = useState('');

  
  useEffect(()=>{
    const fetchData = async (portfolio) =>{
      try {
        const productsData = await axios.get(`/${portfolio?.value}/products`);
        if(productsData?.status === 200 && productsData?.data?.products.length > 0 ){
          const transformedProducts = await productsData.data.products.map(product => ({value:product?._id, label: product?.name}));
          setProductOption(transformedProducts);
        }else{
          notify({ message : `There are no Products for ${portfolio?.label} ` , status:'warning'});
          setProductOption([]);
        }
      } catch (error) {
        setProductOption([]);
        notify({ message : `${JSON.parse(error?.request?.response).message} for ${ selectedPortfolio ? selectedPortfolio?.label : ''} ` , status:'warning'});
      }
      
    }
    if(selectedPortfolio?.length !== 0){
      fetchData(selectedPortfolio);
    }
  },[selectedPortfolio]);
  

  useEffect(() => {
    if (!startDateValue || !endDateValue) {
        return;
    }

    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    if (isNaN(startDate) || isNaN(endDate)) {
        return;
    }
    const diffInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 0) {
        notify({ message: 'Start date should be before end date', status: 'danger' });
    } else {
        setDaysValue(diffInDays);
    }
}, [startDateValue, endDateValue]);

useEffect(() => {
  const generateProjectCode = (name) => {
    const baseCode = name.toLowerCase().replace(/\s+/g, '-').substring(0, 5);
    const uniqueCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${baseCode || 'prd'}${uniqueCode}`;
  };

  setProjectCode(generateProjectCode(projectName));
}, [projectName]);
  return(
    <>
  <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
   <label htmlFor="portfolio" className='text-muted'>Portfolio<span className='text-danger'>*</span></label>
   <div className='col-lg-8 col-12 z-index-1000'>
   <Controller
      name="portfolio"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          className="custom-select-container"
          classNamePrefix="custom-select"
          options={portfolios}
          onChange={(option) => {
            field.onChange(option ? option.value : '');
            setSelectedPortfolio(option);
          }}
          onBlur={field.onBlur}
          value={portfolios.find((option) => option.value === field.value) || ''}
        />
      )}
    />
     {errors.portfolio && <span className="text-danger">{errors.portfolio.message}</span>}
   </div>
 </div>

 <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
   <label htmlFor="portfolio" className='text-muted'>Product<span className='text-danger'>*</span></label>
   <div className='col-lg-8 col-12 z-index-999'>
     <Controller
       name='product'
       control={control}
       render={({ field }) => (
         <Select
           {...field}
           className='custom-select-container'
           classNamePrefix='custom-select'
           options={productOptions}
           onChange={(option) => field.onChange(option ? option?.value : '')}
           onBlur={field.onBlur}
           value={productOptions.find((option) => option?.value === field?.value) || ''}
         
         />
       )}
     />
     {errors.portfolio && <span className="text-danger">{errors.portfolio.message}</span>}
   </div>
 </div>

 <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
   <label htmlFor="name" className='text-muted'>Project name<span className='text-danger'>*</span></label>
   <div className="col-lg-8 col-12 me-lg-3 m-0">
     <CoreInput
       name="name"
       placeholder="Required"
       register={register}
       errors={errors}
       onChange={(e) => setProjectName(e.target.value)}

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
                  value={projectCode}
                />
              </div>
            </div>


 <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
   <label htmlFor="budget" className='text-muted'>Budget</label>
   <div className='col-lg-8 col-12'>
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

 <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
  <label htmlFor="date" className='text-muted text-end '>Duration<span className='text-danger'>*</span></label>
  <div className='d-flex flex-lg-row flex-column align-items-start col-lg-8 col-12'>
    <div className='col-lg-7 col-12'>
      <CoreInput
        name='startDate'
        placeholder='Start date'
        type='date'
        register={register}
        errors={errors}
        onChange={(e)=> setStartDateValue(e.target.value) }
      />
    </div>
    <span className='bg-soft-gray px-2 py-3 text-center'>To</span>
    <div className='col-lg-7 col-12'>
      <CoreInput
        name='endDate'
        placeholder='End date'
        type='date'
        register={register}
        errors={errors}
        onChange={(e)=> setEndDateValue(e.target.value) }
      />
    </div>
   </div>
 </div>

 <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
   <label htmlFor="name" className='text-muted'>Days<span className='text-danger'>*</span></label>
   <div className="col-lg-8 col-12">
       <InlinedLabelInput
       name='days'
       placeholder='Days'
       register={register}
       errors={errors}
       readOnly={true}
       InlineLabel='Days'
       value={daysValue}
       />
   </div>
 </div>

 <div className='d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center'>
   <label htmlFor="description" className='text-muted'>Description</label>
   <div className='col-lg-8 col-12'>
     <TextareaInput
       name='description'
       register={register}
       errors={errors}
       cols={1000}
     />
   </div>
 </div>

{/*  <div className="d-flex flex-column justify-content-center m-auto col-lg-7 col-12 gap-4 ">
 <RadioInput
   name="access"
   label="Public - anyone in the company can access this project"
   value="public"
   register={register}
   errors={errors}
   isSelected={true}
 />
</div> */}

</>
  );
};

const Step2Form = ({ register, errors, handleClose,control, notify,setValue }) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getActiveUsers = async () => {
    try {
      const response = await axios.get('/users/status/active');
      const transformedUsers = response.data.users.map(user => ({
        value: user?._id,
        label: `${user?.firstname} ${user?.lastname}`,
        email : user?.email
      }));
      setUserOptions(transformedUsers);
    } catch (error) {
      console.log(error);
      notify({ message: 'Failed to fetch users', status: 'danger' });
    }
  };

  useEffect(() => {
    getActiveUsers();
  }, []);

  const handleUserChange = selectedOptions => {
    setSelectedUsers(selectedOptions || []);
    setValue('members', selectedOptions);
  };

  const removeUser = user => {
    const updatedUsers = selectedUsers.filter(u => u.value !== user.value);
    setSelectedUsers(updatedUsers);
    setValue('members', updatedUsers);
  };

  const MyOption = (props) => {
    const { innerProps, innerRef } = props;
    return (
     <div className='custom-option border-bottom ' ref={innerRef} {...innerProps} >
        <div className='d-flex gap-3' >
          <Avatar name={`${props.data.label}`} variant='soft-gray' rounded='circle' />
            <div className='d-flex flex-column' >
              <span>{props.data.label}</span>
              <span>{props.data.email}</span>
            </div>
        </div>
     </div>
    );
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center gap-5' >
      <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center">
        <div className="col-lg-10 col-12">
          <Controller
            name="members"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className='custom-select-container'
                classNamePrefix='custom-select'
                onChange={handleUserChange}
                options={userOptions}
                components={{Option: MyOption}}
                placeholder='Select Team member'
                onBlur={field.onBlur}
                isMulti
                value={selectedUsers}
              />
            )}
          />
        </div>
      </div>

      <div className="project-team-list  col-lg-7 col-10">
      {selectedUsers.map(user => (
        <div key={user.value} className="user-entry d-flex justify-content-between align-items-center p-2 bg-white border rounded mb-2">
          <div className='d-flex align-items-center gap-3'>
            <Avatar name={user?.label} variant='soft-gray' rounded='circle' />
            <div className='d-flex flex-column'>
              <span className='fw-bold'>{user?.label}</span>
              <span className='text-muted'>{user?.email}</span>
            </div>
          </div>
          <button type="button" className="btn rounded-circle cancel-user" onClick={() => removeUser(user)}>
            <CancelIcon />
          </button>
        </div>
      ))}
    </div>
    </div>
  );
};

const Step3Form = ({ control, register, errors , handleClose ,notify,setValue}) => (
  <>
  
    <div className='d-flex flex-lg-row flex-column justify-content-center align-items-center'>
      <div className=' d-flex flex-lg-row flex-column' >
      <CustomRadio
        label='Scrum'
        description='Agile Development Management'
        register={register}
        name='model'
        imageSrc={ScrumImage}
        value='scrum'
        onChange={(v) => setValue('model', v)}
      />

      <CustomRadio
        label='Kanban'
        description='Kanban Project Management'
        register={register}
        name='model'
        imageSrc={KanbanImage}
        value='kanban'
        onChange={(v) => setValue('model', v)}
      />

      </div>
    </div>
  </>
);

export const ProjectHeader = ({ color, name, productRootLayer = true, defaultPortfolio }) => {
  const { notify } = useNotifications();

  const { refresh } = useRouter();

  const [portfolioOptions, setPortfolioOptions] = useState([]);

  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [projectCode , setProjectCode] = useState('');





  const StepsVerifier = [{ step1: false, step2: false, step3: false }];
  const SetpsLabel = ["Details", "Members", "Framework"];
  const LabelIconsArray = [
    <DetailsIcon /> , <MembersIcon /> , <FrameworkIcon />
  ]


  const getCurrentSchema = (step) => {
    switch(step) {
      case 1: return ProjectSchema.Step1Schema;
      case 2: return ProjectSchema.Step2Schema;
      case 3: return ProjectSchema.Step3Schema;
      default: return ProjectSchema.Step1Schema;
    }
  };

  const methods = useForm({
    resolver: yupResolver(getCurrentSchema(currentStep , ProjectSchema)),
  });

  const { handleSubmit, formState: { errors }, register, control, reset,setValue } = methods;

  useEffect(() => {
    if (!productRootLayer && defaultPortfolio) {
      reset({ portfolio: defaultPortfolio });
    }
  }, [reset, defaultPortfolio]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
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
    fetchPortfolios();
  }, []);



const AddProject = async (data) =>{
  try {
    const response = await axios.post('/projects',data);
    console.log(response);
    if(response.status === 201){
      return {ok:true, message : response.data.message};
    }
  } catch (error) {
    console.log(error)
    return {ok:false, message : JSON.parse(error?.request.response).message};
  }
}
  

  const onSubmit = handleSubmit(async (data) => {
   try {
    if(currentStep < 3){
      setCurrentStep((prevStep) => prevStep + 1);
    }else{

      const newMembersArray = data.members.map((member) => member.value );

      const reformedData = {
        ...data,
        code : projectCode,
        members: newMembersArray,
      };

      const response = await AddProject(reformedData);
      if(response.ok){
        notify({message : response.message , status : 'success'});
        handleClose();
        refresh();
      }else{
        notify({message : response?.message , status : 'danger'});
      }
    }

   } catch (error) {
    notify({message : error?.message , status : 'danger'});

   }
  });


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

      <AddModal show={show} handleClose={handleClose} headerTitle='Create Project' onSubmit={onSubmit}>
        <StepsBar
          listLength={3}
          labels={SetpsLabel}
          labelIcons={LabelIconsArray}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          StepsVerifier={StepsVerifier}
        />
        <FormProvider {...methods}>
          <form className='d-flex flex-column gap-5 py-5'>
            {currentStep === 1 && <Step1Form control={control} register={register} errors={errors} portfolios={portfolioOptions} handleClose={handleClose} notify={notify} projectCode={projectCode} setProjectCode={setProjectCode} />}
            {currentStep === 2 && <Step2Form register={register} errors={errors} handleClose={handleClose} control={control} notify={notify} setValue={setValue} />}
            {currentStep === 3 && <Step3Form control={control} register={register} errors={errors} handleClose={handleClose} notify={notify} setValue={setValue} />}
          </form>
        </FormProvider>
      </AddModal>
    </>
  );
};