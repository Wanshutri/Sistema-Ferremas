import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Button from "react-bootstrap/esm/Button";
import logo from "./../../assets/img/logo.png";
import banner from "./../../assets/img/Verticalbanner.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../js/AuthContext"; // Importa el contexto de autenticación
import "./login.css";
import FloatReturn from "./../../components/FloatCarrito/FloatReturn";


function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const { login, logout, authState } = useContext(AuthContext); // Usa el contexto de autenticación

  const accederLogin = async (e) => {
    e.preventDefault();
    if (correo.trim() === "" || contrasena.trim() === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }
    try {
      const result = await login(correo, contrasena);
      if (result.success) {
        const tipoUsuario = result.usuario.cargo
        switch (tipoUsuario) {
          case "Cliente":
            window.location.href = "http://localhost:3000/";
            break;
          case "Contador":
            window.location.href = "http://localhost:3000/contindex";
            break;
          case "Vendedor":
            window.location.href = "http://localhost:3000/vendindex";
            break;
          case "Bodeguero":
            window.location.href = "http://localhost:3000/bodeindex";
            break;
          case "Admin":
            window.location.href = "http://localhost:3000/admin";
            break;
          default:
            console.error('Tipo de usuario desconocido:', tipoUsuario);
        }
      } else {
        await logout();
        throw new Error(result.error);
      }
    } catch (error) {
      setError("Problema al iniciar sesión: " + error.message);
    }
  };

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
                className="rounded-start w-100 "
              />
              <Link to ="/">
                <FloatReturn />
              </Link>
            </MDBCol>

            <MDBCol md="8">
              <MDBCardBody className="d-flex flex-column ">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0">
                    <img src={logo} style={{ width: "200px" }} alt="logo" />
                  </span>
                </div>

                <MDBInput
                  wrapperClass="mb-4"
                  name="correoUsuario"
                  label="Correo electrónico"
                  type="email"
                  size="lg"
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  name="contrasenaUsuario"
                  label="Contraseña"
                  type="password"
                  size="lg"
                  onChange={(e) => setContrasena(e.target.value)}
                />

                {error && <p className="text-danger">{error}</p>}

                <Button
                  className="mb-4 px-5"
                  color="primary"
                  onClick={accederLogin}
                  size="lg"
                >
                  Login
                </Button>
                <Link to="/recuperarcontrasena">
                  <p
                    className="small text-muted text1"
                    style={{ textAlign: "center" }}
                  >
                    ¿Olvidaste tu contraseña?
                  </p>
                </Link>
                <div
                  className="mb-8 pb-lg-2 text1"
                  style={{ color: "#393f81", textAlign: "center" }}
                >
                  <p>¿No tienes cuenta?</p>
                  <Link to={"/registro"} style={{ color: "#393f81" }}>
                    <p>Registrate aqui</p>
                  </Link>
                </div>
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

export default Login;
