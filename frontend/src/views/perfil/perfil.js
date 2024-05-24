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
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import sana from './../../img/sana.jpg';

function Perfil() {
  const [validated, setValidated] = useState(false);

  return (
    <div className="boletin">
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={sana} />
        <Card.Body>
          <Card.Title><h1>Minatozaki Sana!</h1></Card.Title>
          <Card.Text>
            Modelo de categoria vagina XXL Coreana real con palpitaciones externas
            al sonido del trafico urbano del perro actual del liam ley 
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Usuario : XXX</ListGroup.Item>
          <ListGroup.Item>Precio  : XXX</ListGroup.Item>
          <ListGroup.Item>Cantidad  : XXX</ListGroup.Item>
          <ListGroup.Item>ID Producto  : XXX</ListGroup.Item>
        </ListGroup>
        <Card.Body className="d-flex justify-content-center">
          <Button variant="success" >Generar Boleta Usuario</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={sana} />
        <Card.Body>
          <Card.Title><h1>Minatozaki Sana!</h1></Card.Title>
          <Card.Text>
            Modelo de categoria vagina XXL Coreana real con palpitaciones externas
            al sonido del trafico urbano del perro actual del liam ley 
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Usuario : XXX</ListGroup.Item>
          <ListGroup.Item>Precio  : XXX</ListGroup.Item>
          <ListGroup.Item>Cantidad  : XXX</ListGroup.Item>
          <ListGroup.Item>ID Producto  : XXX</ListGroup.Item>
        </ListGroup>
        <Card.Body className="d-flex justify-content-center">
          <Button variant="success" >Generar Boleta Usuario</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={sana} />
        <Card.Body>
          <Card.Title><h1>Minatozaki Sana!</h1></Card.Title>
          <Card.Text>
            Modelo de categoria vagina XXL Coreana real con palpitaciones externas
            al sonido del trafico urbano del perro actual del liam ley 
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Usuario : XXX</ListGroup.Item>
          <ListGroup.Item>Precio  : XXX</ListGroup.Item>
          <ListGroup.Item>Cantidad  : XXX</ListGroup.Item>
          <ListGroup.Item>ID Producto  : XXX</ListGroup.Item>
        </ListGroup>
        <Card.Body className="d-flex justify-content-center">
          <Button variant="success" >Generar Boleta Usuario</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={sana} />
        <Card.Body>
          <Card.Title><h1>Minatozaki Sana!</h1></Card.Title>
          <Card.Text>
            Modelo de categoria vagina XXL Coreana real con palpitaciones externas
            al sonido del trafico urbano del perro actual del liam ley 
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Usuario : XXX</ListGroup.Item>
          <ListGroup.Item>Precio  : XXX</ListGroup.Item>
          <ListGroup.Item>Cantidad  : XXX</ListGroup.Item>
          <ListGroup.Item>ID Producto  : XXX</ListGroup.Item>
        </ListGroup>
        <Card.Body className="d-flex justify-content-center">
          <Button variant="success" >Generar Boleta Usuario</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Perfil;
