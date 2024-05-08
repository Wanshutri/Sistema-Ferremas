import './footer.css'
import logo from './../../assets/img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <><footer class="footer">
            <div class="footer-left col-md-4 col-sm-6">
                <p class="about">
                    <span> Acerca de la Compañia</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
                    ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
                </p>
                <div class="icons">
                    <a href="#"><FontAwesomeIcon icon={faFacebookF} style={{ color: "#2951a0", }} /></a>
                    <a href="#"><FontAwesomeIcon icon={faXTwitter} style={{ color: "#2951a0", }} /></a>
                    <a href="#"><FontAwesomeIcon icon={faWhatsapp} style={{ color: "#2951a0", }} /></a>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} style={{ color: "#2951a0", }} /></a>
                </div>
            </div>
            <div class="footer-center col-md-4 col-sm-6">
                <div>
                    <i class="fa fa-map-marker"></i>
                    <p><span> Ubicación</span> Ciudad, Chile</p>
                </div>
                <div>
                    <i class="fa fa-phone"></i>
                    <p> (+56) 9 0000 0000</p>
                </div>
                <div>
                    <i class="fa fa-envelope"></i>
                    <p><a href="#"> ferremas@company.com</a></p>
                </div>
            </div>
            <div class="footer-right col-md-4 col-sm-6">
                <img src={logo} className='logoimg' />
                <p class="menu">
                    <a href="#"> Home</a> |
                    <a href="#"> Acerca de</a> |
                    <a href="#"> Productos</a> |
                    <a href="#"> Carrito</a> |
                    <a href="#"> Ayuda</a> |
                    <a href="#"> Contacto</a>
                </p>
                <p class="name"> FERREMAS &copy; 2024</p>
            </div>
        </footer></>
    )
}

export default Footer;