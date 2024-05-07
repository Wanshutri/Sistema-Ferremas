const conectar = require('./connection'); // Importa la función de conexión

// Función para recuperar todos los productos de la base de datos
function getProductos() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM producto';
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results);
        });
    });
}

// Función para crear un nuevo producto
function crearProducto(producto) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO producto SET ?';
        connection.query(query, producto, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results.insertId);
        });
    });
}

// Función para actualizar un producto existente
function actualizarProducto(id, nuevoProducto) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'UPDATE producto SET ? WHERE idProducto = ?';
        connection.query(query, [nuevoProducto, id], (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results.affectedRows > 0);
        });
    });
}

// Función para eliminar un producto
function eliminarProducto(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM producto WHERE idProducto = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results.affectedRows > 0);
        });
    });
}

// Función para recuperar un producto por su ID
function getProducto(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM producto WHERE idProducto = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            if (results.length === 0) {
                resolve(null); // No se encontró ningún producto con ese ID
            } else {
                resolve(results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
            }
        });
    });
}

module.exports = { getProductos, getProducto, crearProducto, actualizarProducto, eliminarProducto };