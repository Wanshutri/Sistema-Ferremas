import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import logo from './../../assets/img/logo.png';
import banner from './../../assets/img/Verticalbanner.jpg';
import { Link } from 'react-router-dom';

function Login() {
  // Definir el estado para el correo y la contraseña
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  function accederLogin() {
    if (correo.trim() === '' || contrasena.trim() === '') {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const datos = {
      correoUsuario: correo,
      contrasenaUsuario: contrasena
    };
  
    fetch('http://localhost:3001/api/autenticar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
      return response.json();
    })
    .then(usuario => {
      // Si la autenticación es exitosa, establecer loggedIn en true
      setLoggedIn(true);
    })
    .catch(error => {
      setError('Hubo un problema con la autenticación. Por favor, inténtalo de nuevo más tarde.');
    });
  }

  // Redirigir al usuario si está autenticado
  if (loggedIn) {
    window.location.href = "http://localhost:3000/";
  }

  return (
    <MDBContainer className="my-5" >

      <MDBCard >
        <MDBRow className='g-0'>

          <MDBCol md='4'>
            <MDBCardImage src={banner} alt="login form" style={{ filter: 'brightness(80%) blur(0.5px)', height: '100%' }} className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='8'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0"><img src={logo} style={{ width: '200px' }} alt="logo" /></span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Ingresa a tu cuenta</h5>

              <MDBInput wrapperClass='mb-4' name='correoUsuario' label='Correo electrónico' type='email' size="lg" onChange={(e) => setCorreo(e.target.value)} />
              <MDBInput wrapperClass='mb-4' name='contrasenaUsuario' label='Contraseña' type='password' size="lg" onChange={(e) => setContrasena(e.target.value)} />

              {error && <p className="text-danger">{error}</p>}

              <button className="mb-4 px-5" color='primary' onClick={accederLogin} size='lg'>Login</button>
              <Link to={'recuperar'}><a className="small text-muted text1" style={{ textAlign: 'center' }}>¿Olvidaste tu contraseña?</a></Link>
              <p className="mb-8 pb-lg-2 text1" style={{ color: '#393f81', textAlign: 'center' }}>¿No tienes cuenta? <br></br>
                <Link to={'/registro'}><a style={{ color: '#393f81' }}>Registrate aqui</a></Link></p>
              <div className='d-flex flex-row justify-content-end'>
                <a href="#!" className="small text-muted me-1">Terminos de uso.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;
