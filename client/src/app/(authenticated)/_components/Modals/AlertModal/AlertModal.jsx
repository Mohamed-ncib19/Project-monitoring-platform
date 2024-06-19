import CoreButton from "@/components/buttons/CoreButton";
import { Modal } from "react-bootstrap";

export const AlertModal = ({show,handleClose ,children,headerTitle,size = 'md'}) => {
    return(
        <Modal show={show} onHide={handleClose} className="confirm-modal" size={size} >
            <Modal.Header className="confirm-modal-header"  >{headerTitle}</Modal.Header>
            <Modal.Body>
                {children}
                <div className="col-10 m-auto">
                    <CoreButton type='button' label='Confirm' onClick={handleClose} />
                </div>
            </Modal.Body>
        </Modal>
    );
}