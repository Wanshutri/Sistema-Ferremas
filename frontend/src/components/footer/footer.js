import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import logo from '../../img/logo.png';

const Footer = ({logoSrc}) => {
    return (
        <div className='footer-div d-flex'>
        <img className="logofooter" src={logoSrc} alt="Logo"></img>
        <div className='linksfooter'>
            <ul className='list-groupfooter'>
            <li className='linksf'><FontAwesomeIcon icon = {faBell}></FontAwesomeIcon><a  href="https://www.instagram.com/pipee.an/">Instagram</a></li> 
            <li className='linksf'><FontAwesomeIcon icon = {faBell}></FontAwesomeIcon><a  href="mailto:tucorreo@example.com">Correo</a></li>
            <li className='linksf'><FontAwesomeIcon icon = {faBell}></FontAwesomeIcon><a  href="https://twitter.com/">Twitter</a></li>
            <li className='linksf'><FontAwesomeIcon icon = {faBell}></FontAwesomeIcon><a  href="https://www.facebook.com/felipe.andradevargas">Facebook</a></li>
            </ul>
        </div>
    </div>
    )
}

export default Footer;