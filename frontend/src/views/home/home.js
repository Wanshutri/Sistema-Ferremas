import React from "react";
import LeftMenu from "../../components/leftMenu/leftMenu";

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
                </div>
            </div>
        </div>
    )
}

export default Home;