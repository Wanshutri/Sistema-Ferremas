const conectar = require("./connection"); // Importa la función de conexión
const carritoDAO = require("./DAOcarrito");
const bcrypt = require("bcrypt");

// Función para recuperar todos los Usuarios de la base de datos
function getUsuarios(callback) {
  const connection = conectar();
  const query = "SELECT * FROM usuario";
  connection.query(query, (error, results, fields) => {
    connection.end();
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
}

var FnRut = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (rutCompleto) {
    rutCompleto = rutCompleto.replace("‐", "-");
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
    var tmp = rutCompleto.split("-");
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == "K") digv = "k";

    return FnRut.dv(rut) == digv;
  },
  dv: function (T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  },
};

// Función para validar el usuario antes de crearlo
function validarUsuario(usuario, usuarioAntiguo, callback) {
  usuario.correoUsuario = usuario.correoUsuario.trim();
  usuario.contrasenaUsuario = usuario.contrasenaUsuario.trim();
  usuario.rutUsuario = usuario.rutUsuario.trim();
  usuario.pNombre = usuario.pNombre.trim();
  usuario.sNombre = usuario.sNombre ? usuario.sNombre.trim() : null;
  usuario.pApellido = usuario.pApellido.trim();
  usuario.sApellido = usuario.sApellido.trim();
  usuario.direccion = usuario.direccion.trim();

  if (usuarioAntiguo != null) {
    usuarioAntiguo.correoUsuario = usuarioAntiguo.correoUsuario.trim();
    usuarioAntiguo.contrasenaUsuario = usuarioAntiguo.contrasenaUsuario.trim();
    usuarioAntiguo.rutUsuario = usuarioAntiguo.rutUsuario.trim();
    usuarioAntiguo.pNombre = usuarioAntiguo.pNombre.trim();
    usuarioAntiguo.sNombre = usuarioAntiguo.sNombre
      ? usuario.sNombre.trim()
      : null;
    usuarioAntiguo.pApellido = usuarioAntiguo.pApellido.trim();
    usuarioAntiguo.sApellido = usuarioAntiguo.sApellido.trim();
    usuarioAntiguo.direccion = usuarioAntiguo.direccion.trim();
  }

  getUsuarios((error, usuarios) => {
    if (error) {
      return callback(error, null);
    }

    const usuarioExistenteCorreo = usuarios.find(
      (u) => u.correoUsuario === usuario.correoUsuario
    );
    if (usuarioExistenteCorreo) {
      if (usuarioAntiguo) {
        if (usuarioAntiguo.correoUsuario !== usuario.correoUsuario) {
          return callback(
            new Error("El correo electrónico ya está en uso"),
            null
          );
        }
      } else {
        return callback(
          new Error("El correo electrónico ya está en uso"),
          null
        );
      }
    }

    const usuarioExistenteRut = usuarios.find(
      (u) => u.rutUsuario === usuario.rutUsuario
    );
    if (usuarioExistenteRut) {
      if (usuarioAntiguo) {
        if (usuarioAntiguo.rutUsuario !== usuario.rutUsuario) {
          return callback(new Error("El RUT ya está en uso"), null);
        }
      } else {
        return callback(new Error("El RUT ya está en uso"), null);
      }
    }

    if (!usuario.correoUsuario || !/\S+@\S+\.\S+/.test(usuario.correoUsuario)) {
      return callback(new Error("El correo electrónico no es válido"), null);
    }

    if (
      !usuario.contrasenaUsuario ||
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(usuario.contrasenaUsuario)
    ) {
      return callback(new Error("La contraseña no es segura"), null);
    }

    if (!FnRut.validaRut(usuario.rutUsuario)) {
      return callback(new Error("El RUT no es válido"), null);
    }

    if (usuario.celular.toString().length !== 9) {
      return callback(
        new Error("El número de celular debe tener exactamente 9 dígitos"),
        null
      );
    }

    const usuarioExistenteTelefono = usuarios.find(
      (u) => u.celular === usuario.celular
    );
    if (usuarioExistenteTelefono) {
      if (usuarioAntiguo) {
        if (usuarioAntiguo.celular !== usuario.celular) {
          return callback(
            new Error("El número de celular ya está registrado"),
            null
          );
        }
      } else {
        return callback(
          new Error("El número de celular ya está registrado"),
          null
        );
      }
    }

    if (usuario.direccion.length < 10) {
      return callback(
        new Error("La dirección debe tener al menos 10 caracteres"),
        null
      );
    }

    const fechaNacimiento = new Date(usuario.fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    if (edad < 18) {
      return callback(
        new Error("El usuario debe tener al menos 18 años"),
        null
      );
    }

    if (
      usuario.pNombre.length < 2 ||
      usuario.pApellido.length < 2 ||
      usuario.sApellido.length < 2
    ) {
      return callback(
        new Error("Los nombres y apellidos deben tener al menos 2 caracteres"),
        null
      );
    }

    if (usuario.sNombre && usuario.sNombre.length < 2) {
      return callback(
        new Error("El segundo nombre debe tener al menos 2 caracteres"),
        null
      );
    }

    callback(null, true);
  });
}

// Función para crear un nuevo Usuario
function crearUsuario(usuario, callback) {
  validarUsuario(usuario, null, (error) => {
    if (error) {
      return callback(error, null);
    }

    bcrypt.hash(usuario.contrasenaUsuario, 10, (error, hash) => {
      if (error) {
        return callback(error, null);
      }

      usuario.contrasenaUsuario = hash;
      const connection = conectar();
      const query = "INSERT INTO usuario SET ?";
      connection.query(query, usuario, (error, results, fields) => {
        if (error) {
          connection.end();
          return callback(error, null);
        }

        const usuarioId = results.insertId;
        connection.end();
        crearCarritoParaUsuario(usuarioId, (error) => {
          if (error) {
            return callback(error, null);
          }
          callback(null, usuarioId);
        });
      });
    });
  });
}

// Función auxiliar para crear un carrito para un usuario
function crearCarritoParaUsuario(idUsuario, callback) {
  const carrito = { idUsuario: idUsuario };
  carritoDAO.crearCarrito(carrito, (error, carritoId) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, carritoId);
  });
}

// Función para actualizar un Usuario
function actualizarUsuario(id, body, callback) {
  const credenciales = body.credenciales;
  const usuario = body.usuario;
  if (!credenciales) {
    return callback(new Error("Faltan credenciales"), null);
  }
  if (!usuario) {
    return callback(new Error("Faltan datos del usuario"), null);
  }
  autenticarUsuario(
    credenciales.correoUsuario,
    credenciales.contrasenaUsuario,
    (error, usu) => {
      if (error) {
        return callback(error, null);
      }
      if (!usu) {
        return callback(new Error("Autenticación fallida"), null);
      }
      validarUsuario(usuario, usu, (error) => {
        if (error) {
          return callback(error, null);
        }
        bcrypt.hash(usuario.contrasenaUsuario, 10, (error, hash) => {
          if (error) {
            return callback(error, null);
          }
          usuario.contrasenaUsuario = hash;
          const connection = conectar();
          const query = "UPDATE usuario SET ? WHERE idUsuario = ?";
          connection.query(query, [usuario, id], (error, results, fields) => {
            connection.end();
            if (error) {
              return callback(error, null);
            }
            callback(null, results.affectedRows > 0);
          });
        });
      });
    }
  );
}

// Función para eliminar un Usuario
function eliminarUsuario(id, callback) {
  carritoDAO.eliminarCarrito(id, (error) => {
    if (error) {
      return callback(error, null);
    }
    const connection = conectar();
    const query = "DELETE FROM usuario WHERE idUsuario = ?";
    connection.query(query, id, (error, results, fields) => {
      connection.end();
      if (error) {
        return callback(error, null);
      }
      callback(null, results.affectedRows > 0);
    });
  });
}

// Función para recuperar un Usuario por su ID
function getUsuario(id, callback) {
  const connection = conectar();
  const query = "SELECT * FROM usuario WHERE idUsuario = ?";
  connection.query(query, id, (error, results, fields) => {
    connection.end();
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    callback(null, results[0]);
  });
}

// Función para autenticar un usuario
function autenticarUsuario(correo, contrasena, callback) {
  const connection = conectar();
  const query = "SELECT * FROM usuario WHERE correoUsuario = ?";
  connection.query(query, correo, (error, results, fields) => {
    connection.end();
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    const usuario = results[0];
    bcrypt.compare(contrasena, usuario.contrasenaUsuario, (error, match) => {
      if (error) {
        return callback(error, null);
      }
      if (match) {
        return callback(null, usuario);
      }
      callback(null, null);
    });
  });
}

module.exports = {
  getUsuarios,
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  autenticarUsuario,
};
