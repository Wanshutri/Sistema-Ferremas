import React from "react";
import LeftMenu from "../../components/leftMenu/leftMenu";
import logo from "./../../img/logo.png"

const Home = () => {
    return (
        <div className="container-fluid"> {/* Wrap content in a container */}
            <LeftMenu />
            <div className="row"> {/* Use Bootstrap row */}
                <div className="col"> {/* Adjust column width as needed */}
                    <header>
                        {/* Header content */}
                        <img src=""/>
                    </header>
                    <main>
                        {/* Main content */}
                    </main>
                    <footer>
                    <div className='footer-div d-flex'>
                        <img className="logofooter" src={logo} alt="Logo"></img>
                        <div className='linksfooter'>
                            <ul className='list-groupfooter'>
                            <li className='linksf'><a  href="https://www.instagram.com/pipee.an/">Instagram</a></li>
                            <li className='linksf'><a  href="mailto:tucorreo@example.com">Correo</a></li>
                            <li className='linksf'><a  href="https://twitter.com/">Twitter</a></li>
                            <li className='linksf'><a  href="https://www.facebook.com/felipe.andradevargas">Facebook</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
                </div>
            </div>
        </div>
    )
}

export default Home;