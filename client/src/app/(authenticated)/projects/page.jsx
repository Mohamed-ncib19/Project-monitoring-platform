'use client';
import ProjectNotFound from '@/../../public/SVG/Project-not-found.svg';
import Image from 'next/image';
import { ProjectHeader } from '@/app/(authenticated)/_components/Project/ProjectHeader/';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProjectCard } from '../_components/Project/ProjectCard';
import { ConfirmModal } from '../_components/Modals/ConfirmModal';
import { useNotifications } from 'reapop';
import { EditModal } from '@/app/(authenticated)/_components/Modals/EditModal';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CoreInput from '@/components/Inputs/CoreInput';
import { EditProjectSchema } from '../_shcemas/editPoject.schema';
import Select from 'react-select';
import ComboBoxInput from '@/components/Inputs/ComboBoxInput';
import TextareaInput from '@/components/Inputs/Textarea';
import { Avatar } from '../_components/Avatar';
import CancelIcon from '../../../../public/icons/cencel-icon';
import { useAuth } from '@/app/(authenticated)/_context/AuthContext';
const Projects = () => {
  const { notify } = useNotifications();

  const { hasPermission } = useAuth();

  const [ProjectsData, setProjectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [product,setProduct] = useState(null);
  

  const [productOptions, setProductOption] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditMembersModal,setShowEditMembersModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [handleRefresh, setHandleRefresh] = useState(false);


  const methods = useForm({
    resolver: yupResolver(EditProjectSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
    setValue,
  } = methods;

  useEffect(() => {
    if (selectedProject) {      
     const teamProject = userOptions.filter(member => selectedProject?.members.includes(member?.value));

      reset({
        product : selectedProject?.product,
        name : selectedProject?.name,
        budget : selectedProject?.budget,
        description : selectedProject?.description,
        members : teamProject


      });

    }
  }, [selectedProject, reset]);




  const handleShowEditModal = (project) => {
    setShowEditModal(true);
    setSelectedProject(project);
  };
  const handleCloseEditModal = () => setShowEditModal(false);


  const handleShowEditMembersModal = (project) =>{
    setShowEditMembersModal(true);
    setSelectedProject(project)
  };
  const handleCloseEditMembersModal = () => setShowEditMembersModal(false);


  const handleShowDeleteModal = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const DeleteProject = async () => {
    try {
      const response = await axios.delete(`/projects/${selectedProject?._id}`);
      if (response.status === 200) {
        notify({ message: response?.data?.message, status: 'success' });
        setShowDeleteModal(false);
        setHandleRefresh(!handleRefresh);
      }
    } catch (error) {
      notify({
        message: JSON.parse(error?.request?.response)?.message,
        status: 'danger',
      });
      setShowDeleteModal(false);
    }
  };


  const getAllProjects = async () => {
    try {
      const response = await axios.get('/projects');
      if (response?.status === 200) {
        return { ok: true, data: response?.data?.projects };
      }
    } catch (error) {
      return {
        ok: false,
        message: JSON.parse(error?.request?.response).message,
      };
    }
  };
  
  const handleUserChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions || []);
    setValue('members', selectedOptions);
  };

  const removeUser = (user) => {
    const updatedUsers = selectedUsers.filter((u) => u.value !== user.value);
    setSelectedUsers(updatedUsers);
    setValue('members', updatedUsers);
  };

  const getActiveUsers = async () => {
    try {
      const response = await axios.get('/users/status/active');
      const transformedUsers = response.data.users.map((user) => ({
        value: user?._id,
        label: `${user?.firstname} ${user?.lastname}`,
        email: user?.email,
      }));
      setUserOptions(transformedUsers);
    } catch (error) {
      notify({ message: 'Failed to fetch users', status: 'danger' });
    }
  };

  const getProductsOptions = async () => {
    try {
      const response = await axios.get(`/${selectedProject?.portfolio}/products`);
      const transformedProducts = response.data.products.map((product) => ({
        value: product?._id,
        label: product?.name,
      }));
      setProductOption(transformedProducts);
    } catch (error) {
      notify({ message: 'Failed to load products', status: 'danger' });
    }
  };

  useEffect(() => {
    getActiveUsers();
    getProductsOptions();
  }, [showEditModal]);




  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        if (response?.ok) {
          setProjectsData(response.data);
        }
      } catch (error) {
        notify({ message: error?.message, status: 'danger' });
      }
    };

    fetchProjects();
  }, [handleRefresh]);


  const MyOption = (props) => {
    const { innerProps, innerRef } = props;
    return (
      <div
        className="custom-option border-bottom "
        ref={innerRef}
        {...innerProps}
      >
        <div className="d-flex gap-3">
          <Avatar
            name={`${props.data.label}`}
            variant="soft-gray"
            rounded="circle"
          />
          <div className="d-flex flex-column">
            <span>{props.data.label}</span>
            <span>{props.data.email}</span>
          </div>
        </div>
      </div>
    );
  };

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

  const EditProject = async (data) =>{
    try {
      const {ok , changedFields} = await checkChanges(data , selectedProject);
      if(!ok){
        return {
          ok: false,
          message: 'No changes'
        }; 
      }else{

      
      const response = await axios.put(`/projects/${selectedProject?._id}`,changedFields);
      if(response?.status === 200 || response?.status === 201 ){
        return {ok:true , message : response?.data?.message };
      }
    }
    } catch (error) {
      return { ok:false , message : JSON.parse(error?.request.response).message };
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      const newMembersArray = data.members.map((member) => member.value );
      const reformedData = {
        ...data,
        members : newMembersArray
      };
      const EditProjectResponse = await EditProject(reformedData);
      handleCloseEditModal();
      handleCloseEditMembersModal();
      setHandleRefresh(!handleRefresh);
      if(EditProjectResponse.ok){
        notify({message : EditProjectResponse?.message , status : 'success'});
      }

    } catch (error) {
      console.log(error);
      notify({message : error?.message , status : 'danger'});
    }
  });

  return (
    <>
      <div>
        <ProjectHeader color='warning' name="Project" />
        <div className="mx-5 ">
          <div className=" row justify-content-start gap-5">
            {ProjectsData.length > 0 ? (
              ProjectsData.map((project) => {
                const canManage = hasPermission('projects' , 'manage');
                return(
                  <ProjectCard
                  projectKey={project?._id}
                  dataProvider={project}
                  supportBreadCumb={false}
                  projectsRootLayer={true}
                  setProduct={setProduct}
                  team={userOptions}
                  permission={canManage}
                  handleFunctions={ canManage && {
                    editModal: () => handleShowEditModal(project),
                    editMembersModal : () => handleShowEditMembersModal(project),
                    deleteModal: () => handleShowDeleteModal(project),
                  }}
                />
                );
              })
            ) : (
              <div className=" d-flex flex-column justify-content-center align-items-center">
                <Image
                  priority
                  src={ProjectNotFound}
                  alt="Project not found"
                  width={400}
                  draggable={false}
                />
                <p className=" text-dark-gray fw-bolder text-center fs-1">
                  No Product Found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditModal
        show={showEditMembersModal}
        handleClose={handleCloseEditMembersModal}
        headerTitle="Edit Team"
        onSubmit={onSubmit}
      >
        <FormProvider {...methods}>
          <form className="d-flex flex-column gap-5 py-5">

            <div className="d-flex flex-column justify-content-center align-items-center gap-5">
              <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-8 col-12 gap-4 align-items-center">
                <div className="col-lg-10 col-12">
                  <Controller
                    name="members"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="custom-select-container"
                        classNamePrefix="custom-select"
                        onChange={handleUserChange}
                        options={userOptions}
                        components={{ Option: MyOption }}
                        placeholder="Select Team member"
                        onBlur={field.onBlur}
                        isMulti
                      />
                    )}
                  />
                </div>
              </div>

              <div className="project-team-list  col-lg-7 col-10">
                {selectedUsers.map((user) => (
                  <div
                    key={user.value}
                    className="user-entry d-flex justify-content-between align-items-center p-2 bg-white border rounded mb-2"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <Avatar
                        name={user?.label}
                        variant="soft-gray"
                        rounded="circle"
                      />
                      <div className="d-flex flex-column">
                        <span className="fw-bold">{user?.label}</span>
                        <span className="text-muted">{user?.email}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn rounded-circle cancel-user"
                      onClick={() => removeUser(user)}
                    >
                      <CancelIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </FormProvider>
      </EditModal>

      <EditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        headerTitle="Edit Project"
        onSubmit={onSubmit}
      >
        <FormProvider {...methods}>
          <form className="d-flex flex-column gap-5 py-5">
            <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center">
              <label htmlFor="portfolio" className="text-muted">
                Product<span className="text-danger">*</span>
              </label>
              <div className="col-lg-8 col-12 z-index-999">
                <Controller
                  name="product"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="custom-select-container"
                      classNamePrefix="custom-select"
                      options={productOptions}
                      onChange={(option) =>
                        field.onChange(option ? option?.value : '')
                      }
                      onBlur={field.onBlur}
                      value={
                        productOptions.find(
                          (option) => option?.value === field?.value,
                        ) || ''
                      }
                    />
                  )}
                />
                {errors.portfolio && (
                  <span className="text-danger">
                    {errors.portfolio.message}
                  </span>
                )}
              </div>
            </div>

            <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center">
              <label htmlFor="name" className="text-muted">
                Project name<span className="text-danger">*</span>
              </label>
              <div className="col-lg-8 col-12 me-lg-3 m-0">
                <CoreInput
                  name="name"
                  placeholder="Required"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center">
              <label htmlFor="budget" className="text-muted">
                Budget
              </label>
              <div className="col-lg-8 col-12">
                <ComboBoxInput
                  name="budget"
                  placeholder="Budget"
                  type="number"
                  register={register}
                  errors={errors}
                  options={[
                    { label: 'TND', value: 'TND' },
                    { label: 'EUR', value: 'EUR' },
                    { label: 'USD', value: 'USD' },
                  ]}
                />
                {errors.budget && (
                  <span className="text-danger">{errors.budget.message}</span>
                )}
              </div>
            </div>

            <div className="d-flex flex-lg-row flex-column justify-content-lg-around justify-content-center col-lg-10 col-12 gap-4 align-items-center">
              <label htmlFor="description" className="text-muted">
                Description
              </label>
              <div className="col-lg-8 col-12">
                <TextareaInput
                  name="description"
                  register={register}
                  errors={errors}
                  cols={1000}
                />
              </div>
            </div>

    
          </form>
        </FormProvider>
      </EditModal>

      <ConfirmModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        headerTitle="Delete project"
        handleClick={DeleteProject}
      >
        <p className="text-muted">
          Are you sure you want to delete this Project?
        </p>
      </ConfirmModal>
    </>
  );
};

export default Projects;
