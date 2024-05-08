import React from "react";
import './../sobrenosotros/sobrenosotros.css'
import Footer from "./../../components/footer/footer"
import logo from "./../../img/logo.png";
import BannerCom from "../../components/banner/bannerCom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import Sidebar1 from "../../components/sidebar/sidebar";



const Sobrenosotros = () => {
    return (
        <div className="container-fluid"> {/* Wrap content in a container */}
            <div className="row"> {/* Use Bootstrap row */}
                <div className="col"> {/* Adjust column width as needed */}
                    <header>
                        <Sidebar1 />
                        <BannerCom />
                    </header>
                    <main>
                        <div className="container-fluid">
                            <div class="row">
                                <div class="col-sm-6 mb-3 mb-sm-0 mt-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <h1 class="card-title">Sobre Nosotros</h1>
                                            <p class="card-text">"¡Bienvenido a Ferretería Ferremas!
                                                Somos una tienda comprometida con la excelencia en el suministro de productos para todas tus necesidades de construcción,
                                                reparación y mantenimiento. Con una experiencia de más de [número] años en la industria, nos enorgullece ofrecerte una amplia gama de herramientas y materiales de la más alta calidad.
                                                En Ferretería Ferremas, nuestra misión es proporcionarte los mejores productos y servicios para que puedas llevar a cabo tus proyectos con confianza y éxito.
                                                Nos esforzamos por ser tu socio confiable en cada paso del camino, desde la selección de productos hasta la entrega y el servicio postventa.
                                                Lo que nos distingue es nuestro compromiso con la satisfacción del cliente.
                                                Nuestro equipo altamente capacitado está aquí para asesorarte y ayudarte a encontrar exactamente lo que necesitas,
                                                ya sea que seas un profesional experimentado o un entusiasta del bricolaje.
                                                Además, colaboramos con los principales fabricantes y proveedores para garantizar que siempre tengas acceso a las últimas innovaciones y las mejores marcas del mercado.
                                                En Ferretería Ferremas, no solo nos preocupamos por tus proyectos, sino también por nuestra comunidad y nuestro medio ambiente.
                                                Nos esforzamos por operar de manera sostenible y ética, minimizando nuestro impacto ambiental y apoyando iniciativas locales.
                                                ¡Gracias por elegir Ferretería Ferremas como tu destino de confianza para todas tus necesidades de ferretería y construcción!
                                                Esperamos poder servirte y ayudarte a hacer realidad tus proyectos, grandes o pequeños.
                                                ¡Únete a nuestra familia de clientes satisfechos hoy mismo y descubre la diferencia que hace Ferretería Ferremas!"
                                            </p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 mt-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <h1 class="card-title">Mas Informacion De Nosotros!</h1>
                                            <h5>Nuestra Ubicacion</h5>
                                            <p class="card-text">
                                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                                id est laborum."
                                            </p>
                                            <h5>Horarios</h5>
                                            <p class="card-text">
                                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                                id est laborum."
                                            </p>
                                            <h5>Puedes Hablar Con Nuestro Personal</h5>
                                            <p class="card-text">
                                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                                id est laborum."
                                            </p>
                                            <hr></hr> 
                                    
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                    <footer>
                        <Footer logoSrc={logo} />
                    </footer>
                </div>
            </div>
        </div>
        
    )
}

export default Sobrenosotros;
