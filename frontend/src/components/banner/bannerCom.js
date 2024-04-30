import './banner.css';
import banner from './../../img/banner.png';


const BannerCom = () => {
    return (
        <><img className="banner" src={banner} alt="Banner"></img><nav className="navbar navbar-expand-lg nabar">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto navibar">
                        <h4 className="nav-link mt-2 nalink">Herramientas manuales</h4>
                        <h4 className="nav-link mt-2 nalink">Materiales básicos</h4>
                        <h4 className="nav-link mt-2 nalink">Equipo de seguridad</h4>
                    </div>
                </div>
            </div>
        </nav></>
    )
}

export default BannerCom