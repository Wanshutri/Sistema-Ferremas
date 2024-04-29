import React from "react";
import LeftMenu from "../../components/leftMenu/leftMenu";
import Footer from "../../components/footer/footer";
import BannerCom from "../../components/banner/bannerCom"
import logo from "./../../img/logo.png"
import banner from "./../../img/banner.png"



const Home = () => {
    return (
        <div className="container-fluid"> {/* Wrap content in a container */}
            <LeftMenu />
            <div className="row"> {/* Use Bootstrap row */}
                <div className="col"> {/* Adjust column width as needed */}
                    <header>
                        <BannerCom />
                    </header>
                    <main>
                        {/* Main content */}
                    </main>
                    <footer>
                        <Footer logoSrc={logo}/>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Home;