const conectar = require('./connection');

// Función para recuperar todas las órdenes de pedido de la base de datos
function getOrdenesPedido() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM ordenPedido';
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

// Función para crear una nueva orden de pedido
function crearOrdenPedido(ordenPedido) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO ordenPedido SET ?';
        connection.query(query, ordenPedido, (error, results, fields) => {
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

// Función para actualizar una orden de pedido existente
function actualizarOrdenPedido(id, nuevaOrdenPedido) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'UPDATE ordenPedido SET ? WHERE idOrdenPedido = ?';
        connection.query(query, [nuevaOrdenPedido, id], (error, results, fields) => {
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

// Función para eliminar una orden de pedido
function eliminarOrdenPedido(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM ordenPedido WHERE idOrdenPedido = ?';
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

// Función para recuperar una orden de pedido por su ID
function getOrdenPedido(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM ordenPedido WHERE idOrdenPedido = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            if (results.length === 0) {
                resolve(null); // No se encontró ninguna orden de pedido con ese ID
            } else {
                resolve(results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
            }
        });
    });
}

module.exports = { getOrdenesPedido, getOrdenPedido, crearOrdenPedido, actualizarOrdenPedido, eliminarOrdenPedido };
