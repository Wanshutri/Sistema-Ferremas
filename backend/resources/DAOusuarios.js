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
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results);
        });
    });
}

var FnRut = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
        rutCompleto = rutCompleto.replace("‐", "-");
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
            return false;
        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == 'K') digv = 'k';

        return (FnRut.dv(rut) == digv);
    },
    dv: function (T) {
        var M = 0, S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}

// Función para validar el usuario antes de crearlo
async function validarUsuario(usuario, nuevo, usuarioActual) {
    try {
        usuario.correoUsuario = usuario.correoUsuario.trim();
        usuario.contrasenaUsuario = usuario.contrasenaUsuario.trim();
        usuario.rutUsuario = usuario.rutUsuario.trim();
        usuario.pNombre = usuario.pNombre.trim();
        usuario.sNombre = usuario.sNombre ? usuario.sNombre.trim() : null;
        usuario.pApellido = usuario.pApellido.trim();
        usuario.sApellido = usuario.sApellido.trim();
        usuario.direccion = usuario.direccion.trim();

        const usuarios = await getUsuarios();

        const usuarioExistenteCorreo = usuarios.find(u => u.correoUsuario === usuario.correoUsuario);
        if ((usuarioExistenteCorreo && nuevo) || (usuarioActual.correoUsuario != usuario.correoUsuario)) {
            throw new Error('El correo electrónico ya está en uso');
        }

        const usuarioExistenteRut = usuarios.find(u => u.rutUsuario === usuario.rutUsuario);
        if ((usuarioExistenteRut && nuevo) || (usuarioActual.rutUsuario != usuario.rutUsuario)) {
            throw new Error('El RUT ya está en uso');
        }

        // Verificar que el correo electrónico sea válido
        if (!usuario.correoUsuario || !/\S+@\S+\.\S+/.test(usuario.correoUsuario)) {
            throw new Error('El correo electrónico no es válido');
        }

        // Verificar que la contraseña tenga al menos 8 caracteres, incluyendo al menos un número, una letra minúscula y una letra mayúscula
        if (!usuario.contrasenaUsuario || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(usuario.contrasenaUsuario)) {
            throw new Error('La contraseña no es segura');
        }

        // Verificar que el RUT sea válido
        if (!FnRut.validaRut(usuario.rutUsuario)) {
            throw new Error('El RUT no es válido');
        }

        // Verificar que el número de celular tenga 9 caracteres
        if (usuario.celular.toString().length !== 9) {
            throw new Error('El número de celular debe tener exactamente 9 dígitos');
        }

        const usuarioExistenteTelefono = usuarios.find(u => u.celular === usuario.celular);
        if ((usuarioExistenteTelefono && nuevo) || (usuarioActual.celular != usuario.celular)) {
            throw new Error('El número de celular ya está registrado');
        }

        if (usuario.direccion.length < 10) {
            throw new Error('La dirección debe tener al menos 10 caracteres');
        }

        // Verificar que el usuario tenga al menos 18 años
        const fechaNacimiento = new Date(usuario.fechaNac);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        if (edad < 18) {
            throw new Error('El usuario debe tener al menos 18 años');
        }

        // Verificar longitud de nombres y apellidos
        if (usuario.pNombre.length < 2 || usuario.pApellido.length < 2 || usuario.sApellido.length < 2) {
            throw new Error('Los nombres y apellidos deben tener al menos 2 caracteres');
        }

        if (usuario.sNombre && usuario.sNombre.length < 2) {
            throw new Error('El segundo nombre debe tener al menos 2 caracteres');
        }

        // Si todas las validaciones pasan, retorna true
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Función para crear un nuevo Usuario
function crearUsuario(usuario) {
    return new Promise((resolve, reject) => {
        // Validar el usuario antes de crearlo
        validarUsuario(usuario, true, usuario).then(() => {
                const connection = conectar();
                // Generar hash de la contraseña
                bcrypt.hash(usuario.contrasenaUsuario, 10, (error, hash) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    // Reemplazar la contraseña en texto plano por el hash
                    usuario.contrasenaUsuario = hash;
                    const query = 'INSERT INTO usuario SET ?';
                    connection.query(query, usuario, (error, results, fields) => {
                        if (error) {
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
            })
            .catch(error => {
                reject(error); // Si la validación falla, rechaza la promesa con el error correspondiente
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
function actualizarUsuario(id, nuevoUsuario, usuario) {
    return new Promise((resolve, reject) => {
        // Validar el nuevo usuario antes de actualizarlo
        validarUsuario(nuevoUsuario, false, usuario).then(() => {
                const connection = conectar();
                // Si se está actualizando la contraseña, hacer hash del nuevo valor
                if (nuevoUsuario.contrasenaUsuario) {
                    bcrypt.hash(nuevoUsuario.contrasenaUsuario, 10, (error, hash) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        nuevoUsuario.contrasenaUsuario = hash;
                        const query = 'UPDATE usuario SET ? WHERE idUsuario = ?';
                        connection.query(query, [nuevoUsuario, id], (error, results, fields) => {
                            if (error) {
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
                            connection.end();
                            reject(error);
                            return;
                        }
                        connection.end();
                        resolve(results.affectedRows > 0);
                    });
                }
            })
            .catch(error => {
                reject(error); // Si la validación falla, rechaza la promesa con el error correspondiente
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