import Modal from 'react-bootstrap/Modal';
import { useFormContext } from 'react-hook-form';

function FormModal({
  children,
  show,
  size,
  onHide,
  title,
  cancel = {
    label: 'Cancel',
    variant: 'secondary',
    icon: <i className="fa fa-times me-2" />,
  },
  submit = {
    label: 'Save',
    variant: 'primary',
    icon: <i className="fa fa-save me-2" />,
  },
  onValid,
}) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Modal show={show} onHide={onHide} size={size}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={onHide}
        />
      </Modal.Header>
      <Modal.Body>
        <form id="form-modal" onSubmit={handleSubmit(onValid)}>
          {children}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex w-100 justify-content-between">
          {cancel && (
            <button
              className={`btn btn-${cancel.variant}`}
              onClick={onHide}
              type="button"
            >
              {cancel.icon}
              {cancel.label}
            </button>
          )}
          {submit && (
            <button
              className={`btn btn-${submit.variant}`}
              type="submit"
              disabled={isSubmitting}
              form="form-modal"
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm align-middle me-2" />
              ) : (
                submit.icon
              )}
              {isSubmitting ? 'Ongoing treatment...' : submit.label}
            </button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
