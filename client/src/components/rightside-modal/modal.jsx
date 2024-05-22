import { Modal } from 'react-bootstrap';
import './modal.styles.css';
import Avatar from '../avatar/page';
import Button from '../buttons/simple-button/page';
import WarningIcon from '../../public/icons/warning-icon';
import SubmitButton from '../buttons/submit-button/submit-button';

const CustomModal = ({
  show,
  handleClose,
  headerTitle,
  userData,
  form,
  edit,
}) => {
  return (
    <div className="modal bg-danger">
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="full-height-modal"
        contentClassName="full-height-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>{headerTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {edit && (
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
          )}
          <div className="modal-alert text-white d-flex justify-content-center align-items-center p-2 gap-2 rounded-5 mt-4">
            <i className="fs-4">
              <WarningIcon />
            </i>
            <p className="alert-content">
              Alert: setting a user's role will adjust their access to
              information and actions
            </p>
          </div>

          {form}
        </Modal.Body>
        <Modal.Footer>
          <div className="col-12 d-flex justify-content-end">
            <SubmitButton content={'Save'} />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
