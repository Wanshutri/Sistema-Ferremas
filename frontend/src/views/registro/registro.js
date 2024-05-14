import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {

  const [usuario, setUsuario] = useState({
    correoUsuario: '',
    contrasenaUsuario: '',
    rutUsuario: '',
    pNombre: '',
    sNombre: '',
    pApellido: '',
    sApellido: '',
    fechaNac: '',
    celular: null,
    direccion: '',
    cargo : 'Cliente'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'celular' ? parseInt(value) : value; // Convertir a número si el campo es 'celular'
    setUsuario({
      ...usuario,
      [name]: newValue
    });
  };
  

  const handleSubmit = (e) => {
    console.log(usuario.celular)
    console.log(typeof usuario.celular)
    e.preventDefault();
    axios.post('http://localhost:3001/api/usuarios', usuario)
      .then((response) => {
        console.log('Usuario creado:', response.data);
        // Aquí podrías redirigir a otra página, mostrar un mensaje de éxito, etc.
      })
      .catch((error) => {
        console.error('Error al crear usuario:', error);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px" }}>
        <div className="card">
          <div className="card-body">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h2>Registro</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="email" name="correoUsuario" value={usuario.correoUsuario} onChange={handleChange} className="form-control" placeholder="Correo electrónico" required />
              </div>
              <div className="mb-3">
                <input type="password" name="contrasenaUsuario" value={usuario.contrasenaUsuario} onChange={handleChange} className="form-control" placeholder="Contraseña" required />
              </div>
              <div className="mb-3">
                <input type="text" name="rutUsuario" value={usuario.rutUsuario} onChange={handleChange} className="form-control" placeholder="RUT" required />
              </div>
              <div className="mb-3">
                <input type="text" name="pNombre" value={usuario.pNombre} onChange={handleChange} className="form-control" placeholder="Primer nombre" required />
              </div>
              <div className="mb-3">
                <input type="text" name="sNombre" value={usuario.sNombre} onChange={handleChange} className="form-control" placeholder="Segundo nombre" />
              </div>
              <div className="mb-3">
                <input type="text" name="pApellido" value={usuario.pApellido} onChange={handleChange} className="form-control" placeholder="Primer apellido" required />
              </div>
              <div className="mb-3">
                <input type="text" name="sApellido" value={usuario.sApellido} onChange={handleChange} className="form-control" placeholder="Segundo apellido" required />
              </div>
              <div className="mb-3">
                <input type="date" name="fechaNac" value={usuario.fechaNac} onChange={handleChange} className="form-control" placeholder="Fecha de nacimiento" required />
              </div>
              <div className="mb-3">
                <input type="tel" name="celular" value={usuario.celular} onChange={handleChange} className="form-control" placeholder="Celular" required />
              </div>
              <div className="mb-3">
                <input type="text" name="direccion" value={usuario.direccion} onChange={handleChange} className="form-control" placeholder="Dirección" required />
              </div>
              <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
