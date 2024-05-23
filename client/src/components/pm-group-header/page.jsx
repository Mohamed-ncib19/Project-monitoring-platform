'use client';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

import Button from '../buttons/simple-button/page';
import SelectInput from '../Inputs/select-input/page';

import './pm-group.styles.css';

const PmGroupHeader = ({ color, name }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className={`bg-light flex-md-row flex-column p-3 px-5 m-3 border-4 border-start border-${color} d-flex justify-content-md-between justify-content-center `}
    >
      <div className="text-center text-md-start mb-3 mb-md-0">
        <p className="fw-bolder fs-4">{name}</p>
        <p className="text-secondary fs-6">
          Hi, welcome to client {name} management
        </p>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center col-md-4">
        <Button content={`Add ${name}`} onClick={handleShow} />
        <SelectInput
          hookForm={false}
          content={[
            { text: 'filter1', value: 'filter1' },
            { text: 'filter2', value: 'filter2' },
            { text: 'filter3', value: 'filter3' },
          ]}
        />
      </div>

      <Modal show={show} onHide={handleClose} backdrop={false} size="xl">
        <div className="bg-soft-gray w-100 my-2 px-4  rounded-2">
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="fw-bold">Create Program</p>
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
    </div>
  );
};

export default PmGroupHeader;