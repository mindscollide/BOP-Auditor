import Modal from "react-bootstrap/Modal";
import "./Modal.css";

const CustomModal = ({
  ModalTitle,
  ModalBody,
  ModalFooter,
  show,
  onHide,
  size,
  backdrop,
  modalBodyClassName,
  modalParentClass,
  modalFooterClassName,
  modalHeaderClassName,
  className,
}) => {
  return (
    <>
      <div className={modalParentClass}>
        <Modal
          show={show}
          onHide={onHide}
          // backdrop={backdrop}
          data-backdrop="true"
          size={size}
          centered={true}
          className={className}
        >
          <Modal.Header className={modalHeaderClassName} closeButton>
            <Modal.Title>{ModalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={modalBodyClassName}>{ModalBody}</Modal.Body>
          <Modal.Footer className={modalFooterClassName}>
            {ModalFooter}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CustomModal;
