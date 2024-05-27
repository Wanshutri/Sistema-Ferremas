const conectar = require("./connection"); // Importa la función de conexión

// Función para recuperar todas las Boletas de la base de datos
function getBoletas(callback) {
  const connection = conectar();
  const query = "SELECT * FROM boleta";
  connection.query(query, (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, null);
      return;
    }
    connection.end();
    callback(null, results);
  });
}

// Función para crear una nueva Boleta
function crearBoleta(boleta, callback) {
  const connection = conectar();
  const query = "INSERT INTO boleta SET ?";
  connection.query(query, boleta, (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, null);
      return;
    }
    connection.end();
    callback(null, results.insertId);
  });
}

// Función para actualizar una Boleta existente
function actualizarBoleta(id, nuevaBoleta, callback) {
  const connection = conectar();
  const query = "UPDATE boleta SET ? WHERE idBoleta = ?";
  connection.query(query, [nuevaBoleta, id], (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, null);
      return;
    }
    connection.end();
    callback(null, results.affectedRows > 0);
  });
}

// Función para eliminar una Boleta
function eliminarBoleta(id, callback) {
  const connection = conectar();
  const query = "DELETE FROM boleta WHERE idBoleta = ?";
  connection.query(query, id, (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, null);
      return;
    }
    connection.end();
    callback(null, results.affectedRows > 0);
  });
}

// Función para recuperar una Boleta por su ID
function getBoleta(id, callback) {
  const connection = conectar();
  const query = "SELECT * FROM boleta WHERE idBoleta = ?";
  connection.query(query, id, (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, null);
      return;
    }
    connection.end();
    if (results.length === 0) {
      callback(null, null); // No se encontró ninguna Boleta con ese ID
    } else {
      callback(null, results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
    }
  });
}

// Función para recuperar productos de una boleta
function getProductosBoleta(id, callback) {
  const connection = conectar();
  const query = "SELECT * FROM detalle_boleta WHERE idBoleta = ?";
  connection.query(query, id, (error, results, fields) => {
    if (error) {
      connection.end();
      callback(error, null);
      return;
    }
    connection.end();
    callback(null, results);
  });
}

module.exports = {
  getBoletas,
  getBoleta,
  crearBoleta,
  actualizarBoleta,
  eliminarBoleta,
  getProductosBoleta
};
