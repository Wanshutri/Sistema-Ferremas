import './sidebar.css'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faToggleOff, faUsers, faCartShopping, faHouse, faLocationDot, faCircleQuestion, faReceipt, faHammer, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import logo from '../../img/logo.png';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


function Sidebar1({ onTabChange }) {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);





    return (
        <>


                <Button variant="Primary" className='sidebarbutton' onClick={handleShow}>
                    {show ? <FontAwesomeIcon icon={faBars} beat size="xl" style={{color: "#2951a0",}} /> : <FontAwesomeIcon icon={faBars}  beat size="xl" style={{color: "#2951a0",}} />}
                </Button>


            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img src={logo} class="logoFerremas" /></h5>
                        <button type="button" className="btn-close btn-close-white b2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button className="btn btn-primary b1" aria-current="page" href="#"><FontAwesomeIcon icon={faHouse} className='iconleftmenu' />Home</Button>

                    <Button className="btn btn-primary b1" aria-current="page" href="#"><FontAwesomeIcon icon={faUsers} className='iconleftmenu' />Sobre nosotros</Button>


                    <Button className="btn btn-primary b1" aria-current="page" href="#"><FontAwesomeIcon icon={faHammer} shake className='iconleftmenu' /> Productos </Button>


                    <Button className="btn btn-primary b1" aria-current="page" href="#"><FontAwesomeIcon icon={faLocationDot} className='iconleftmenu' />Ubicación</Button>

                    <Button className="btn btn-primary b1" aria-current="page" href="#"><FontAwesomeIcon icon={faCircleQuestion} className='iconleftmenu' />Ayuda</Button>


                    <Button className="btn btn-primary b1" href="#"><FontAwesomeIcon icon={faCartShopping} className='iconleftmenu' />Carrito</Button>

                    <Button className="b1" onClick={() => setOpen(!open)} aria-controls="collapse-contacto" aria-expanded={open} ><FontAwesomeIcon icon={faMessage} /> Contacto
                        <Collapse in={open}>
                            <div id="collapse-contacto">
                                <li><a><FontAwesomeIcon icon={faReceipt} /> Formulario</a></li>
                                <li><a><FontAwesomeIcon icon={faWhatsapp} /> Escribenos al +56945020474</a></li>
                                <li><a>Visitanos en Villa Ferroviaria</a></li>
                            </div>
                        </Collapse>
                    </Button>
                    <Form className="d-flex mt-3 sb1" role="search">
                        <input className="form-control me-2 sb2" type="search" placeholder="¿Qué deseas buscar?" aria-label="Search" />
                        <button className="btn btn-primary b2" type="submit"> <FontAwesomeIcon icon={faMagnifyingGlass} />Buscar</button>
                    </Form>
                </Offcanvas.Body>
                
                    <Button className="btn btn-primary b2" href="#"><FontAwesomeIcon icon={faUser} className='iconleftmenu' />Iniciar sesión</Button>
                    <Button className="btn btn-primary b2" href="#"><FontAwesomeIcon icon={faRightFromBracket} beat className='iconleftmenu' />Cerrar sesión</Button>
            </Offcanvas>
        </>
    );
}

export default Sidebar1;