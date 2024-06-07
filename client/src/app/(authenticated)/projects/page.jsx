'use client'

import ProjectNotFound from '@/../../public/SVG/Project-not-found.svg';
import Image from 'next/image';
import { ProjectHeader } from '@/app/(authenticated)/_components/Project/ProjectHeader/';
import { ProductCard } from '@/app/(authenticated)/_components/Product/ProductCard';

const Projects = () => {

  const ProjectsData = [
  
  ];

  return (
    <>
    <div>
      <ProjectHeader color={'warning'} name={'Project'} />
      <div className="mx-5 ">
          <div className=" portfolio-container row justify-content-start m-auto">
            {ProjectsData.length > 0 ? (
              ProjectsData.map((product) => (
                <p>product</p>
              ))
            ) : (
              <div className=" d-flex flex-column justify-content-center align-items-center">
                <Image
                  priority
                  src={ProjectNotFound}
                  alt="Project not found"
                  width={400}
                  draggable={false}
                />
                <p className=" text-dark-gray fw-bolder text-center fs-1">No Product  Found</p>
              </div>
            )}
          </div>
        </div>
    </div>
    
    </>
  );
};

export default Projects;
