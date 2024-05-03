import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../img/logo.png';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';

const Footer = ({logoSrc}) => {
    return (
        <div className='footer-div d-flex'>
        <img className="logofooter" src={logoSrc} alt="Logo"></img>
        <div className='linksfooter'>
            <ul className='list-groupfooter'>
            <li className='linksf'><a  href="https://www.instagram.com/pipee.an/"><FontAwesomeIcon icon={faInstagram} className='iconfooter' />Instagram</a></li>
            <li className='linksf'><a  href="mailto:tucorreo@example.com"><FontAwesomeIcon icon={faEnvelope} className='iconfooter' />Correo</a></li>
            <li className='linksf'><a  href="https://twitter.com/"><FontAwesomeIcon icon={faXTwitter} className='iconfooter' />Twitter</a></li>
            <li className='linksf'><a  href="https://www.facebook.com/FerremasGuatemala/"><FontAwesomeIcon icon={faFacebook} className='iconfooter' />Facebook</a></li>
            </ul>
        </div>
    </div>
    )
}

export default Footer;