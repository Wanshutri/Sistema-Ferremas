import React from "react";
import './../ayuda/ayuda.css'
import Footer from "./../../components/footer/footer"
import Leftmenu from "./../../components/leftMenu/leftMenu";
import logo from "./../../img/logo.png";
import BannerCom from "../../components/banner/bannerCom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'

const Ayuda = () => {
    return (
        <div>
            
            <main class="">
                <ul>
                    <div class="ayudaCompras">
                        <h1>Compras</h1>
                        <li>
                            <div><h4>Administrar y cancelar compras</h4></div>
                            <p>texto aqui</p>
                        </li>
                        <li>
                            <div><h4>Devoluciones y reembolsos</h4></div>
                            <p>texto aqui</p>
                        </li>
                        <li>
                            <div><h4>Preguntas Frecuentes</h4></div>
                            <p>texto aqui</p>
                        </li>   
                    </div>
                    <div class="ayudaCuenta">
                        <h1>Ayuda Sobre tu cuenta</h1>
                        <li>
                            <div><h4>Configuracion de mi cuenta</h4></div>
                            <p>texto aqui</p>
                        </li>
                        <li>
                            <div><h4>Seguridad</h4></div>
                            <p>texto aqui</p>
                        </li>  
                    </div>
                </ul>

            </main>
            <footer>
                <Footer logoSrc={logo}/> 
            </footer>

        </div>
    )
}

export default Ayuda;