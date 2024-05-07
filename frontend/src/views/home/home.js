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


const Home = () => {
    return (
        <div className="container-fluid"> {/* Wrap content in a container */}
            <div className="row"> {/* Use Bootstrap row */}
                <div className="col p-0"> {/* Adjust column width as needed */}
                    <header>
                        <Sidebar1 />
                        <BannerCom />
                    </header>
                    <main>
                        <div className="search-div d-flex mb-5">
                            <img className="logo-img" src={logo} alt="Logo"></img>
                            <div className="d-flex form-div">
                                <button className="btn border-0 shadow-none btnsearch" type="submit">
                                    <svg fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </button>
                                <input className="" type="search" placeholder="Buscar" aria-label="Search" />
                            </div>
                        </div>
                        <Carousel imagen1={bob} imagen2={sucursales} />
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

export default Home;
