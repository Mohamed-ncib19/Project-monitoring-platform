import { Modal } from 'react-bootstrap';

import CoreButton from '@/components/buttons/CoreButton';
import WarningIcon from '../../../../../../public/icons/warning-icon';
import { FormProvider } from 'react-hook-form';

const AddModal = ({
  show,
  handleClose,
  headerTitle,
  children,
  buttonLabel
}) => {


  const handleSetupUser = async (data) => {
    try {
      console.log(data);
      const { firstname, lastname, bio, phone, email, position, salary, role } =
        data;
      const cleanData = {};

      if (firstname && firstname !== user.firstname)
        cleanData.firstname = firstname;
      if (lastname && lastname !== user.lastname) cleanData.lastname = lastname;
      if (bio && bio !== user.bio) cleanData.bio = bio;
      if (phone && phone !== user.phone) cleanData.phone = phone;
      if (email && email !== user.email) cleanData.email = email;
      if (position && position !== user.position) cleanData.position = position;
      if (salary && salary !== user.salary) cleanData.salary = salary;
      if (role && role !== user.role) cleanData.role = role;

      if (Object.keys(cleanData).length > 0) {
        console.log(cleanData);
      } else {
        console.log('404');
      }
    } catch (error) {
      console.log(error);
    }
  };



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
        <FormProvider  >
          <form onSubmit={handleSetupUser} >
        
        <Modal.Body>

          <div className="modal-alert text-white d-flex justify-content-center align-items-center p-2 gap-2 rounded-5 mt-4">
            <i className="fs-4">
              <WarningIcon />
            </i>
            <p className="alert-content">
              Alert: setting a user's role will adjust their access to
              information and actions
            </p>
          </div>

          {children}
        </Modal.Body>
        <Modal.Footer>
          <div className="col-12 d-flex justify-content-end">
            <CoreButton type="submit" label={buttonLabel} />
          </div>
        </Modal.Footer>
        
        </form>
        </FormProvider>
      </Modal>
    </>
  );
};
export default AddModal;