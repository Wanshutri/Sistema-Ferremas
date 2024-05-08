import './banner.css';
import banner from './../../assets/img/mainbanner.jpg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

const BannerCom = () => {
    return (
        // <ParallaxBanner style={{ aspectRatio: '5 / 1' }} className='banner' >
        //     <ParallaxBannerLayer image={banner}  speed={-1}  />
        // </ParallaxBanner>
         <div id='bannerDiv'>
            <img className="banner" src={banner} alt="Banner"></img>
         </div>
    )
}

export default BannerCom