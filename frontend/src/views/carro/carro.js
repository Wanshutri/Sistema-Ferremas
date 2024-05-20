import React from "react";
import "./carro.css";
import sana from "./../../img/sana.jpg";
import Sidebar1 from "../../components/sidebar/sidebar";
import BannerCom from "../../components/banner/bannerCom";
import Footer from "../../components/footer/footer";
import Button from "react-bootstrap/esm/Button";
import fondo from "../../assets/img/ferreteriabricolaje.jpg";
import {
  Parallax,
  ParallaxProvider,
  ParallaxBannerLayer,
  ParallaxBanner,
} from "react-scroll-parallax";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FaOpencart } from "react-icons/fa";

function Carro() {
  return (
    <ParallaxProvider>
      <div className="contlog">
        <header>
          <Sidebar1 />
          <BannerCom />
        </header>
        <main className="contlog">
          <Parallax
            easing="easeInQuad"
            speed={-3}
            style={{
              aspectRatio: "2 / 1",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "darken",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <AppBar position="static" color="warning">
              <Toolbar variant="dense">
                <Typography variant="h4" color="inherit" component="div">
                  <FaOpencart />| Carro de compras
                </Typography>
              </Toolbar>
            </AppBar>
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>producto</th>
                  <th>Nombre</th>
                  <th>Modelo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={sana}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Minatozaki Sana</p>
                        <p className="text-muted mb-0"></p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Cuerpo inflable de idol</p>
                    <p className="text-muted mb-0">Corea del Sur</p>
                  </td>
                  <td>
                    <span className="badge badge-success rounded-pill d-inline">
                      Active
                    </span>
                    <p>Quiero saber!</p>
                    <p>Pulsaciones de vagina con ritmo nivel cardio</p>
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
                      <p>$900.000</p>
                    </button>
                  </td>
                </tr>
                {/* Manejar con JavaScript para que se repita todo el rato (No se javaScript xd)*/}
              </tbody>
              <thead className="bg-light">
                <tr>
                  <th>producto</th>
                  <th>Nombre</th>
                  <th>Modelo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={sana}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Minatozaki Sana</p>
                        <p className="text-muted mb-0"></p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Cuerpo inflable de idol</p>
                    <p className="text-muted mb-0">Corea del Sur</p>
                  </td>
                  <td>
                    <span className="badge badge-success rounded-pill d-inline">
                      Active
                    </span>
                    <p>Quiero saber!</p>
                    <p>Pulsaciones de vagina con ritmo nivel cardio</p>
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
                      <p>$900.000</p>
                    </button>
                  </td>
                </tr>
                {/* Repite esta estructura para cada producto en el carrito */}
              </tbody>
              <thead className="bg-light">
                <tr>
                  <th>producto</th>
                  <th>Nombre</th>
                  <th>Modelo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={sana}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Minatozaki Sana</p>
                        <p className="text-muted mb-0"></p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Cuerpo inflable de idol</p>
                    <p className="text-muted mb-0">Corea del Sur</p>
                  </td>
                  <td>
                    <span className="badge badge-success rounded-pill d-inline">
                      Active
                    </span>
                    <p>Quiero saber!</p>
                    <p>Pulsaciones de vagina con ritmo nivel cardio</p>
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
                      <p>$900.000</p>
                    </button>
                  </td>
                </tr>
                {/* Repite esta estructura para cada producto en el carrito */}
              </tbody>
            </table>
            <div className="button-container">
              <Button variant="success" size="lg">
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
