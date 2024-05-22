'use client';
import './program.styles.css';
import { Suspense, useEffect, useState } from 'react';
import PmGroupHeader from '../../../components/pm-group-header/page';
import { getPrograms } from '../../api/routes/routesEndpoints';
import Loading from '../../loading';
import Avatar from '../../../components/avatar/page';
import EditDotsIcon from '../../../public/icons/edit-dots-icon';
import ToggleDropdown from '../../../components/dropdown/toggle-dropdown';
import EmptyProgramSVG from '../../../public/icons/empty-program';
import Link from 'next/link';
import { Modal } from 'react-bootstrap';
import Button from '../../../components/buttons/simple-button/page';
import Swal from 'sweetalert2';
import ArrowIcons from '../../../public/icons/arrows/arrow-icon';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div>
        <Suspense fallback={<Loading />}>
          <PmGroupHeader color={'success'} name={'Program'} />
        </Suspense>
        <div className="mx-5 ">
          <div className="row justify-content-start  px-5 gap-4 ">
            {programs.length > 0 ? (
              programs.map((program) => (
                <div
                  key={program.id}
                  className="program-container col-12 col-xl-3 px-2 py-4 d-flex flex-column gap-3 rounded-2"
                >
                  <div className="d-flex justify-content-end ">
                    <div className="edit-button rounded-circle p-1 d-flex justify-content-center align-items-center ">
                      <ToggleDropdown
                        button={
                          <button className=" align-self-end border-0 fs-2 bg-transparent text-dark-gray ">
                            <EditDotsIcon />
                          </button>
                        }
                        items={[
                          { content: 'edit', onclick: handleShow },
                          { content: 'Delete', onclick: 'deleteProgram' },
                        ]}
                        lastItemDivide={false}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-md-row flex-column align-items-center px-4 gap-4">
                    <Avatar
                      name={program.name}
                      background={'lightgreen'}
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
                    <p className="fw-bolder fs-6 text-dark">
                      Created At {program.begin}{' '}
                    </p>
                  </div>
                  <div className="d-flex flex-column px-4">
                    <p>
                      <span className="text-dark-gray fw-semibold">
                        Number of Products :
                      </span>{' '}
                      <span className="fw-bolder text-dark">
                        {program.products}
                      </span>
                    </p>
                    <div className="line rounded w-25 bg-primary mt-3 mb-3"></div>
                    <p>
                      <span className="text-dark-gray fw-semibold">
                        Number of Projects :
                      </span>{' '}
                      <span className="fw-bolder text-dark">
                        {program.projects}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/My/programs/${program.id}/products`}
                    p
                    className=" check-products align-self-end border-0 rounded-circle px-1 py-1 fs-4  text-dark-gray"
                  >
                    <ArrowIcons.ArrowRightIcon />
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

      <Modal show={show} onHide={handleClose} backdrop={false} size="xl">
        <div className="bg-soft-gray w-100 my-2 px-4  rounded-2">
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="fw-bold">Edit Program</p>
            </Modal.Title>
          </Modal.Header>
        </div>

        <Modal.Body>
          <div>add program</div>
        </Modal.Body>
        <Modal.Footer>
          <Button content={'Add'} onClick={handleClose} />
          <Button content={'Close'} onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Programs;
