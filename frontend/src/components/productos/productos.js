import React from "react";
import './productos.css';
import CardsProductos from "../cards/productoscards";
import bob from "./../../img/bob.jpg"
import martillo from "./../../assets/img/martillo.jpg"
import logo from "./../../img/logo.png"


const Productos = () => {
    return (
        <><div className="search-div d-flex mb-5">
            <img className="logo-img" src={logo} alt="Logo"></img>
            <div className="d-flex form-div">
                <button className="btn border-0 shadow-none btnsearch" type="submit">
                    <svg fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
                <input className="" type="search" placeholder="Buscar" aria-label="Search" />
            </div>
        </div><div className="container-fluid">
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <CardsProductos imagen={martillo} />
                        </div>
                        <div class="col">
                            <CardsProductos imagen={martillo} />
                        </div>
                        <div class="col">
                            <CardsProductos imagen={martillo} />
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Productos;
