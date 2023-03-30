import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ title, body, buttonLabel }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonLabel}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;

// for parent component

// <div>
//   <CustomModal
//     title="My Modal Title"
//     body="This is the body of my modal."
//     buttonLabel="Open Modal"
//   />
// </div>
