const conectar = require('./connection'); // Importa la función de conexión

// Función para recuperar todas las Boletas de la base de datos
function getBoletas() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM boleta';
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

// Función para crear una nueva Boleta
function crearBoleta(boleta) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO boleta SET ?';
        connection.query(query, boleta, (error, results, fields) => {
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

// Función para actualizar una Boleta existente
function actualizarBoleta(id, nuevaBoleta) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'UPDATE boleta SET ? WHERE idBoleta = ?';
        connection.query(query, [nuevaBoleta, id], (error, results, fields) => {
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

// Función para eliminar una Boleta
function eliminarBoleta(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM boleta WHERE idBoleta = ?';
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

// Función para recuperar una Boleta por su ID
function getBoleta(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM boleta WHERE idBoleta = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            if (results.length === 0) {
                resolve(null); // No se encontró ninguna Boleta con ese ID
            } else {
                resolve(results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
            }
        });
    });
}

// Función para recuperar productos de una boleta
function getProductosBoleta(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM detalle_boleta WHERE idBoleta = ?';
        connection.query(query, id, (error, results, fields) => {
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

module.exports = { getBoletas, getBoleta, crearBoleta, actualizarBoleta, eliminarBoleta };