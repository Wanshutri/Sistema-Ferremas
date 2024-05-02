import React from "react";
import './../sobrenosotros/sobrenosotros.css'
import Footer from "./../../components/footer/footer"
import Leftmenu from "./../../components/leftMenu/leftMenu";
import logo from "./../../img/logo.png";
import BannerCom from "../../components/banner/bannerCom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'



const Sobrenosotros = () => {
    return (
        <div>
            <header>
                <BannerCom />
            </header>
            <main class="cuadro-informacion">
                <div class="LeftInformacion">
                    <div><h1> Sobre Nosotros</h1>
                        <p>
                            ¡Bienvenido a Ferretería Ferremas!
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
                            ¡Únete a nuestra familia de clientes satisfechos hoy mismo y descubre la diferencia que hace Ferretería Ferremas!
                        </p>
                    </div>
                </div>
                <div class="rightInformacion">
                    <div><h1>Ubicacion</h1><FontAwesomeIcon icon = {faBell}></FontAwesomeIcon>
                        <p>
                            Estamos ubicados en la dirección de Duoc UC, donde el CITT presenciaba el auge del apartado de RPA.
                            Felipe Nicolás Andrade Vargas, mientras tanto, está profundamente inmerso en los desafíos de Bajos de Mena."
                        </p>
                    </div>
                    <div><h1>Horario</h1>
                        <p>
                            La hora secreta de apertura es como el mejor chiste que guardamos para nosotros mismos.
                            ¿Por qué no vienes los jueves? No tan tarde, ¡porque los viernes ya estamos de fiesta! 😉
                        </p>
                    </div>
                    <div><h1>Mensajes</h1>
                        <p>
                            Si necesitas contactarme, ¡búscame en el futer! No te preocupes, no es un error tipográfico,
                            ¡es solo una forma divertida de decir 'pie de página'! 😄 (ChatGPT es entero fome pa' recitar weas)
                        </p>
                    </div>
                </div>
            </main>
            <div>
                <Leftmenu / >
            </div>
            <footer>
                <Footer logoSrc={logo} / >
            </footer>
        </div>
        
    )
}

export default Sobrenosotros;
