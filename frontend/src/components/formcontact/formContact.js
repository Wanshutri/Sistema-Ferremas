import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './formContact.css'


function Formulario() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingrese su correo electrónico" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control placeholder="Felipe" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridApellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control placeholder="Andrade" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label> Número de teléfono</Form.Label>
          <Form.Control type='number' placeholder='+56' />
        </Form.Group>
      </Row>

    

      <Button variant="success" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default Formulario;