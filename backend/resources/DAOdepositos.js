const conectar = require('./connection'); // Asegúrate de que la ruta al archivo de conexión sea correcta

function crearDeposito(deposito) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO deposito SET ?';
        connection.query(query, deposito, (error, results, fields) => {
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

// Función para eliminar un depósito
function eliminarDeposito(id, callback) {
    const connection = conectar();
    const query = 'DELETE FROM deposito WHERE idDeposito = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results.affectedRows > 0);
    });
}

// Función para recuperar todos los depósitos de la base de datos
function getDepositos() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM deposito';
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

// Función para recuperar los depósitos de un usuario específico
function getDepositosUsuario(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM deposito WHERE idUsuario = ?';
        connection.query(query, id ,(error, results, fields) => {
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

// Función para recuperar un depósito específico
function getDeposito(id, callback) {
    const connection = conectar();
    const query = 'SELECT * FROM deposito WHERE idDeposito = ?';
    connection.query(query, id, (error, results, fields) => {
        connection.end();
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results[0]);
    });
}


module.exports = {crearDeposito, eliminarDeposito, getDeposito, getDepositos, getDepositosUsuario }