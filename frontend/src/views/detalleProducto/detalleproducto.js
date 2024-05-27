import React from "react";
import "./detalleProducto.css";
import SearchAppBar from "./../../components/productos/barraproducto";
import Footer from "./../../components/footer/footer";
import logo from "./../../img/logo.png";
import Imagenesproductos from "../../components/imagenesProductos/imagenesproductos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar1 from "../../components/sidebar/sidebar";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { Typography } from "@mui/material";
import BasicBreadcrumbs from "../../components/productos/breadcrums";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faTruckMoving } from "@fortawesome/free-solid-svg-icons";
import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Carousel3 from "../../components/carousel/carousel3";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import FloatCarrito from "../../components/FloatCarrito/FloatCarrito";

function ButtonSizes() {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div className="botonagregarcarro">
        <Button className="btnagregar" variant="contained" size="large">
          Agregar al carro
        </Button>
      </div>
    </Box>
  );
}

function HalfRating() {
  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        defaultValue={4.5}
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}

function FloatingActionButtonSize() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        "& > :not(style)": { m: 2 },
      }}
      className="boxdetalles"
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Fab className="botonesiconos" aria-label="add">
          <FontAwesomeIcon icon={faTruckMoving} />
        </Fab>
        <Typography variant="caption">Despacho a domicilio</Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Fab className="botonesiconos" aria-label="add">
          <FontAwesomeIcon icon={faBox} />
        </Fab>
        <Typography variant="caption">Retiro en tienda</Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Fab className="botonesiconos" aria-label="add">
          <FontAwesomeIcon icon={faCubesStacked} />
        </Fab>
        <Typography variant="caption">Revisar stock</Typography>
      </Box>
    </Box>
  );
}

const DetalleProducto = () => {
  return (
    <ParallaxProvider>
      <div className="container-fluid detalleMain">
        {" "}
        {/* Wrap content in a container */}
        <div>
          <FloatCarrito />
          <Sidebar1 />
          <SearchAppBar />
          <div className="basicdivbread">
            <BasicBreadcrumbs />
          </div>
        </div>
        <br></br>
        <div className="row">
          {" "}
          {/* Use Bootstrap row */}
          <div className="col">
            {" "}
            {/* Adjust column width as needed */}
            <main>
              <Parallax
                easing="easeInQuad"
                speed={-3}
                style={{
                  aspectRatio: "2 / 1",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundBlendMode: "darken",
                  backgroundColor: "rgba(120, 120, 120, 0.9)",
                  background:
                    "linear-gradient( rgba(255, 255, 255, 0.9) , rgba(70, 70, 70, 0.9))",
                  borderRadius: "5px",
                }}
              >
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0 mt-4">
                      <div className="card cartasdet">
                        <div className="card-body">
                          <div className="cardimagenes">
                            <Carousel3 />
                          </div>

                          <div className="form">
                            <label for="floatingTextarea2">
                              <FontAwesomeIcon
                                icon={faHeadset}
                                size="lg"
                                className="iconoayuda1"
                              />
                              ¿Necesitas ayuda? Llámanos al 6000880070
                            </label>
                          </div>
                          <div className="label2">
                            <label>
                              <FontAwesomeIcon
                                icon={faRotateLeft}
                                size="lg"
                                className="iconoayuda2"
                              />
                              Devuelve gratis por Derecho a retracto o
                              Satisfacción garantizada. Conoce los plazos y
                              exclusiones
                            </label>
                          </div>
                        </div>

                        <div className="modalcont"></div>
                      </div>
                    </div>
                    <div className="col-sm-6 mt-4 card2detalle">
                      <div className="card cartasdet2">
                        <div className="card-body ">
                          <Divider>
                            <Chip
                              label="Producto"
                              size="small"
                              className="chipdetalle"
                            />
                          </Divider>
                          <h1>Marca-RescatarBD</h1>
                          <Divider>
                            <Chip
                              label="Descripción"
                              size="small"
                              className="chipdetalle"
                            />
                          </Divider>
                          <br></br>
                          <p className="descripciondet">
                            Taladro inalámbrico percutor 10 mm 12V + 2 baterías
                            + 101 accesorios
                          </p>
                        </div>
                        <div className="clasificacion">
                          <HalfRating />
                          <div className="calificaproducto">
                            Califica este producto
                          </div>
                        </div>
                        <br></br>
                        <Divider>
                          <Chip
                            label="Distribuidor"
                            size="small"
                            className="chipdetalle"
                          />
                        </Divider>
                        <h5 className="vendidopor">Vendido por Ferremas</h5>
                        <div>
                          <div>
                            <FloatingActionButtonSize />
                          </div>
                          <Divider>
                            <Chip
                              label="Precio"
                              size="small"
                              className="chipdetalle"
                            />
                          </Divider>
                          <h1 className="preciodet">$15.000</h1>
                          <br></br>
                        </div>
                        <div className="contadorbtn">
                          <button className="botonresta">-</button>
                          <span>1</span>
                          <button className="botonsuma">+</button>
                        </div>
                        <ButtonSizes />
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
              </Parallax>
            </main>
            <footer>
              <Footer logoSrc={logo} />
            </footer>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default DetalleProducto;
