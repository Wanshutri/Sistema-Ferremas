const conectar = require('./connection'); // Importa la función de conexión

// Función para recuperar todos los productos de la base de datos
function getTiposProducto() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM tipo_producto';
        connection.query(query, (error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results);
        });
    });
}

// Función para crear un nuevo tipo de producto
function crearTipoProducto(tipoProducto) {
    return new Promise((resolve, reject) => {
        if (tipoProducto.nombreTipo.length <= 2) {
            reject(new Error('El nombre del tipo de producto debe tener al menos 3 caracteres.'));
            return;
        }
        const connection = conectar();
        const query = 'INSERT INTO tipo_producto SET ?';
        connection.query(query, tipoProducto, (error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results.insertId);
        });
    });
}

// Función para actualizar un tipo de producto existente
function actualizarTipoProducto(id, nuevoProducto) {
    return new Promise((resolve, reject) => {
        // Verificar si el nombre del nuevo tipo de producto tiene al menos 3 caracteres
        if (nuevoProducto.nombreTipo.length <= 2) {
            reject(new Error('El nuevo nombre del tipo de producto debe tener al menos 3 caracteres.'));
            return;
        }
        const connection = conectar();
        const query = 'UPDATE tipo_producto SET ? WHERE idTipoProducto = ?';
        connection.query(query, [nuevoProducto, id], (error, results, fields) => {
            if (error) {
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
function eliminarTipoProducto(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM tipo_producto WHERE idTipoProducto = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
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
function getTipoProducto(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM tipo_producto WHERE idTipoProducto = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
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

module.exports = { actualizarTipoProducto, crearTipoProducto, eliminarTipoProducto, getTipoProducto, getTiposProducto };