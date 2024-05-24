import React from "react";
import './PaginaProducto.css';
import sana from './../../img/sana.jpg';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';


function PaginaProducto() {
    return (
      <>
        <div className="lateral">
          <nav className="sidebar__nav"> 
            <h4>Categoria</h4> 
            <a  href=""><i className="bx bx-home-alt-2"></i>Inicio</a>
            <a href=""><i className="bx bx-home-alt-2"></i>Servicio</a>
            <a href=""><i className="bx bx-home-alt-2"></i>Cliente</a>
            <h4>Precio</h4>
            <a href=""><i className="bx bx-home-alt-2"></i>Contacto</a>
            <a href=""><i className="bx bx-home-alt-2"></i>Contacto</a>
            <a href=""><i className="bx bx-home-alt-2"></i>Contacto</a>
            <h4>Precio</h4>
            <a href=""><i className="bx bx-home-alt-2"></i>Contacto</a>
            <a href=""><i className="bx bx-home-alt-2"></i>Contacto</a>
            <a href=""><i className="bx bx-home-alt-2"></i>Contacto</a>
          </nav>
        </div>
        
        <div className="producto">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={sana} />
            <Card.Body>
            <Card.Title><h2>Titulo aqui</h2></Card.Title> 
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush ">
            <ListGroup.Item>$150.990</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Button className="boton">Agregar Al Carrito </Button>
            </Card.Body>
        </Card>
        {/* Borrar las cards de aqui para abajo */}

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={sana} />
          <Card.Body>
          <Card.Title><h2>Titulo aqui</h2></Card.Title> 
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush ">
          <ListGroup.Item>$150.990</ListGroup.Item>
          </ListGroup>
          <Card.Body>
          <Button className="boton">Agregar Al Carrito </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={sana} />
          <Card.Body>
          <Card.Title><h2>Titulo aqui</h2></Card.Title> 
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush ">
          <ListGroup.Item>$150.990</ListGroup.Item>
          </ListGroup>
          <Card.Body>
          <Button className="boton">Agregar Al Carrito </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={sana} />
          <Card.Body>
          <Card.Title><h2>Titulo aqui</h2></Card.Title> 
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush ">
          <ListGroup.Item>$150.990</ListGroup.Item>
          </ListGroup>
          <Card.Body>
          <Button className="boton">Agregar Al Carrito </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={sana} />
          <Card.Body>
          <Card.Title><h2>Titulo aqui</h2></Card.Title> 
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush ">
          <ListGroup.Item>$150.990</ListGroup.Item>
          </ListGroup>
          <Card.Body>
          <Button className="boton">Agregar Al Carrito </Button>
          </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={sana} />
            <Card.Body>
            <Card.Title><h2>Titulo aqui</h2></Card.Title> 
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush ">
            <ListGroup.Item>$150.990</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Button className="boton">Agregar Al Carrito </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={sana} />
            <Card.Body>
            <Card.Title><h2>Titulo aqui</h2></Card.Title> 
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush ">
            <ListGroup.Item>$150.990</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Button className="boton">Agregar Al Carrito </Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={sana} />
            <Card.Body>
            <Card.Title><h2>Titulo aqui</h2></Card.Title> 
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush ">
            <ListGroup.Item>$150.990</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Button className="boton">Agregar Al Carrito </Button>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
  
  export default PaginaProducto;
