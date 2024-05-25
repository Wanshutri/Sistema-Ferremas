const conectar = require('./connection'); // Importa la función de conexión

// Función para validar un producto
function validarProducto(producto, callback) {
    try {
        if (producto.nombreProducto.length <= 2) {
            throw new Error('El nombre del producto es muy corto');
        }
        if (producto.descripcion.length <= 2) {
            throw new Error('La descripción del producto es muy corta');
        }
        if (producto.precioProducto < 0) {
            throw new Error('El precio del producto no puede ser negativo');
        }
        if (producto.stock < 0) {
            throw new Error('El stock del producto no puede ser negativo');
        }
        callback(null); // No hay errores
    } catch (err) {
        callback(err); // Pasar el error al callback
    }
}

// Función para recuperar todos los productos de la base de datos
function getProductos(callback) {
    const connection = conectar();
    const query = 'SELECT * FROM producto';
    connection.query(query, (error, results, fields) => {
        connection.end();
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results);
    });
}

// Función para crear un nuevo producto
function crearProducto(producto, callback) {
    validarProducto(producto, (error) => {
        if (error) {
            return callback(error);
        }

        const connection = conectar();
        const query = 'INSERT INTO producto SET ?';
        connection.query(query, producto, (error, results, fields) => {
            connection.end();
            if (error) {
                return callback(error);
            }
            callback(null, results.insertId);
        });
    });
}

// Función para actualizar un producto existente
function actualizarProducto(id, nuevoProducto, callback) {
    validarProducto(nuevoProducto, (error) => {
        if (error) {
            return callback(error);
        }

        const connection = conectar();
        const query = 'UPDATE producto SET ? WHERE idProducto = ?';
        connection.query(query, [nuevoProducto, id], (error, results, fields) => {
            connection.end();
            if (error) {
                return callback(error);
            }
            callback(null, results.affectedRows > 0);
        });
    });
}

// Función para eliminar un producto
function eliminarProducto(id, callback) {
    const connection = conectar();
    const query = 'DELETE FROM producto WHERE idProducto = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        if (error) {
            return callback(error);
        }
        callback(null, results.affectedRows > 0);
    });
}

// Función para recuperar un producto por su ID
function getProducto(id, callback) {
    const connection = conectar();
    const query = 'SELECT * FROM producto WHERE idProducto = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        if (error) {
            callback(error, null);
            return;
        }
        if (results.length === 0) {
            callback(null, null); // No se encontró ningún producto con ese ID
        } else {
            callback(null, results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
        }
    });
}

module.exports = { getProductos, getProducto, crearProducto, actualizarProducto, eliminarProducto };
