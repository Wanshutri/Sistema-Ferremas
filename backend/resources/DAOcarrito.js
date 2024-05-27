const conectar = require("./connection");

function crearCarrito(carrito, callback) {
  const connection = conectar();
  const query = "INSERT INTO carrito SET ?";
  connection.query(query, carrito, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    callback(null, results.insertId);
  });
}

function eliminarCarrito(carrito, callback) {
  const connection = conectar();
  const query = "DELETE FROM carrito WHERE idUsuario = ?";
  connection.query(query, carrito, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    callback(null, results.affectedRows > 0);
  });
}

function getCarritoPorUsuario(idUsuario, callback) {
  const connection = conectar();

  // Consulta para obtener el carrito del usuario
  const queryCarrito = "SELECT * FROM carrito WHERE idUsuario = ?";
  connection.query(queryCarrito, idUsuario, (error, carritoResults, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }

    // Si no se encuentra ningún carrito para el usuario
    if (carritoResults.length === 0) {
      connection.end();
      return callback(null, {
        message: "No se encontró carrito",
        error: "No se encontro el carrito",
      });
    }

    // Consulta para obtener los detalles del carrito
    const idCarrito = carritoResults[0].idCarrito;
    const queryDetalles =
      "SELECT * FROM detalle_carrito WHERE idCarrito = (SELECT idCarrito FROM carrito WHERE idUsuario = ?)";
    connection.query(
      queryDetalles,
      idUsuario,
      (error, detallesResults, fields) => {
        connection.end();
        if (error) {
          return callback(error, null);
        }

        if (detallesResults.length === 0) {
          return callback(null, null);
        }

        return callback(null, detallesResults);
      }
    );
  });
}

function agregarProductoAlCarrito(
  idUsuario,
  idProducto,
  cantidadProducto,
  callback
) {
  const connection = conectar();
  const query =
    "INSERT INTO detalle_carrito (idCarrito, idProducto, cantidadProducto) VALUES ((SELECT idCarrito FROM carrito WHERE idUsuario = ?), ?, ?)";
  connection.query(
    query,
    [idUsuario, idProducto, cantidadProducto],
    (error, results, fields) => {
      connection.end();
      if (error) {
        return callback(error, null);
      }
      callback(null, {
        id: results.insertId,
        message: "Producto agregado al carrito exitosamente",
      });
    }
  );
}

function eliminarProductoDelCarrito(idCarrito, idProducto, callback) {
  const connection = conectar();
  const query =
    "DELETE FROM detalle_carrito WHERE idCarrito = ? AND idProducto = ?";
  connection.query(query, [idCarrito, idProducto], (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    callback(null, results.affectedRows > 0);
  });
}

module.exports = {
  crearCarrito,
  getCarritoPorUsuario,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
  eliminarCarrito,
};