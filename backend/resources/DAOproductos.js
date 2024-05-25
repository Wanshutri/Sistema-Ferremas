const conectar = require('./connection'); // Importa la función de conexión

function validarProducto(producto) {
    try {
        if (producto.nombreProducto.length <= 2) {
            throw new Error('El nombre del producto es muy corto')
        }
        if (producto.descripcion.length <= 2) {
            throw new Error('La descripcion del producto es muy corto')
        }
        if (producto.precioProducto < 0) {
            throw new Error('El precio del producto no puede ser negativo')
        }
        if (producto.stock < 0) {
            throw new Error('El stock del producto no puede ser negativo')
        }
    } catch (err) {
        throw new Error(err.message)
    }
}

// Función para recuperar todos los productos de la base de datos
function getProductos() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM producto';
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

// Función para crear un nuevo producto
function crearProducto(producto) {
    return new Promise((resolve, reject) => {
        validarProducto(producto).then(() => {
            const connection = conectar();
            const query = 'INSERT INTO producto SET ?';
            connection.query(query, producto, (error, results, fields) => {
                if (error) {
                    connection.end();
                    reject(error);
                    return;
                }
                connection.end();
                resolve(results.insertId);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}


// Función para actualizar un producto existente
function actualizarProducto(id, nuevoProducto) {
    return new Promise((resolve, reject) => {
        validarProducto(nuevoProducto).then(() => {
            const connection = conectar();
            const query = 'UPDATE producto SET ? WHERE idProducto = ?';
            connection.query(query, [nuevoProducto, id], (error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results.affectedRows > 0);
        });
        }).catch((error) => {
            reject(error)
        })
        
    });
}

// Función para eliminar un producto
function eliminarProducto(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM producto WHERE idProducto = ?';
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
function getProducto(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM producto WHERE idProducto = ?';
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

module.exports = { getProductos, getProducto, crearProducto, actualizarProducto, eliminarProducto };