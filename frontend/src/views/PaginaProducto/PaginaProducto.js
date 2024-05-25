import React from "react";
import './PaginaProducto.css'; // Asegúrate de importar tu archivo de estilos CSS
import sana from './../../img/sana.jpg';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function PaginaProducto() {
    return (
      <>
        <div className="main">
          <div className="sidebar">
            <nav className="sidebar__nav">
              <h4>Categoría</h4>
              <ul className="category-list">
                <li><a href="#" className="category-item">Seguridad</a></li>
                <li><a href="#" className="category-item">Herramientas</a></li>
              </ul>
              <h4>Precio</h4>
              <ul className="price-list">
                <li><a href="#" className="price-item">Mayor a Menor</a></li>
                <li><a href="#" className="price-item">Menor a Mayor</a></li>
              </ul>
              <h4>Material</h4>
              <ul className="material-list">
                <li><a href="#" className="material-item">Madera</a></li>
                <li><a href="#" className="material-item">Metal</a></li>
                <li><a href="#" className="material-item">Plástico</a></li>
              </ul>
            </nav>
          </div>
          
          <div className="contenido">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="search-input"
              />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="productos">
              {[...Array(12)].map((_, idx) => (
                <Card className="custom-card" key={idx} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={sana} />
                  <Card.Body>
                    <Card.Title><h2>Titulo aquí</h2></Card.Title> 
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>$150.990</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button className="boton">Agregar Al Carrito</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>

          <div className="aside">
            <h4>Acciones</h4>
            <ul className="aside-menu">
              <li><a href="#">Ver tu carro</a></li>
              <li><a href="#">Ver mis compras</a></li>
              <li><a href="#">Iniciar sesión</a></li>
              <li><a href="#">Tarjetas y cuentas</a></li>
            </ul>
          </div>
        </div>
      </>
    );
}

export default PaginaProducto;
