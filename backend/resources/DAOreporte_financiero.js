const conectar = require('./connection');

// Función para crear un nuevo reporte financiero
function crearReporteFinanciero(reporte, callback) {
    const connection = conectar();
    const query = 'INSERT INTO reporte_financiero SET ?';
    connection.query(query, reporte, (error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        callback(null, results.insertId);
    });
}

// Función para recuperar un reporte financiero por su ID
function getReporteFinanciero(id, callback) {
    const connection = conectar();
    const query = 'SELECT * FROM reporte_financiero WHERE idReporteFinanciero = ?';
    connection.query(query, id, (error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        if (results.length === 0) {
            callback(null, null); // No se encontró ningún reporte financiero con ese ID
        } else {
            callback(null, results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
        }
    });
}

// Función para recuperar todos los reportes financieros
function getReportesFinancieros(callback) {
    const connection = conectar();
    const query = 'SELECT * FROM reporte_financiero';
    connection.query(query, (error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        callback(null, results);
    });
}

// Función para eliminar un reporte financiero
function eliminarReporteFinanciero(id, callback) {
    const connection = conectar();
    const query = 'DELETE FROM reporte_financiero WHERE idReporteFinanciero = ?';
    connection.query(query, id, (error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        callback(null, results.affectedRows > 0);
    });
}

// Función para actualizar un reporte financiero existente
function actualizarReporteFinanciero(id, nuevoReporte, callback) {
    const connection = conectar();
    const query = 'UPDATE reporte_financiero SET ? WHERE idReporteFinanciero = ?';
    connection.query(query, [nuevoReporte, id], (error, results, fields) => {
        if (error) {
            connection.end();
            return callback(error, null);
        }
        connection.end();
        callback(null, results.affectedRows > 0);
    });
}

module.exports = { crearReporteFinanciero, actualizarReporteFinanciero, getReporteFinanciero, getReportesFinancieros, eliminarReporteFinanciero };