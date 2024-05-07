import './banner.css';
import banner from './../../img/banner.png';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const BannerCom = () => {
    return (
        <div id='bannerDiv'>
            <img className="banner" src={banner} alt="Banner"></img>
        </div>
    )
}

export default BannerCom