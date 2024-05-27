import React, { useState, useContext } from "react";
import logo from "./../../assets/img/logo.png";
import "./registro.css";
import { AuthContext } from "./../../js/AuthContext";

const Register = () => {
  const { login, authState } = useContext(AuthContext); // Usa el contexto de autenticación
  const [usuario, setUsuario] = useState({
    correoUsuario: "",
    contrasenaUsuario: "",
    rutUsuario: "",
    pNombre: "",
    sNombre: "",
    pApellido: "",
    sApellido: "",
    fechaNac: "",
    celular: null,
    direccion: "",
    cargo: "Cliente",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "celular" ? parseInt(value) : value; // Convertir a número si el campo es 'celular'
    setUsuario({
      ...usuario,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        // Si la solicitud fue exitosa (código de respuesta 200-299), continuar
        //await login(usuario.correoUsuario, usuario.contrasenaUsuario);
      } else {
        // Si la solicitud falló, lanzar un error
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // Redirigir al usuario si está autenticado
  if (authState.isAuthenticated) {
    window.location.href = "http://localhost:3000/";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="contreg"
    >
      <div style={{ width: "400px" }}>
        <div className="card cartareg">
          <div className="card-body">
            <div>
              <img src={logo} style={{ width: "30vh" }} alt="Logo" />
            </div>
            <div
              className="titulo"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              <h2>Registro</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="correoUsuario"
                  value={usuario.correoUsuario}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="contrasenaUsuario"
                  value={usuario.contrasenaUsuario}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="rutUsuario"
                  value={usuario.rutUsuario}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="RUT"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="pNombre"
                  value={usuario.pNombre}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Primer nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="sNombre"
                  value={usuario.sNombre}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Segundo nombre"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="pApellido"
                  value={usuario.pApellido}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Primer apellido"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="sApellido"
                  value={usuario.sApellido}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Segundo apellido"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="date"
                  name="fechaNac"
                  value={usuario.fechaNac}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Fecha de nacimiento"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  name="celular"
                  value={usuario.celular}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Celular"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="direccion"
                  value={usuario.direccion}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Dirección"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
