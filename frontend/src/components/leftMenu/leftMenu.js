import './leftMenu.css';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo.png';



const LeftMenu = () => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img src={logo} class="logoFerremas"/></h5>
            <button type="button" className="btn-close btn-close-white b2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="btn btn-primary nav-link b1" aria-current="page" href="#"><FontAwesomeIcon icon={faHouse} />Home</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary nav-link b1" href="#"><FontAwesomeIcon icon={faCartShopping} />Carrito</a>
              </li>
              <li className="nav-item dropdown">
                <a class="btn btn-primary nav-link b1" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"><FontAwesomeIcon icon={faMobile} />
                  Contacto
                </a>
                <ul class="collapse multi-collapse" id="multiCollapseExample1">

                  <li><a>Formulario</a></li>
                  <li><a>Escribenos al +56945020474</a></li>
                  <li><a>Visitanos en ...</a></li>

                </ul>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input className="form-control me-2" type="search" placeholder="¿Qué deseas buscar?" aria-label="Search" />
              <button className="btn btn-primary b2" type="submit"> <FontAwesomeIcon icon={faMagnifyingGlass} />Buscar</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LeftMenu;