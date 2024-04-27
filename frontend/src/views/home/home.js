import React, { Component } from 'react';
import NavBar from "../../components/navBar/navBar";
import './home.css'
import banner from './../../assets/img/banner.png'
import logo from './../../assets/img/logo.png'
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import LeftMenu from '../../components/leftMenu/leftMenu';

class Home extends Component {

    constructor(props) {
        super(props);
        this.moveNextPanel = this.moveNextPanel.bind(this);
        this.movePrevPanel = this.movePrevPanel.bind(this);
    }

    moveNextPanel() {
        try {
            const index = this.flicking.index;
            const panelCount = this.flicking.panels.length;

            if (!this.flicking.animating) {
                this.flicking.disableInput()
                if (index === panelCount - 1) {
                    this.flicking.moveTo(0);
                } else {
                    this.flicking.next();
                }
                setTimeout(() => {
                    this.flicking.enableInput();
                }, 700);
            }

        } catch (error) {
            console.log(error);
        }
    }


    movePrevPanel() {
        try {
            const index = this.flicking.index;
            const panelCount = this.flicking.panels.length;

            if (!this.flicking.animating) {
                this.flicking.disableInput()
                if (index === 0) {
                    this.flicking.moveTo(panelCount - 1);
                } else {
                    this.flicking.prev();
                }
                setTimeout(() => {
                    this.flicking.enableInput();
                }, 700);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const cardData = Array.from({ length: 15 }, (_, index) => ({
            id: index,
            title: `Título ${index}`,
            text: 'With supporting text below as a natural lead-in to additional content.',
        }));

        const panelCount = 5; // Cantidad total de paneles
        const middleIndex = Math.floor(panelCount / 2);

        return (
            <div>
                <LeftMenu></LeftMenu>
                <header>
                    <img className="banner" src={banner} alt="Banner"></img>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav ms-auto">
                                    <h4 className="nav-link mt-2">Herramientas manuales</h4>
                                    <h4 className="nav-link mt-2">Materiales básicos</h4>
                                    <h4 className="nav-link mt-2">Equipo de seguridad</h4>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <div className="search-div d-flex">
                        <img className="logo-img" src={logo} alt="Logo"></img>
                        <div className="d-flex form-div">
                            <button className="btn border-0 shadow-none" type="submit">
                                <svg fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                            <input className="" type="search" placeholder="Buscar" aria-label="Search" />
                        </div>
                    </div>
                    <div className="my-flicking-container d-flex mt-5">
                        <svg onClick={this.movePrevPanel} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-left-square-fill flickArrow" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12" />
                        </svg>
                        <Flicking
                            circular={true}
                            defaultIndex={middleIndex}
                            preventClickOnDrag={true}
                            className="my-flicking"
                            ref={flicking => this.flicking = flicking}
                            onChange={this.handlePanelChange} // Agrega el evento onChange
                        >
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="card me-5">
                                    <img src={banner} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <button className='btn' style={{ backgroundColor: 'gainsboro' }}>asdasd</button>
                                        <button className='btn' style={{ backgroundColor: 'orange' }}>asdasd</button>
                                    </div>
                                </div>
                            ))}
                        </Flicking>
                        <svg onClick={this.moveNextPanel} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-caret-right-square-fill flickArrow" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4z" />
                        </svg>
                    </div>
                    <div className="d-flex mt-5">
                        <div className="container">
                            <div className="card-container">
                                {cardData.map((card, index) => (
                                    <div key={card.id} className="card">
                                        <div className="card-header text-center">Categorias</div>
                                        <div className="card-body d-grid">
                                            <div>
                                                <img className="card-body-img" src={banner} alt="Imagen" />
                                            </div>
                                            <div className="ms-2">
                                                <h5 className="card-title">{card.title}</h5>
                                                <p className="card-text">{card.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <footer>
                    <div>

                    </div>
                </footer>
            </div >
        );
    }
}

export default Home;
