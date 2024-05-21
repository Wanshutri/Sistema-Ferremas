import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./perfil.css";
import Sidebar1 from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom";
function Perfil() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="todo">
      <header>
        <Sidebar1 />
        <BannerCom />
      </header>
      {/*NAVBAR*/}
      <div className="container containers">
        <div className="half-box">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Primer Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre"
                  defaultValue=""
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Apellido"
                  defaultValue=""
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="15" controlId="validationCustom03">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="Correo" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Rut</Form.Label>
                <Form.Control type="text" placeholder="Rut" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom05">
                <Form.Label>Numero</Form.Label>
                <Form.Control type="text" placeholder="+569" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Button variant="success">Editar</Button>
            </Form.Group>
          </Form>
        </div>

        <div class="boletin">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="9" controlId="validationCustom01">
                <h4>Boletin informativo !</h4>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="9" controlId="validationCustom02">
                <p>Descargar boletin informativo de perfil personal?</p>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Quiero recibir el boletin informativo de los usuario de cada perfil seleecionado"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Perfil;
