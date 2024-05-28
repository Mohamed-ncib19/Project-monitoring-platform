import { Modal } from 'react-bootstrap';

import CoreButton from '@/components/buttons/CoreButton';
import WarningIcon from '../../../../../../public/icons/warning-icon';

const AddModal = ({
  show,
  handleClose,
  headerTitle,
  children,
  buttonLabel
}) => {
  return (
<>
    <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName="full-height-modal"
        contentClassName="full-height-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>{headerTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       {/*    {edit && (
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-3">
                <Avatar
                  name={userData?.fullname || 'user name'}
                  background="primary"
                  rounded="1"
                  textColor="white"
                />
                <div>
                  <p>{userData?.fullname || 'fullname'}</p>
                  <p>{userData?.position || 'position'}</p>
                </div>
              </div>
              <p>profile link</p>
            </div>
          )} */}


       {   <div className="modal-alert text-white d-flex justify-content-center align-items-center p-2 gap-2 rounded-5 mt-4">
            <i className="fs-4">
              <WarningIcon />
            </i>
            <p className="alert-content">
              Alert: setting a user's role will adjust their access to
              information and actions
            </p>
          </div>}

          {children}
        </Modal.Body>
        <Modal.Footer>
          <div className="col-12 d-flex justify-content-end">
            <CoreButton type="submit" label={buttonLabel} />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddModal;