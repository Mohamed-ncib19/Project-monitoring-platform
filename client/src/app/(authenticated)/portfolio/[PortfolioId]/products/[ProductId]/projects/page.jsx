'use client';

import { ProductHeader } from '@/app/(authenticated)/_components/Product/ProductHeader';
import ProductNotFound from '@/../../public/SVG/Product-not-found.svg';  
import Image from 'next/image';
import { ProjectCard } from '@/app/(authenticated)/_components/Project/ProjectCard';
import { useBreadCumb } from '@/app/(authenticated)/_context/BreadcrumbsContext';
import { useEffect } from 'react';

const ProjectsByProducts = ({ params }) => {
  const { ProductId } = params;

  const { breadCumbItem,setShow } = useBreadCumb();
  

  useEffect(()=>{
      breadCumbItem.length === 3 ? setShow(false) : setShow(true);
  },[breadCumbItem]);

  const ProjectsData = [
    {
      _id: 1,
      name: "project name 1",
      description: "This indicates the product intro for lorem lorem lorem lorme lorem lorme lorem",
      startDate: "12/04/2024",
      endDate: "12/04/2025",
      numberOfProjects: 4,
      parent: '84a257d5-8199-427a-9ca0-29ab0f5bb031',
      projectMembers: ["E", "J", "A", "R", "+8"]
    },
    {
      _id: 2,
      name: "project name 2",
      description: "This indicates the product intro for lorem lorem lorem lorme lorem lorme lorem",
      startDate: "01/01/2023",
      endDate: "01/01/2024",
      numberOfProjects: 3,
      parent: 2,
      projectMembers: ["M", "N", "O", "P", "+5"]
    },
  ];
  
  return (
    <>
      <ProductHeader color={'warning'} name={'projects'} />
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
