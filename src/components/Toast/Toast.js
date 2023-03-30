import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { useSelector } from "react-redux";

function Toaster() {
  const [show, setShow] = useState(false);
  const inputValue = useSelector((state) => state.toastAction);

  console.log(inputValue);
  return (
    <Row>
      <Col xs={6}>
        <Toast
          style={{ background: "red" }}
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Body>
            Woohoo, you're reading this text in a Toast! {inputValue}
          </Toast.Body>
        </Toast>
      </Col>
      <Col xs={6}>
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </Col>
    </Row>
  );
}

export default Toaster;
