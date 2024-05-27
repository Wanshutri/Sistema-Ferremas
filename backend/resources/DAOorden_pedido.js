const conectar = require("./connection");

// Función para recuperar todas las órdenes de pedido de la base de datos
function getOrdenesPedido(callback) {
  const connection = conectar();
  const query = "SELECT * FROM ordenPedido";
  connection.query(query, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    callback(null, results);
  });
}

// Función para crear una nueva orden de pedido
function crearOrdenPedido(ordenPedido, callback) {
  const connection = conectar();
  const query = "INSERT INTO ordenPedido SET ?";
  connection.query(query, ordenPedido, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    callback(null, results.insertId);
  });
}

// Función para actualizar una orden de pedido existente
function actualizarOrdenPedido(id, nuevaOrdenPedido, callback) {
  const connection = conectar();
  const query = "UPDATE ordenPedido() ? WHERE idOrdenPedido = ?";
  connection.query(query, [nuevaOrdenPedido, id], (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    callback(null, results.affectedRows > 0);
  });
}

// Función para eliminar una orden de pedido
function eliminarOrdenPedido(id, callback) {
  const connection = conectar();
  const query = "DELETE FROM ordenPedido WHERE idOrdenPedido = ?";
  connection.query(query, id, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    callback(null, results.affectedRows > 0);
  });
}

// Función para recuperar una orden de pedido por su ID
function getOrdenPedido(id, callback) {
  const connection = conectar();
  const query = "SELECT * FROM ordenPedido WHERE idOrdenPedido = ?";
  connection.query(query, id, (error, results, fields) => {
    if (error) {
      connection.end();
      return callback(error, null);
    }
    connection.end();
    if (results.length === 0) {
      callback(null, null); // No se encontró ninguna orden de pedido con ese ID
    } else {
      callback(null, results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
    }
  });
}

module.exports = {
  getOrdenesPedido,
  getOrdenPedido,
  crearOrdenPedido,
  actualizarOrdenPedido,
  eliminarOrdenPedido,
};
