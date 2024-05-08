import React from "react";

const Login = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px" }}>
        <div className="card">
          <div className="card-body">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img src="fotoaqui" alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese su correo electrónico" />
                <small id="emailHelp" className="form-text text-muted">Recuerda que tus contraseñas no serán expuestas.</small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">¡Recuérdame!</label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2" >Iniciar sesión</button>
                <div class="">
                  <a className="password" href="/forgot-password">Registro</a>
                </div>
                <div >
                  <a className="register" href="/registro">¿Olvidaste tu contraseña?</a>
                </div>
                <hr></hr>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
