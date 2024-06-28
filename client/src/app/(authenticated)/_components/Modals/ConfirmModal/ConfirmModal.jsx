import { Modal } from "react-bootstrap";
import CoreButton from "@/components/buttons/CoreButton";
import clsx from "clsx";

export const ConfirmModal = ({ show, handleClose, headerTitle, children,handleClick, deleteModal = false }) => {
    


    return (
        <Modal show={show} onHide={handleClose} size="md" centered className="confirm-modal">
            <Modal.Header className={clsx('confirm-modal-header',{ ' bg-delete ' : deleteModal })}>
                <Modal.Title>{headerTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer className="d-flex flex-md-row flex-column justify-content-center align-items-center gap-3">
                <div className="col-5">
                    <CoreButton type='button' label='Confirm' variant={clsx({ ' bg-delete-button' : deleteModal })} onClick={handleClick} />
                </div>
                <div className="col-5">
                    <CoreButton variant="custom-bg text-muted" label='Cancel' onClick={handleClose} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}
