const conectar = require('./connection'); // Importa la función de conexión
const carritoDAO = require('./DAOcarrito');
const bcrypt = require('bcrypt');

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
        // Generar hash de la contraseña
        bcrypt.hash(usuario.contrasenaUsuario, 10, (error, hash) => {
            if (error) {
                console.error('Error al hacer hash de la contraseña:', error);
                reject(error);
                return;
            }
            // Reemplazar la contraseña en texto plano por el hash
            usuario.contrasenaUsuario = hash;
            const query = 'INSERT INTO usuario SET ?';
            connection.query(query, usuario, (error, results, fields) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    connection.end();
                    reject(error);
                    return;
                }
                // Obtiene el ID del usuario recién creado
                const usuarioId = results.insertId;
                connection.end();
                // Crea un carrito para el usuario utilizando el ID generado
                crearCarritoParaUsuario(usuarioId)
                    .then(() => {
                        resolve(usuarioId); // Resuelve con el ID del usuario
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        });
    });
}

// Función auxiliar para crear un carrito para un usuario
function crearCarritoParaUsuario(idUsuario) {
    return new Promise((resolve, reject) => {
        // Define el objeto del carrito con el ID del usuario
        const carrito = {
            idUsuario: idUsuario
        };
        // Llama a la función crearCarrito con el objeto del carrito
        carritoDAO.crearCarrito(carrito)
            .then(carritoId => {
                resolve(carritoId); // Resuelve con el ID del carrito
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Función para actualizar un Usuario existente
function actualizarUsuario(id, nuevoUsuario) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        // Si se está actualizando la contraseña, hacer hash del nuevo valor
        if (nuevoUsuario.contrasenaUsuario) {
            bcrypt.hash(nuevoUsuario.contrasenaUsuario, 10, (error, hash) => {
                if (error) {
                    console.error('Error al hacer hash de la contraseña:', error);
                    reject(error);
                    return;
                }
                nuevoUsuario.contrasenaUsuario = hash;
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
        } else {
            // Si no se está actualizando la contraseña, realizar la actualización normalmente
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
        }
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

// Función para autenticar un usuario
function autenticarUsuario(correo, contrasena) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM usuario WHERE correoUsuario = ?';
        connection.query(query, correo, (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            if (results.length === 0) {
                // No se encontró ningún usuario con ese correo
                resolve(null);
            } else {
                const usuario = results[0];
                // Comparar la contraseña proporcionada con el hash almacenado
                bcrypt.compare(contrasena, usuario.contrasenaUsuario, (error, match) => {
                    if (error) {
                        console.error('Error al comparar contraseñas:', error);
                        reject(error);
                        return;
                    }
                    if (match) {
                        // La contraseña es correcta
                        resolve(usuario);
                    } else {
                        // La contraseña es incorrecta
                        resolve(null);
                    }
                });
            }
        });
    });
}

module.exports = { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, eliminarUsuario, autenticarUsuario };