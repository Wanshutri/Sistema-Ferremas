import React from "react";
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom"
import logo from "./../../img/logo.png"
import ModalContactanos from "../../components/modalContactanos/modalcontact";
import './contactanos.css'
import Sidebar1 from "../../components/sidebar/sidebar";
import JustifiedTab from "../../components/tabs/tabs";
import { Parallax, ParallaxProvider, ParallaxBannerLayer, ParallaxBanner } from "react-scroll-parallax";
import fondo from '../../assets/img/ferreteriabricolaje.jpg'
import Formulario from "../../components/formcontact/formContact";


const Contactanos = () => {
    return (
        <ParallaxProvider>

            <div className="container-fluid"> {/* Wrap content in a container */}
                <div className="row"> {/* Use Bootstrap row */}
                    <div className="col"> {/* Adjust column width as needed */}
                        <header>
                            <Sidebar1 />
                            <BannerCom />
                        </header>
                        <main>
                            <Parallax easing='easeInQuad' speed={-5} style={{ aspectRatio: '2 / 1', backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'darken', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                                <div className="container-fluid">
                                    <div class="row">

                                        <div class="col-sm-6 mb-3 mb-sm-0 mt-4">

                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">Special title treatment</h5>
                                                    <p class="card-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                                        id est laborum."</p>
                                                    <p class="card-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                                        id est laborum."</p>
                                                    <hr></hr>

                                                    <div class="form">
                                                        <label for="floatingTextarea2">Comentarios</label>
                                                    </div>
                                                </div>

                                                <div className="modalcont">
                                                    <ModalContactanos></ModalContactanos>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-6 mt-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">Ingresa los campos solicitados por favor, con gusto te ayudaremos!</h5>
                                                    <Formulario />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </Parallax>
                        </main>
                        <footer>
                            <Footer  />
                        </footer>
                    </div>
                </div>
            </div>

        </ParallaxProvider>
    )
}

export default Contactanos;
