import './banner.css';
import banner from './../../img/banner.png';

const BannerCom = () => {
return (
<div id='bannerDiv'>
    <img className="banner" src={banner} alt="Banner"></img>
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid p-0">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">

                    <row>
                        <h4 className="nav-link nalink">Herramientas manuales</h4>
                        <h4 className="nav-link nalink">Materiales básicos</h4>
                        <h4 className="nav-link nalink">Equipo de seguridad</h4>
                    </row>

                </div>
            </div>
        </div>
    </nav>
</div>
)
}

export default BannerCom