import { Modal } from "react-bootstrap";
import CoreButton from "../buttons/CoreButton";
import { useCallback } from "react";

const ConfirmModal = ({ show, handleClose, headerTitle, username, children, handleSave }) => {
    const onDelete = useCallback(async () => {
        try {
            if (handleSave) await handleSave(username);
            handleClose();
        } catch (error) {
            throw Promise.reject({
                ok:false,
                status:404,
            })
        }
    }, [username, handleSave, handleClose]);

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
                    <CoreButton type='button' label='Confirm' onclick={onDelete} />
                </div>
                <div className="col-5">
                    <CoreButton variant="btn btn-light text-muted" label='Cancel' onclick={handleClose} />
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;
