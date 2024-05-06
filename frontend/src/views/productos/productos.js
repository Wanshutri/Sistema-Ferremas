import React from "react";
import LeftMenu from "../../components/leftMenu/leftMenu";
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom";
import logo from "./../../img/logo.png"
import './productos.css';
import CardsProductos from "../../components/cards/productoscards";
import bob from "./../../img/bob.jpg"
import martillo from "./../../assets/img/martillo.jpg"

const Productos = () => {
    return (
        <div className="container-fluid"> {/* Wrap content in a container */}
            <LeftMenu />
            <div className="row"> {/* Use Bootstrap row */}
                <div className="col"> {/* Adjust column width as needed */}
                    <header>
                        <BannerCom />
                    </header>
                    <main>
                        <div className="container-fluid">
                            <div class="container text-center">
                                <div class="row">
                                    <div class="col">
                                        < CardsProductos imagen={martillo} />
                                    </div>
                                    <div class="col">
                                        <CardsProductos imagen={martillo} />
                                    </div>
                                    <div class="col">
                                        <CardsProductos imagen={martillo} />
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

export default Productos;
