import React from "react";
import "./../ayuda/ayuda.css";
import Footer from "./../../components/footer/footer";
import banner2 from "./../../assets/img/FerremasLogoWhite.jpg";
import logo from "./../../img/logo.png";
import BannerCom2 from "../../components/banner/bannerCom2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Sidebar1 from "../../components/sidebar/sidebar";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { FaShoppingCart } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import { BsCartXFill } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Ayuda = () => {
  return (
    <ParallaxProvider>
      <div className="container-fluid contayuda">
        {" "}
        {/* Wrap content in a container */}
        <Sidebar1 />
        <BannerCom2 imagen={banner2} />
        <div className="row">
          {" "}
          {/* Use Bootstrap row */}
          <div className="col">
            {" "}
            {/* Adjust column width as needed */}
            <main>
              <Parallax easing="easeInQuad" speed={-8}>
                <div className="container-fluid ">
                  <div className="">
                    <div className="">
                      <div className="card  cartasayuda">
                        <div className="card-body">
                          <h1 className="card-title">Compras</h1>
                          <h4 className="card-text">
                            <FaShoppingCart className="iconayuda" />
                            Administrar y Cancelar Compras
                          </h4>
                          
                          <Divider
                            orientation="horizontal"
                            flexItem
                            className="dividerayuda"
                          />
                          <h4 className="card-text">
                            <BsCartXFill className="iconayuda" />
                            Devoluciones Y Reembolsos
                          </h4>
                        
                          <Divider
                            orientation="horizontal"
                            flexItem
                            className="dividerayuda"
                          />
                          <h4 className="card-text">
                            <FaQuestionCircle className="iconayuda" />
                            Preguntas Frecuentes
                          </h4>
                          <div className="divacordion">
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography className="titulotipografia1"><strong>¿Cuáles son sus horas de operación?</strong></Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="tipografia1">
                                Nuestro horario de atención es de lunes a viernes de 8:00 a.m. a 6:00 p.m. y los sábados de 9:00 a.m. a 1:00 p.m.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"> 
                                <Typography className="titulotipografia1"><strong>¿Ofrecen entregas a domicilio?</strong></Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="tipografia1">
                                Sí, ofrecemos entregas a domicilio dentro de un radio de 10 kilómetros. Consulta con nuestro equipo para más detalles y costos de envío.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography className="titulotipografia1"><strong>¿Cuál es su política de devolución?</strong></Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="tipografia1">
                                Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre y cuando los productos estén en su estado original y se presenten con el recibo de compra. Algunos artículos pueden estar sujetos a políticas de devolución específicas, así que asegúrate de preguntar al momento de la compra.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography className="titulotipografia1"><strong>¿Tienen descuentos para contratistas o compras al por mayor?</strong></Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="tipografia1">
                                Sí, ofrecemos descuentos especiales para contratistas y compras al por mayor. Por favor, contacta a nuestro equipo de ventas para obtener más información sobre nuestras tarifas especiales y cómo registrarte.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography className="titulotipografia1"><strong>¿Pueden ayudarme a encontrar un producto específico?</strong></Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className="tipografia1">
                                Absolutamente. Nuestro personal está altamente capacitado y estará encantado de ayudarte a encontrar el producto que necesitas. Si no lo tenemos en stock, haremos todo lo posible por conseguirlo para ti.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                          <hr></hr>
                        </div>
                      </div>
                    </div>
                    {/* Separar estos cuadrados de aqui*/}
                    <div className="">
                      <div className="card cartasayuda">
                        <div className="card-body">
                          <h1 className="card-title">Ayuda Sobre Tu Cuenta</h1>
                          <h4 className="card-text">
                            <FaUserCircle className="iconayuda" />
                            Configuracion De Mi Cuenta
                          </h4>
                          <p></p>
                          <Divider
                            orientation="horizontal"
                            flexItem
                            className="dividerayuda"
                          />
                          <h4 className="card-text">
                            <FaUserShield className="iconayuda" />
                            Seguridad
                          </h4>
                          <p></p>
                          <hr></hr>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Ayuda;
