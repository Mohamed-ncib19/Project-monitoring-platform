import CoreButton from "@/components/buttons/CoreButton";
import { Modal } from "react-bootstrap";

export const EditModal = ({headerTitle,show,handleClose, children,onSubmit}) =>{
    return(
        <>
        <Modal show={show} onHide={handleClose} size="xl" >
            <Modal.Header className=" bg-soft-gray" >
                <Modal.Title className=" fw-normal" >{headerTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer >
              <div className=" col-6 d-flex flex-md-row flex-column justify-content-end m-auto align-items-end gap-4 " >
                <CoreButton  label='Cancel' variant='custom-bg text-dark' onClick={handleClose} />
                <CoreButton label='Save' onClick={onSubmit} />
                </div>
            </Modal.Footer>
        </Modal>
        </>
    );
}