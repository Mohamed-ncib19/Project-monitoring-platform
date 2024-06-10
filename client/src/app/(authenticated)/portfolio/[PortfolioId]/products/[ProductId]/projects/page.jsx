'use client';

import ProductNotFound from '@/../../public/SVG/Product-not-found.svg';  
import Image from 'next/image';
import { ProjectCard } from '@/app/(authenticated)/_components/Project/ProjectCard';
import { useBreadCumb } from '@/app/(authenticated)/_context/BreadcrumbsContext';
import { useEffect, useState } from 'react';
import { ProjectHeader } from '@/app/(authenticated)/_components/Project/ProjectHeader';

const ProjectsByProducts = ({ params }) => {
  const { ProductId } = params;
  console.log(ProductId)

  const { breadCumbItem,setShow } = useBreadCumb();
  
  const [ProjectsData, setProjectsData] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [handleRefresh , setHandleRefresh] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const DeleteProject = async (project)=>{
    try {
      const response = await axios.delete(`/projects/${project?._id}`);
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

  const handleShowDeleteModal = (project) =>{
    setSelectedProject(project);
    setShowDeleteModal(true);
  }

  useEffect(() => {
    const getProjects = async (id) => {
      try {
        console.log(id)
        const response = await axios.get(`/${id}/projects`);
        console.log(response);
        setProjectsData(response?.data?.projects || []);   
      } catch (error) {
        console.error(error);
        setProjectsData([]);
      }
    };
    
    if(ProductId){
      getProjects(ProductId);
    }else{
      console.log('test')
    }
  }, [ProductId]);
  

  return (
    <>
      <ProjectHeader color={'warning'} name={'projects'} />
      <div className="mx-5 ">
        <div className="project-container row justify-content-start m-auto">
          {ProjectsData.length > 0 ? (
            ProjectsData.map((project) => (
              <ProjectCard key={project._id} dataProvider={project} />
            ))
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Image
                priority
                src={ProductNotFound}
                alt="Product not found"
                width={400}
                draggable={false}
              />
              <p className="text-dark-gray fw-bolder text-center fs-1">No Product Found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsByProducts;
