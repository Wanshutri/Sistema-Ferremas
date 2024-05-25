const conectar = require('./connection'); // Importa la función de conexión

// Función para crear un nuevo tipo de producto
function crearTipoProducto(nombreTipo, callback) {
    if (nombreTipo.length <= 2) {
        return callback(new Error('El nombre del tipo de producto debe tener al menos 3 caracteres.'), null);
    }

    if (typeof nombreTipo !== 'string') {
        return callback(new Error('El nombre del tipo de producto debe ser caracteres alfabéticos.'), null);
    }

    const connection = conectar();
    const query = 'INSERT INTO tipo_producto (nombreTipo) VALUES(?)';
    connection.query(query, nombreTipo, (error, results, fields) => {
        connection.end();
        if (error) {
            return callback(error, null);
        }
        callback(null, results.insertId);
    });
}

// Función para actualizar un tipo de producto existente
function actualizarTipoProducto(id, nombreTipo, callback) {
    if (nombreTipo.length <= 2) {
        return callback(new Error('El nombre del tipo de producto debe tener al menos 3 caracteres.'), null);
    }

    if (typeof nombreTipo !== 'string') {
        return callback(new Error('El nombre del tipo de producto debe ser caracteres alfabéticos.'), null);
    }

    const connection = conectar();
    const query = 'UPDATE tipo_producto SET nombreTipo = ? WHERE idTipoProducto = ?';
    connection.query(query, [nombreTipo, id], (error, results, fields) => {
        connection.end();
        if (error) {
            return callback(error, null);
        }
        callback(null, results.affectedRows > 0);
    });
}

// Función para eliminar un producto
function eliminarTipoProducto(id, callback) {
    const connection = conectar();
    const query = 'DELETE FROM tipo_producto WHERE idTipoProducto = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        if (error) {
            return callback(error, null);
        }
        callback(null, results.affectedRows > 0);
    });
}

// Función para recuperar un tipo de producto por su ID
function getTipoProducto(id, callback) {
    const connection = conectar();
    const query = 'SELECT * FROM tipo_producto WHERE idTipoProducto = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        if (error) {
            return callback(error, null);
        }
        if (results.length === 0) {
            callback(null, null); // No se encontró ningún tipo de producto con ese ID
        } else {
            callback(null, results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
        }
    });
}

// Función para recuperar todos los productos de la base de datos
function getTiposProducto(callback) {
    const connection = conectar();
    const query = 'SELECT * FROM tipo_producto';
    connection.query(query, (error, results, fields) => {
        connection.end();
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
}

module.exports = { actualizarTipoProducto, crearTipoProducto, eliminarTipoProducto, getTipoProducto, getTiposProducto };