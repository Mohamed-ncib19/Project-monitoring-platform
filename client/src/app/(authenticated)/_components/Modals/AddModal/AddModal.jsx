import { useState } from "react";
import CoreButton from "@/components/buttons/CoreButton";
import { Modal } from "react-bootstrap";

export const AddModal = ({
  headerTitle,
  show,
  handleClose,
  children,
  onSubmit,
  stepsButton = false,
  nbSteps,
  stepsButtonLabel
}) => {

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header className="bg-soft-gray">
          <Modal.Title className="fw-normal">{headerTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <div className="col-6 d-flex flex-md-row flex-column justify-content-end m-auto align-items-end gap-4">
            {!stepsButton ? (
              <CoreButton label="Create" onClick={onSubmit} />
            ) : (
              <>
                <CoreButton
                  label={stepsButtonLabel[--nbSteps]}
                  onClick={onSubmit}
                />
              </>
            )}
            <CoreButton
              label="Cancel"
              variant="bg-light text-dark"
              onClick={handleClose}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
