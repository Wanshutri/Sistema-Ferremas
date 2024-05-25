import React, { useState } from "react";
import "./carro.css";
import sana from "./../../img/sana.jpg";
import escalera from "./../../assets/img/escalerita.jpg";
import Sidebar1 from "../../components/sidebar/sidebar";
import BannerCom from "../../components/banner/bannerCom";
import Footer from "../../components/footer/footer";
import Button from "react-bootstrap/Button";
import fondo from "../../assets/img/ferreteriabricolaje.jpg";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FaOpencart } from "react-icons/fa";
import BasicBreadcrumbs from "../../components/productos/breadcrums";
import Pagination from "react-bootstrap/Pagination";

const products = [
  // Aquí pones tu lista de productos
  { id: 1, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 2, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 3, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 4, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 5, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 6, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 7, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 8, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 9, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 10, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
  { id: 11, name: "Ferreteria y construccion", model: "Escalera de acero", country: "Santiago", price: 900000 },
];

const itemsPerPage = 5;

function Carro() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={escalera}
                          alt=""
                          style={{ width: "100px", height: "100px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{product.model}</p>
                          <p className="text-muted mb-0"></p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{product.name}</p>
                      <p className="text-muted mb-0">{product.country}</p>
                    </td>
                    <td>
                      <p>Escalera de acero 4 peldaños alto 1.33 m Resistencia 150 kg</p>
                    </td>
                    <td>
                      <div className="counter">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                      >
                        <p>${product.price}</p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <Button className="btnpagar" variant="success" size="lg">
                Pagar
              </Button>
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
