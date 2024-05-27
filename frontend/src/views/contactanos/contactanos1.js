import React from "react";
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom";
import logo from "./../../img/logo.png";
import ModalContactanos from "../../components/modalContactanos/modalcontact";
import "./contactanos.css";
import Sidebar1 from "../../components/sidebar/sidebar";
import JustifiedTab from "../../components/tabs/tabs";
import {
  Parallax,
  ParallaxProvider,
  ParallaxBannerLayer,
  ParallaxBanner,
} from "react-scroll-parallax";
import fondo from "../../assets/img/ferreteriabricolaje.jpg";
import Formulario from "../../components/formcontact/formContact";
import FloatCarrito from "../../components/FloatCarrito/FloatCarrito";

const Contactanos = () => {
  return (
    <ParallaxProvider>
      <div className="container-fluid contactanostodo">
        {" "}
        {/* Wrap content in a container */}
        <div className="row">
          {" "}
          {/* Use Bootstrap row */}
          <div className="col">
            {" "}
            {/* Adjust column width as needed */}
            <header>
              <FloatCarrito />
              <Sidebar1 />
              <BannerCom />
            </header>
            <main>
              <Parallax
                easing="easeInQuad"
                speed={-7}
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
                          <h5 className="card-tittle">¡Hablemos! Estamos ansiosos por escucharte</h5>
                          <p className="card-text">
                            En Ferremas, tu opinión es crucial para nosotros. 
                            Valoramos tus comentarios y estamos comprometidos a mejorar continuamente 
                            para satisfacer tus necesidades. Si tienes alguna pregunta, sugerencia o problema, 
                            no dudes en ponerte en contacto con nosotros.
                          </p>
                          <p className="card-text">
                            Por eso, te invitamos a que nos contactes a través de nuestro formulario de contacto a continuación. 
                            Ya sea para compartir tus comentarios, hacernos preguntas o informarnos sobre cualquier problema que puedas enfrentar, 
                            estamos aquí para escucharte y trabajar contigo para encontrar soluciones. Estamos aquí para ayudarte y asegurarnos de que tengas la mejor experiencia 
                            posible con nuestros productos y servicios. ¡Gracias por confiar en nosotros como tu proveedor 
                            de insumos de ferretería de confianza!
                          </p>
                          <hr></hr>

                          <div className="comentarioscontact">
                            <label for="floatingTextarea2">Comentarios</label>
                          </div>
                        </div>

                        <div className="modalcont">
                          <ModalContactanos></ModalContactanos>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6 mt-4">
                      <div className="card cartasdet">
                        <div className="card-body">
                          <h5 className="card-title">
                            Ingresa los campos solicitados por favor, con gusto
                            te ayudaremos!
                          </h5>
                          <Formulario />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Parallax>
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default Contactanos;
