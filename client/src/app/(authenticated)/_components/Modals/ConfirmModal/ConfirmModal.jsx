import { Modal } from "react-bootstrap";
import CoreButton from "@/components/buttons/CoreButton";

export const ConfirmModal = ({ show, handleClose, headerTitle, children,handleClick }) => {
    


    return (
        <Modal show={show} onHide={handleClose} size="md" centered className="confirm-modal">
            <Modal.Header closeButton className="confirm-modal-header">
                <Modal.Title>{headerTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer className="d-flex flex-md-row flex-column justify-content-center align-items-center gap-3">
                <div className="col-5">
                    <CoreButton type='button' label='Confirm' onClick={handleClick} />
                </div>
                <div className="col-5">
                    <CoreButton variant="btn btn-light text-muted" label='Cancel' onClick={handleClose} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}
