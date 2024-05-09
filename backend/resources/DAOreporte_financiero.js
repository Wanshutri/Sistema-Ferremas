const conectar = require('./connection');

// Función para crear un nuevo reporte financiero
function crearReporteFinanciero(reporte) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO reporte_financiero SET ?';
        connection.query(query, reporte, (error, results, fields) => {
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

// Función para recuperar un reporte financiero por su ID
function getReporteFinanciero(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM reporte_financiero WHERE idReporteFinanciero = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            if (results.length === 0) {
                resolve(null); // No se encontró ningún reporte financiero con ese ID
            } else {
                resolve(results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
            }
        });
    });
}

// Función para recuperar todos los reportes financieros
function getReportesFinancieros() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM reporte_financiero';
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

// Función para eliminar un reporte financiero
function eliminarReporteFinanciero(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM reporte_financiero WHERE idReporteFinanciero = ?';
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

// Función para actualizar un reporte financiero existente
function actualizarReporteFinanciero(id, nuevoReporte) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'UPDATE reporte_financiero SET ? WHERE idReporteFinanciero = ?';
        connection.query(query, [nuevoReporte, id], (error, results, fields) => {
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


module.exports = { crearReporteFinanciero, actualizarReporteFinanciero, getReporteFinanciero, getReportesFinancieros, eliminarReporteFinanciero };
