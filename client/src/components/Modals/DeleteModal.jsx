import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function DeleteModal({
  show,
  onDelete: _onDelete,
  children,
  title = 'Confirmation de suppression',
  onHide,
  cancel = {
    label: 'Annuler',
    variant: 'secondary',
    icon: <i className="fa fa-times me-2" />,
  },
  submit = {
    label: 'Confirmer',
    variant: 'danger',
    icon: <i className="fa fa-check me-2" />,
  },
}) {
  const [isDeleting, setIsDeleting] = useState();
  const onDelete = async () => {
    setIsDeleting(true);
    await _onDelete();
    setIsDeleting(false);
  };
  return (
    <>
      <Modal show={show} onHide={onHide}>
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
        <Modal.Body>{children}</Modal.Body>
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
                type="button"
                disabled={isDeleting}
                onClick={onDelete}
              >
                {isDeleting ? (
                  <span className="spinner-border spinner-border-sm align-middle me-2" />
                ) : (
                  submit.icon
                )}
                {isDeleting ? 'Traitement en cours...' : submit.label}
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
