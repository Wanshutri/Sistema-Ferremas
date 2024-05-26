const conectar = require('./connection');

function crearDeposito(deposito, callback) {
    const connection = conectar();
    const query = 'INSERT INTO deposito SET ?';
    connection.query(query, deposito, (error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        callback(null, results.insertId);
    });
}

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

function getDepositos(callback) {
    const connection = conectar();
    const query = 'SELECT * FROM deposito';
    connection.query(query, (error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        callback(null, results);
    });
}

function getDepositosUsuario(id, callback) {
    const connection = conectar();
    const query = 'SELECT * FROM deposito WHERE idUsuario = ?';
    connection.query(query, id ,(error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        callback(null, results);
    });
}

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

const actualizarDeposito = (id, datos, callback) => {
    // Asumiendo que estás usando algún ORM o directamente SQL
    // Aquí te dejo un ejemplo con pseudo código
    const sql = `UPDATE depositos SET estadoDeposito = ? WHERE id = ?`;
    const params = [datos.estadoDeposito, id];

    // Ejemplo usando un método ficticio `db.run`
    db.run(sql, params, function(error) {
        if (error) {
            return callback(error);
        }
        callback(null, { id, ...datos });
    });
};


module.exports = { crearDeposito, eliminarDeposito, getDeposito, getDepositos, getDepositosUsuario, actualizarDeposito };
