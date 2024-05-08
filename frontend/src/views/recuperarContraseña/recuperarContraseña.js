import React from "react";

const RecuperarContraseña = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px" }}>
        <div className="card">
          <div className="card-body">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img src="./../../img/forgot_password.png" alt="Forgot Password" style={{ width: "100px", height: "100px" }} />
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu correo electrónico" />
                <small id="emailHelp" className="form-text text-muted">Te enviaremos un enlace para restablecer tu contraseña.</small>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Enviar enlace de recuperación</button>
            </form>
            <hr />
            <div style={{ textAlign: "center" }}>
              <a href="/login">Volver al inicio de sesión</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarContraseña;
