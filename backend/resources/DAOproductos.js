const conectar = require('./connection'); // Importa la función de conexión

// Función para validar un producto
function validarProducto(producto, callback) {
    let error = null;

    if (producto.nombreProducto.length <= 2) {
        error = new Error('El nombre del producto es muy corto');
    } else if (producto.descripcion.length <= 2) {
        error = new Error('La descripción del producto es muy corta');
    } else if (producto.precioProducto < 0) {
        error = new Error('El precio del producto no puede ser negativo');
    } else if (producto.stock < 0) {
        error = new Error('El stock del producto no puede ser negativo');
    }

    callback(error); // No hay errores si error es null
}

// Función para recuperar todos los productos de la base de datos
function getProductos(callback) {
    const connection = conectar();
    const query = 'SELECT * FROM producto';
    connection.query(query, (error, results, fields) => {
        connection.end();
        callback(error, results); // Devuelve error y resultados al callback
    });
}

// Función para crear un nuevo producto
function crearProducto(producto, callback) {
    validarProducto(producto, (error) => {
        if (error) {
            return callback(error); // Si hay error, pasa el error al callback
        }

        const connection = conectar();
        const query = 'INSERT INTO producto SET ?';
        connection.query(query, producto, (error, results, fields) => {
            connection.end();
            callback(error, results ? results.insertId : null); // Devuelve error y el ID insertado al callback
        });
    });
}

// Función para actualizar un producto existente
function actualizarProducto(id, nuevoProducto, callback) {
    validarProducto(nuevoProducto, (error) => {
        if (error) {
            return callback(error); // Si hay error, pasa el error al callback
        }

        const connection = conectar();
        const query = 'UPDATE producto SET ? WHERE idProducto = ?';
        connection.query(query, [nuevoProducto, id], (error, results, fields) => {
            connection.end();
            callback(error, results ? results.affectedRows > 0 : false); // Devuelve error y true si se afectaron filas, de lo contrario false
        });
    });
}

// Función para eliminar un producto
function eliminarProducto(id, callback) {
    const connection = conectar();
    const query = 'DELETE FROM producto WHERE idProducto = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        callback(error, results ? results.affectedRows > 0 : false); // Devuelve error y true si se afectaron filas, de lo contrario false
    });
}

// Función para recuperar un producto por su ID
function getProducto(id, callback) {
    const connection = conectar();
    const query = 'SELECT * FROM producto WHERE idProducto = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        if (results && results.length === 0) {
            callback(null, null); // No se encontró ningún producto con ese ID
        } else {
            callback(error, results ? results[0] : null); // Devuelve error y el primer resultado encontrado
        }
    });
}

module.exports = { getProductos, getProducto, crearProducto, actualizarProducto, eliminarProducto };