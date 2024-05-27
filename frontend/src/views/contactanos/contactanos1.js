import React from "react";
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom";
import ModalContactanos from "../../components/modalContactanos/modalcontact";
import "./contactanos.css";
import Sidebar1 from "../../components/sidebar/sidebar";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
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
                          <h5 className="card-title">
                            Special title treatment
                          </h5>
                          <p className="card-text">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum."
                          </p>
                          <p className="card-text">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum."
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
