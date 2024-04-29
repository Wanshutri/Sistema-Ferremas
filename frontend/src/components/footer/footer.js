import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../img/logo.png';

const Footer = ({logoSrc}) => {
    return (
        <div className='footer-div d-flex'>
        <img className="logofooter" src={logoSrc} alt="Logo"></img>
        <div className='linksfooter'>
            <ul className='list-groupfooter'>
            <li className='linksf'><a  href="https://www.instagram.com/pipee.an/">Instagram</a></li>
            <li className='linksf'><a  href="mailto:tucorreo@example.com">Correo</a></li>
            <li className='linksf'><a  href="https://twitter.com/">Twitter</a></li>
            <li className='linksf'><a  href="https://www.facebook.com/felipe.andradevargas">Facebook</a></li>
            </ul>
        </div>
    </div>
    )
}

export default Footer;