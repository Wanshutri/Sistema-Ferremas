const conectar = require("./connection");

function crearCarrito(carrito, callback) {
  const connection = conectar();
  const query = "INSERT INTO carrito SET ?";
  connection.query(query, carrito, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    callback(null, results.insertId);
    connection.end();
  });
}

function eliminarCarrito(idUsuario, callback) {
  const connection = conectar();
  const query = "DELETE FROM carrito WHERE idUsuario = ?";
  connection.query(query, idUsuario, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    callback(null, results.affectedRows > 0);
    connection.end();
  });
}

function getCarritoPorUsuario(idUsuario, callback) {
  const connection = conectar();

  const query = "SELECT * FROM carrito WHERE idUsuario = ?";
  connection.query(query, idUsuario, (error, carritoResults, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }

    if (carritoResults.length === 0) {
      connection.end();
      return callback(null, {
        message: "No se encontró carrito",
        error: "No se encontró el carrito",
      });
    }

    const idCarrito = carritoResults[0].idCarrito;
    const queryDetalles = "SELECT * FROM detalle_carrito WHERE idCarrito = ?";
    connection.query(queryDetalles, idCarrito, (error, detallesResults, fields) => {
      connection.end();
      if (error) {
        return callback(error, null);
      }

      if (detallesResults.length === 0) {
        return callback(null, null);
      }

      return callback(null, detallesResults);
    });
  });
}

function agregarProductoAlCarrito(idUsuario, idProducto, cantidadProducto, callback) {
  const connection = conectar();

  const queryCarrito = "SELECT idCarrito FROM carrito WHERE idUsuario = ?";
  connection.query(queryCarrito, idUsuario, (error, carritoResults) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }

    if (carritoResults.length === 0) {
      const crearCarritoQuery = "INSERT INTO carrito (idUsuario) VALUES (?)";
      connection.query(crearCarritoQuery, idUsuario, (error, results) => {
        if (error) {
          connection.end();
          return callback(error, null);
        }
        const idCarrito = results.insertId;
        const insertQuery = "INSERT INTO detalle_carrito (idCarrito, idProducto, cantidadProducto) VALUES (?, ?, ?)";
        connection.query(insertQuery, [idCarrito, idProducto, cantidadProducto], (error, results) => {
          connection.end();
          if (error) {
            return callback(error, null);
          }
          callback(null, {
            id: results.insertId,
            message: "Producto agregado al carrito exitosamente",
          });
        });
      });
    } else {
      const idCarrito = carritoResults[0].idCarrito;
      const checkQuery = "SELECT * FROM detalle_carrito WHERE idCarrito = ? AND idProducto = ?";
      connection.query(checkQuery, [idCarrito, idProducto], (error, results) => {
        if (error) {
          connection.end();
          return callback(error, null);
        }
        if (results.length > 0) {
          const updateQuery = "UPDATE detalle_carrito SET cantidadProducto = ? WHERE idCarrito = ? AND idProducto = ?";
          connection.query(updateQuery, [cantidadProducto, idCarrito, idProducto], (error, results) => {
            connection.end();
            if (error) {
              return callback(error, null);
            }
            callback(null, {
              message: "Cantidad de producto actualizada en el carrito",
            });
          });
        } else {
          const insertQuery = "INSERT INTO detalle_carrito (idCarrito, idProducto, cantidadProducto) VALUES (?, ?, ?)";
          connection.query(insertQuery, [idCarrito, idProducto, cantidadProducto], (error, results) => {
            connection.end();
            if (error) {
              return callback(error, null);
            }
            callback(null, {
              id: results.insertId,
              message: "Producto agregado al carrito exitosamente",
            });
          });
        }
      });
    }
  });
}

function eliminarProductoDelCarrito(idUsuario, idProducto, callback) {
  const connection = conectar();
  
  // Consultar el ID del carrito del usuario
  const queryUsu = "SELECT idCarrito FROM carrito WHERE idUsuario = ?";
  connection.query(queryUsu, idUsuario, (error, carritoResults) => {
    if (error) {
      connection.end();
      return callback(error, false);
    }

    if (carritoResults.length === 0) {
      // Si no se encuentra un carrito para el usuario, retornar false
      connection.end();
      return callback(null, false);
    }

    // Obtener el ID del carrito
    const idCarrito = carritoResults[0].idCarrito;

    // Eliminar el producto del carrito usando el ID del carrito y el ID del producto
    const query = "DELETE FROM detalle_carrito WHERE idCarrito = ? AND idProducto = ?";
    connection.query(query, [idCarrito, idProducto], (error, results, fields) => {
      if (error) {
        connection.end();
        return callback(error, false);
      }
      if (results.affectedRows > 0) {
        // Si se eliminó el producto, retornar true
        callback(null, true);
      } else {
        // Si no se encontró el producto en el carrito, retornar false
        callback(null, false);
      }
      connection.end();
    });
  });
}



module.exports = {
  crearCarrito,
  getCarritoPorUsuario,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
  eliminarCarrito,
};