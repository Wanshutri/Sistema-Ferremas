import './home.css'
import React from 'react';
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom"
import logo from "./../../img/logo.png"
import banner from "./../../img/banner.png"
import bob from "./../../img/bob.jpg"
import sucursales from "./../../img/sucursales.jpg"
import oferta from "./../../img/oferta.jpg"
import Carousel from "../../components/carousel/carousel"
import Cards from "../../components/cards/cards"
import Sidebar1 from '../../components/sidebar/sidebar';
import JustifiedTab from '../../components/tabs/tabs';
import Productos from '../../components/productos/productos';
import Pbanner from '../../components/parallax/parallaxbanner';
import fondo from '../../assets/img/ferreteriabricolaje.jpg'
import { ParallaxProvider, ParallaxBanner, ParallaxBannerLayer, Parallax } from 'react-scroll-parallax';
import Fade1 from '../../components/carousel/carousel2';
import herramientasb from '../../assets/img/bannerherramientas.jpg'
import ofertab from '../../assets/img/itembanner.png'
import Responsiveproduct from '../../components/productos/productoscarrusel';



const Home = () => {
    return (
        <ParallaxProvider>

            <div className="container-fluid"> {/* Wrap content in a container */}
                <div className="row"> {/* Use Bootstrap row */}
                    <div className="col p-0"> {/* Adjust column width as needed */}
                        <header>
                            <Sidebar1 />
                            <BannerCom />

                        </header>
                        <main>

                            <Parallax easing='easeInQuad' speed={-10} style={{ backgroundImage: `url(${fondo})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundBlendMode: 'darken', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                                <JustifiedTab extra={<><div className="search-div d-flex mb-5">
                                    <img className="logo-img" src={logo} alt="Logo"></img>
                                    <div className="d-flex form-div divsearch">
                                        <button className="btn border-0 shadow-none btnsearch" type="submit">
                                            <svg fill="currentColor" className="bi bi-search bise" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                            </svg>
                                        </button>
                                        <input className="searchinput" type="search" placeholder="Buscar" aria-label="Search" />
                                    </div>
                                </div><Fade1 image={sucursales} image2={herramientasb} image3={ofertab} image4={banner}/>
                                <Responsiveproduct />
                                    <div className="container text-center mt-5">
                                        <div className="row">
                                            <div className="col">
                                                <Cards imagen={bob} />
                                            </div>
                                            <div className="col">
                                                <Cards imagen={bob} />
                                            </div>
                                            <div className="col">
                                                <Cards imagen={bob} />
                                            </div>
                                        </div>
                                    </div></>
                                } extra2={<Productos />} />


                            </Parallax>

                        </main>
                        <footer>
                            <Footer />
                        </footer>
                    </div>
                </div>
            </div >
        </ParallaxProvider>

    )
}

export default Home;
