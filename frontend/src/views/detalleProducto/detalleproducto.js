import React from "react";
import "./../ayuda/ayuda.css";
import SearchAppBar from "./../../components/productos/barraproducto";
import Footer from "./../../components/footer/footer";
import banner2 from "./../../assets/img/FerremasLogoWhite.jpg";
import logo from "./../../img/logo.png";
import BannerCom2 from "../../components/banner/bannerCom2";
import Imagenesproductos from "../../components/imagenesProductos/imagenesproductos";
import "./detalleProducto.css"
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
import BasicBreadcrumbs from "../../components/productos/breadcrums";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faTruckMoving } from "@fortawesome/free-solid-svg-icons";
import { faCubesStacked } from "@fortawesome/free-solid-svg-icons";

function HalfRating() {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
        </Stack>
    );
}


function FloatingActionButtonSize() {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color="secondary" aria-label="add">
            <FontAwesomeIcon icon={faTruckMoving} />
            </Fab>
            <Fab color="secondary" aria-label="add">
                <FontAwesomeIcon icon={faBox} />
            </Fab>
            <Fab color="secondary" aria-label="add">
            <FontAwesomeIcon icon={faCubesStacked} />
            </Fab>
        </Box>
    );
}




const DetalleProducto = () => {
    return (
        <ParallaxProvider>

            <div className="container-fluid contayuda">
                {" "}
                {/* Wrap content in a container */}
                <Sidebar1 />
                <SearchAppBar />
                <div className="basicdivbread">
                    <BasicBreadcrumbs />
                </div>
                <div className="row">
                    {" "}
                    {/* Use Bootstrap row */}
                    <div class="col">

                        {" "}
                        {/* Adjust column width as needed */}
                        <main>
                            <Parallax easing='easeInQuad' speed={0} style={{ aspectRatio: '2 / 1', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'darken', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                                <div className="container-fluid">
                                    <div class="row">

                                        <div class="col-sm-6 mb-3 mb-sm-0 mt-4">

                                            <div class="card">
                                                <div class="card-body">
                                                    <Imagenesproductos />

                                                    <div class="form">
                                                        <label for="floatingTextarea2"><FontAwesomeIcon icon={faHeadset} size="lg" className="iconoayuda1" />
                                                            ¿Necesitas ayuda? Llámanos al
                                                            6000880070</label>
                                                    </div>
                                                </div>

                                                <div className="modalcont">

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-6 mt-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h1>Marca</h1>
                                                    <h5 class="card-title">Taladro inalámbrico percutor 10 mm 12V + 2 baterías + 101 accesorios</h5>
                                                </div>
                                                <HalfRating />
                                                <h4>Vendido por Ferremas</h4>
                                                <div>
                                                    <div>
                                                        <FloatingActionButtonSize />

                                                    </div>

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

export default DetalleProducto;
