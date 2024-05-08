import React from "react";
import './../ayuda/ayuda.css'
import Footer from "./../../components/footer/footer"

import logo from "./../../img/logo.png";
import BannerCom from "../../components/banner/bannerCom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import Sidebar1 from "../../components/sidebar/sidebar";

const Ayuda = () => {
    return (
        <div className="container-fluid"> {/* Wrap content in a container */}
            <Sidebar1 />
            <div className="row"> {/* Use Bootstrap row */}
                <div className="col"> {/* Adjust column width as needed */}
                    <main>
                        <div className="container-fluid">
                            <div class="">
                                <div class="">
                                    <div class="card">
                                        <div class="card-body">
                                            <h1 class="card-title">Compras</h1>
                                            <h4 class="card-text">Administrar y Cancelar Compras</h4>
                                            <p>Agregar Texto Predeterminado Aqui</p>
                                            <h4 class="card-text">Devoluciones Y Reembolsos</h4>
                                            <p>Agregar Texto Predeterminado Aqui</p>
                                            <h4 class="card-text">Preguntas Frecuentes</h4>
                                            <p>Agregar Texto Predeterminado Aqui</p>
                                            <hr></hr>
                                        </div>

                                    </div>
                                </div>
                                {/* Separar estos cuadrados de aqui*/}
                                <div class="">
                                    <div class="card">
                                        <div class="card-body">
                                            <h1 class="card-title">Ayuda Sobre Tu Cuenta</h1>
                                            <h4 class="card-text">Configuracion De Mi Cuenta</h4>
                                            <p>Agregar Texto Predeterminado Aqui</p>
                                            <h4 class="card-text">Seguridad</h4>
                                            <p>Agregar Texto Predeterminado Aqui</p>
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

export default Ayuda;