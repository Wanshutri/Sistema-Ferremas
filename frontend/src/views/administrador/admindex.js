import React from "react";
import './admindex.css'
import Card from "react-bootstrap/Card";
import logo from "./../../assets/img/logo.png";

const Admindex = () => {

    return (
        <main>
            <body className="mainadmin">
                <Card className="cardadmin">
                    <div>
                        <h5>Admin index</h5>
                        <img src={logo} />
                    </div>
                </Card>
            </body>
        </main>

    )

}

export default Admindex;