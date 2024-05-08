import React from "react";

const Register = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px" }}>
        <div className="card">
          <div className="card-body">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h2>Registro</h2>
            </div>
            <form style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="firstName">Nombre</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Ingrese su nombre" />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Ingrese su apellido" />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" className="form-control" id="password" placeholder="Contraseña" />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirmar Contraseña" />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="phone">Número de Teléfono</label>
                    <input type="text" className="form-control" id="phone" placeholder="Ingrese su número de teléfono" />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Ingrese su dirección" />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="addressNumber">Número de Dirección</label>
                    <input type="text" className="form-control" id="addressNumber" placeholder="Ingrese su número de dirección" />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="commune">Comuna</label>
                    <input type="text" className="form-control" id="commune" placeholder="Ingrese su comuna" />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="postalCode">Código Postal</label>
                    <input type="text" className="form-control" id="postalCode" placeholder="Ingrese su código postal" />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ flex: 1, marginRight: "20px" }}>
                  <div className="form-group">
                    <label htmlFor="region">Provincia/Región</label>
                    <input type="text" className="form-control" id="region" placeholder="Ingrese su provincia o región" />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Registrarse</button>
              <hr></hr>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
