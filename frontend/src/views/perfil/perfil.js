import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Divider from "@mui/material/Divider";
import "./perfil.css";
import Sidebar1 from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom";
import Card from "react-bootstrap/Card";
import sana from "./../../img/sana.jpg";
import Container from "react-bootstrap/Container";
import { RiFileUploadFill } from "react-icons/ri";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Chip from "@mui/material/Chip";
import { AuthContext } from "./../../js/AuthContext"; // Importa el contexto de autenticación
import ListGroup from 'react-bootstrap/ListGroup';

function Perfil() {
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { authState } = useContext(AuthContext); // Usa el contexto de autenticación
  const navigate = useNavigate(); // Usa useNavigate para redirigir
  const itemsPerPage = 5;

  useEffect(() => {
    // Redirige a la página de login si el usuario no está autenticado
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      // Llamada a la API para obtener los pedidos del usuario
      const fetchPedidos = async () => {
        try {
          const userId = authState.usuario.idUsuario; // Asegúrate de tener la lógica para obtener el ID del usuario actual
          const response = await fetch(`http://localhost:3001/api/deposito-usuario/${userId}`);
          if (!response.ok) {
            throw new Error("Error al obtener los datos");
          }
          const data = await response.json();
          setPedidos(data);
        } catch (error) {}
      };
      fetchPedidos();
    }
  }, [authState.isAuthenticated, navigate]); // Agrega navigate a las dependencias

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Lógica para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pedidos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pedidos.length / itemsPerPage);

  // No renderiza nada si no está autenticado
  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <>
      <div className="backperf">
        <ParallaxProvider>
          <header>
            <Sidebar1 />
            <BannerCom />
          </header>
          <main>
            <Parallax easing="easeInQuad" speed={-8}>
              <div className="todoperfil">
                <Parallax easing="easeInQuad" speed={-0.5}>
                  <Container>
                    <Row>
                      <Col>
                        <div className="boletin">
                          <Card
                            style={{ width: "20rem", marginLeft: "2%" }}
                            className="cartasperfil"
                          >
                            <Card.Img
                              variant="top"
                              src={sana}
                              style={{ width: "20rem", height: "20rem" }}
                            />
                            <Card.Body>
                              <Divider>
                                <Chip
                                  label="Nombre"
                                  size="small"
                                  className="chipperfil"
                                />
                              </Divider>
                              <Card.Title>
                                <h1>Bienvenido (nombre de usuario)</h1>
                              </Card.Title>
                              <Divider>
                                <Chip
                                  label="Acerca de mi"
                                  size="small"
                                  className="chipperfil"
                                />
                              </Divider>
                                  <ListGroup variant="flush">
                                  <ListGroup.Item>Nombre Completo:(usuario)</ListGroup.Item>
                                  <ListGroup.Item>Email:(email usu)</ListGroup.Item>
                                  <ListGroup.Item>Dirección:(Dirección usu)</ListGroup.Item>
                                  <ListGroup.Item>Celular:(+569... usu)</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            <Card.Body className="d-flex justify-content-center"></Card.Body>
                          </Card>
                        </div>
                      </Col>
                      <Col>
                        <Card
                          style={{ marginTop: "2rem", width: "50rem" }}
                          className="cartasperfil"
                        >
                          <Card.Header className="headerpedido">
                            Lista de Pedidos
                          </Card.Header>
                          <Card.Body>
                            {currentItems.length === 0 ? (
                              <p>No hay pedidos disponibles.</p>
                            ) : (
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Usuario</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>ID Producto</th>
                                    <th>Boleta</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentItems.map((pedido) => (
                                    <tr key={pedido.id}>
                                      <td>{pedido.id}</td>
                                      <td>{pedido.usuario}</td>
                                      <td>{pedido.precio}</td>
                                      <td>{pedido.cantidad}</td>
                                      <td>{pedido.productoId}</td>
                                      <td>
                                        <Button
                                          variant="success"
                                          size="sm"
                                          className="botonBoleta"
                                        >
                                          Comprobante{" "}
                                          <RiFileUploadFill className="iconperfil" />
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            )}
                            <Pagination className="d-flex justify-content-center">
                              <Pagination.First
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                              />
                              <Pagination.Prev
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                              />
                              {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                  key={index + 1}
                                  active={index + 1 === currentPage}
                                  onClick={() => handlePageChange(index + 1)}
                                >
                                  {index + 1}
                                </Pagination.Item>
                              ))}
                              <Pagination.Next
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                              />
                              <Pagination.Last
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                              />
                            </Pagination>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </Parallax>
              </div>
            </Parallax>
          </main>
          <footer>
            <Footer />
          </footer>
        </ParallaxProvider>
      </div>
    </>
  );
}

export default Perfil;
