const conectar = require('./connection');

function crearCarrito(carrito) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO carrito SET ?';
        connection.query(query, carrito, (error, results, fields) => {
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

function getCarritoPorUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM detalle_carrito WHERE (SELECT idCarrito FROM carrito WHERE idUsuario = ?) = idCarrito';
        connection.query(query, idUsuario, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results[0]); // Suponiendo que un usuario solo tenga un carrito
        });
    });
}

function agregarProductoAlCarrito(idCarrito, idProducto, cantidadProducto) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO detalle_carrito (idCarrito, idProducto, cantidadProducto) VALUES (?, ?, ?)';
        connection.query(query, [idCarrito, idProducto, cantidadProducto], (error, results, fields) => {
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

function eliminarProductoDelCarrito(idCarrito, idProducto) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM detalle_carrito WHERE idCarrito = ? AND idProducto = ?';
        connection.query(query, [idCarrito, idProducto], (error, results, fields) => {
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

module.exports = { crearCarrito, getCarritoPorUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito };
