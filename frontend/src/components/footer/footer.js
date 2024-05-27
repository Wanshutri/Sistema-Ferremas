import "./footer.css";
import logo from "./../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left col-md-4 col-sm-6">
        <p className="about">
          <span> Acerca de la Compañia</span> Ut congue augue non tellus
          bibendum, in varius tellus condimentum. In scelerisque nibh tortor,
          sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices
          eleifend. Integer tellus est, vehicula eu lectus tincidunt, ultricies
          feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut,
          aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra
          massa.
        </p>
        <div className="icons">
          <a href="https://www.facebook.com/felipe.andradevargas">
            <FontAwesomeIcon icon={faFacebookF} style={{ color: "#2951a0" }} />
          </a>
          <a href="">
            <FontAwesomeIcon icon={faXTwitter} style={{ color: "#2951a0" }} />
          </a>
          <a href="https://wa.me/56945020474">
            <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#2951a0" }} />
          </a>
          <a href="https://www.instagram.com/pipee.an/">
            <FontAwesomeIcon icon={faInstagram} style={{ color: "#2951a0" }} />
          </a>
        </div>
      </div>
      <div className="footer-center col-md-4 col-sm-6">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span> Ubicación</span> Ciudad, Chile
          </p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p> (+56) 9 0000 0000</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <Link to="#"> ferremas@company.com</Link>
          </p>
        </div>
      </div>
      <div className="footer-right col-md-4 col-sm-6">
        <img src={logo} alt="" className="logoimg" />
        <div className="menu">
          <Link to="/"> Home</Link>
          <Divider
            orientation="vertical"
            flexItem
            className="dividercarrusel"
          />
          <Link to="/sobrenosotros"> Acerca de</Link>
          <Divider
            orientation="vertical"
            flexItem
            className="dividercarrusel"
          />
          <Link to=""> Productos</Link>
          <Divider
            orientation="vertical"
            flexItem
            className="dividercarrusel"
          />
          <Link to="/carro"> Carrito</Link>
          <Divider
            orientation="vertical"
            flexItem
            className="dividercarrusel"
          />
          <Link to="/ayuda"> Ayuda</Link>
          <Divider
            orientation="vertical"
            flexItem
            className="dividercarrusel"
          />
          <Link to="/contactanos"> Contacto</Link>
        </div>
        <p className="name"> FERREMAS &copy; 2024</p>
      </div>
    </div>
  );
};

export default Footer;
