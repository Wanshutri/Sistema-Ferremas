const conectar = require('./connection');
const boletaDAO = require('./DAOboletas');

// Función para crear un nuevo pago
function crearPago(pago) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO pago SET ?';
        connection.query(query, pago, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            // Crear una nueva boleta asociada al pago
            const boleta = {
                fechaBoleta: new Date(), // Usar la fecha actual como fecha de la boleta
                monto: pago.monto, // Utilizar el monto del pago como monto de la boleta
                idPago: results.insertId // Obtener el ID del pago recién creado
            };
            boletaDAO.crearBoleta(boleta)
                .then(boletaId => {
                    connection.end();
                    resolve({ pagoId: results.insertId, boletaId: boletaId });
                })
                .catch(error => {
                    connection.end();
                    reject(error);
                });
        });
    });
}

// Función para actualizar un pago existente
function actualizarPago(id, nuevoPago) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'UPDATE pago SET ? WHERE idPago = ?';
        connection.query(query, [nuevoPago, id], (error, results, fields) => {
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

// Función para eliminar un pago y su boleta asociada
function eliminarPago(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM pago WHERE idPago = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            // Eliminar la boleta asociada al pago
            boletaDAO.eliminarBoleta(id)
                .then(success => {
                    connection.end();
                    resolve(success);
                })
                .catch(error => {
                    connection.end();
                    reject(error);
                });
        });
    });
}

// Función para recuperar un pago por su ID
function getPago(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM pago WHERE idPago = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            if (results.length === 0) {
                resolve(null); // No se encontró ningún pago con ese ID
            } else {
                resolve(results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
            }
        });
    });
}

// Función para recuperar todos los pagos
function getPagos() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM pago';
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

module.exports = { crearPago, actualizarPago, eliminarPago, getPago, getPagos };
