import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from "./../../assets/img/logo.png";
import banner from "./../../assets/img/Verticalbanner.jpg";
import { Link } from "react-router-dom";

function RestablecerContraseña() {
  return (
    <div className="contlog">
      <MDBContainer className="">
        <MDBCard className="cartaslog">
          <MDBRow className="g-0">
            <MDBCol md="4">
              <MDBCardImage
                src={banner}
                alt="login form"
                style={{
                  filter: "brightness(80%) blur(0.5px)",
                  height: "100%",
                }}
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="8">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0">
                    <img src={logo} style={{ width: "200px" }} />
                  </span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Recuperar contraseña
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Correo electrónico"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />

                <MDBBtn className="mb-4 px-5" color="primary" size="lg">
                  Enviar
                </MDBBtn>
                <p
                  className="mb-8 pb-lg-2 text1"
                  style={{ color: "#393f81", textAlign: "center" }}
                >
                  ¿No tienes cuenta? <br></br>
                  <Link to="/registro">
                  <a  style={{ color: "#393f81" }}>
                    Registrate aqui
                  </a>
                  </Link>
                </p>

                <div className="d-flex flex-row justify-content-end">
                  <a href="#!" className="small text-muted me-1">
                    Terminos de uso.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default RestablecerContraseña;
