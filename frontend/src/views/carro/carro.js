import React, { useState, useEffect } from "react";
import "./carro.css";
import Sidebar1 from "../../components/sidebar/sidebar";
import BannerCom from "../../components/banner/bannerCom";
import Footer from "../../components/footer/footer";
import Button from "react-bootstrap/Button";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FaOpencart } from "react-icons/fa";
import BasicBreadcrumbs from "../../components/productos/breadcrums";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const itemsPerPage = 5;

function Carro() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const userId = localStorage.getItem("user");
    try {
      const response = await axios.get(
        `http://localhost:3001/api/carrito/${userId}`
      );
      if (!response.data) {
        setProducts([]);
      } else {
        const pros = response.data;
        const lpro = await Promise.all(
          pros.map(async (p) => {
            const pdata = await axios.get(
              `http://localhost:3001/api/productos/${p.idProducto}`
            );
            const tp = await axios.get(
              `http://localhost:3001/api/tipo-productos/${pdata.data.idTipoProducto}`
            );
            return {
              idProducto: p.idProducto,
              idCarrito: p.idCarrito,
              precio: pdata.data.precioProducto,
              descripcion: pdata.data.descripcion,
              cantidad: p.cantidadProducto,
              tipo: tp.data.nombreTipo,
              nombre: pdata.data.nombreProducto,
              urlProducto: pdata.data.urlProducto,
            };
          })
        );
        setProducts(lpro);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user");

    if (!userId) {
      navigate("/login");
      return;
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const eliminarProducto = async (idProducto) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/carrito`,
        {
          data: {
            idUsuario: localStorage.getItem("user"),
            producto: idProducto,
          },
        }
      );
      if (!response.data.error) {
        fetchProducts();
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <ParallaxProvider>
  <div className="contcar">
    <header>
      <Sidebar1 />
      <BannerCom />
    </header>
    <main className="maincart">
      <Parallax
        easing="easeInQuad"
        speed={-6}
        style={{
          aspectRatio: "2 / 1",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "darken",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <AppBar className="toolbarcarro" position="static" color="primary">
          <Toolbar variant="dense">
            <Typography variant="h4" color="inherit" component="div">
              <FaOpencart />| Carro de compras
            </Typography>
          </Toolbar>
          <div className="basicdivbread">
            <BasicBreadcrumbs />
          </div>
        </AppBar>
        {products.length !== 0 ? (
          <table className="table align-middle mb-0 bg-white tablacarro">
            <thead className="bg-light">
              <tr>
                <th>Nombre</th>
                <th>Tipo de Producto</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`http://localhost:3001/images/${product.urlProducto}`}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{product.nombre}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{product.tipo}</p>
                  </td>
                  <td>
                    <p>{product.descripcion}</p>
                  </td>
                  <td>
                    <div className="counter">
                      <button
                        onClick={() =>
                          navigate(`/detalleproducto/${product.idProducto}`)
                        }
                      >
                        -
                      </button>
                      <span>{product.cantidad}</span>
                      <button
                        onClick={() =>
                          navigate(`/detalleproducto/${product.idProducto}`)
                        }
                      >
                        +
                      </button>
                    </div>
                    <FontAwesomeIcon
                      className="ms-3 trashBtn"
                      icon={faTrash}
                      onClick={() => eliminarProducto(product.idProducto)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link btn-sm btn-rounded"
                    >
                      <p>
                        {product.precio.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                      </p>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-cart-message">
            <p>¡El carrito está vacío!</p>
          </div>
        )}
        <Pagination className="pagination-controlsdetalle">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
          />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
        <div className="button-container">
          <Link to="/checkout" className="btnpagar">
            <Button variant="success" size="lg">
              Pagar
            </Button>
          </Link>
        </div>
      </Parallax>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</ParallaxProvider>

  );
}

export default Carro;
