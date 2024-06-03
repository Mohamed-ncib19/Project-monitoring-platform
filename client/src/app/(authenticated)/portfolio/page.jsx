'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Dropdown, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

import ArrowRightIcon from '@/../public/icons/arrows/arrow-right-icon';
import EditDotsIcon from '@/../public/icons/edit-dots-icon';
import EmptyProgramSVG from '@/../public/icons/empty-program';
import { Avatar } from '@/app/(authenticated)/_components/Avatar';
import { ToggleDropdown } from '@/app/(authenticated)/_components/Dropdown/Dropdown';
import { PortfolioHeader } from '@/app/(authenticated)/_components/PortfolioHeader';
import Loading from '@/app/loading';
import CoreButton from '@/components/buttons/CoreButton';
import EditIcon from '../../../../public/icons/edit-icon';

const Portfolio = () => {
  //const [programs, setPrograms] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const programs = [
    {
      id: 1,
      name: "Program 1",
      desc: "Description of Program 1",
      begin: "2024-05-01",
      products: 10,
      projects: 5
    },
    {
      id: 2,
      name: "Program 2",
      desc: "Description of Program 2",
      begin: "2024-05-05",
      products: 15,
      projects: 7
    },
    {
      id: 3,
      name: "Program 3",
      desc: "Description of Program 3",
      begin: "2024-05-05",
      products: 15,
      projects: 7
    },
    {
      id: 4,
      name: "Program 4",
      desc: "Description of Program 4",
      begin: "2024-05-05",
      products: 15,
      projects: 7
    }, 
   ];
  
/*   useEffect(() => {
    const getAllPrograms = async () => {
      const res = await getPrograms();
      if (res.ok && res.status === 200) {
        setPrograms(res.data);
      } else if (!res.ok && res.status === 500) {
        await setErrorMsg('System Error!');
        Swal.fire({
          icon: 'error',
          title: 'System Error',
        });
      } else {
        await setErrorMsg('No Program Found');
      }
    };

    getAllPrograms();
  }, []); */

  return (
    <>
      <div>
          <PortfolioHeader color={'success'} name={'Portfolio'} />

        <div className="mx-5 ">
          <div className=" portfolio-container row justify-content-start m-auto">
            {programs.length > 0 ? (
              programs.map((program) => (
                <div
                  key={program.id}
                  className="portfolio-card col-12 col-xl-3 col-lg-4 col-md-5 py-1 d-flex flex-column gap-1 rounded-2"
                >
                  <div className="d-flex justify-content-end ">
                    
                    <div >
                      <Dropdown>
                        <Dropdown.Toggle as='button' className='border-0 edit-protfolio m-2 fs-5 text-muted rounded-circle px-2 py-1 shadow-sm' >
                        <EditDotsIcon />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=>console.log('edit modal')} >Edit</Dropdown.Item>
                          <Dropdown.Item onClick={()=>console.log('delete modal')} >Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                  </div>
                  <div className="d-flex flex-md-row flex-column align-items-center px-4 gap-4">
                    <Avatar
                      name={program.name}
                      variant={'info'}
                      rounded={'1'}
                      textColor={'dark'}
                    />
                    <p className="fw-bold fs-5 text-dark ">{program.name}</p>
                  </div>
                  <div className="d-flex flex-column px-4 py-3">
                    <p className="text-dark-gray">
                      {program.desc.split(' ').length > 15
                        ? `${program.desc.split(' ').slice(0, 15).join(' ')}...`
                        : program.desc}
                    </p>
                  </div>
                  <div className="d-flex flex-column px-4 pt-5">
                    <p>
                      <span className="protfolio-children-length fw-semibold">
                        Number of Products :
                      </span>{' '}
                      <span className="fw-bolder text-dark">
                        {program.products}
                      </span>
                    </p>
                    <div className="line rounded w-25   mb-3"></div>
                    <p>
                      <span className="protfolio-children-length fw-semibold">
                        Number of Projects :
                      </span>{' '}
                      <span className="fw-bolder text-dark">
                        {program.projects}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/My/portfolio/${program.id}/products`}
                    p
                    className=" check-products align-self-end border-0 rounded-circle px-2 py-1 fs-4  text-dark-gray"
                  >
                    <ArrowRightIcon />
                  </Link>
                </div>
              ))
            ) : (
              <div className=" d-flex flex-column justify-content-center align-items-center w-100 vh-100">
                <EmptyProgramSVG />
                <p className=" text-dark-gray fw-bolder fs-1">{errorMsg}</p>
              </div>
            )}
          </div>
        </div>
      </div>

        

    </>
  );
};

export default Portfolio;
