import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./modalcontac.css";

function ModalContactanos() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Enviar comentarios
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agradecemos tu preferencia!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrese su email</Form.Label>
              <Form.Control
                type="email"
                placeholder="nombre@ejemplo.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Dejanos tus comentarios</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="botoncerrar"
            variant="secondary"
            onClick={handleClose}
          >
            Cerrar
          </Button>
          <Button
            className="botonenviar"
            variant="primary"
            onClick={handleClose}
          >
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalContactanos;
