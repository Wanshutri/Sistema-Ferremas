const conectar = require('./connection'); // Importa la función de conexión

// Función para recuperar todos los Usuarios de la base de datos
function getUsuarios() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM usuario';
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

// Función para crear un nuevo Usuario
function crearUsuario(usuario) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO usuario SET ?';
        connection.query(query, usuario, (error, results, fields) => {
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

// Función para actualizar un Usuario existente
function actualizarUsuario(id, nuevoUsuario) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'UPDATE usuario SET ? WHERE idUsuario = ?';
        connection.query(query, [nuevoUsuario, id], (error, results, fields) => {
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

// Función para eliminar un Usuario
function eliminarUsuario(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM usuario WHERE idUsuario = ?';
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

// Función para recuperar un Usuario por su ID
function getUsuario(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM usuario WHERE idUsuario = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            if (results.length === 0) {
                resolve(null); // No se encontró ningún Usuario con ese ID
            } else {
                resolve(results[0]); // Devuelve el primer resultado encontrado (debería ser único por el ID)
            }
        });
    });
}

module.exports = { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, eliminarUsuario };