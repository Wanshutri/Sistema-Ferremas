const express = require('express');
const cors = require('cors');
const request = require('request')
const fs = require('fs');
const path = require('path');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto, getProducto } = require('./../resources/DAOproductos');
const { actualizarTipoProducto, crearTipoProducto, eliminarTipoProducto, getTipoProducto, getTiposProducto } = require('./../resources/DAOtipo_producto');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, getUsuario, autenticarUsuario } = require('./../resources/DAOusuarios');
const { getBoletas, actualizarBoleta, getBoleta, crearBoleta, eliminarBoleta } = require('./../resources/DAOboletas');
const { getCarritoPorUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito } = require('./../resources/DAOcarrito');
const { eliminarOrdenPedido, actualizarOrdenPedido, crearOrdenPedido, getOrdenPedido, getOrdenesPedido } = require('../resources/DAOorden_pedido');
const { getReportesFinancieros, getReporteFinanciero, crearReporteFinanciero, actualizarReporteFinanciero, eliminarReporteFinanciero } = require('../resources/DAOreporte_financiero');
const nodemailer = require('nodemailer');
const app = express();
const uploader = require('../resources/uploads')
const { crearDeposito, eliminarDeposito, getDeposito, getDepositos, getDepositosUsuario} = require('../resources/DAOdepositos')
const jwt = require('jsonwebtoken');
const { error } = require('console');

const CLIENT = 'AV7RbVPozcoaIgXrxjWQU5WWnGyMyZmMBfauJ16FdFEVU12RTDtFOxSNZzG2GdQUqx5wA6DMwkNR-UfZ';
const SECRET = 'EOPG-J6D3rZmInvrRvQFuw1N9ZLhOGSEgvKToSaTKBdOltHeXdrsDPNDsui6uT9fyqAAKYpYLUX4p04o';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const auth = { user: CLIENT, pass: SECRET };

// Función para generar un código aleatorio
function generarCodigo() {
    return Math.random().toString(36).substring(7).toUpperCase();
}

app.use(cors());
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON
// Configuración para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'uploads')));

// Ruta para la página de documentación
app.get('/', (req, res) => {
    // Lee el contenido del archivo 'doc.html'
    fs.readFile(path.join(__dirname, '..', 'public', 'doc.html'), 'utf8', (err, data) => {
        if (err) {
            res.send({ message : 'Error al cargar la documentación: ', error: err.message });
            return;
        }
        // Envía la respuesta con el contenido HTML del archivo de documentación
        res.send(data);
    });
});

// Ruta para obtener una imagen por su nombre
app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename);
    res.sendFile(filepath);
});

//Depositos

// Ruta para subir un depósito
app.post('/api/depositos', (req, res) => {
    uploader.upload(req, res, (err) => {
        if (!req.body.idUsuario) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res.send({ message: 'Error al eliminar el archivo del sistema de archivos', error: err.message });
                }
            });
            return res.send({ message: 'No se subió ninguna imagen', error: 'Falta id del usuario' });
        }
        if (!req.body.monto) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res.send({ message: 'Error al eliminar el archivo del sistema de archivos', error: err.message });
                }
            });
            return res.send({ message: 'No se subió ninguna imagen', error: 'Falta monto del depósito' });
        }
        if (req.body.monto < 0) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res.send({ message: 'Error al eliminar el archivo del sistema de archivos', error: err.message });
                }
            });
            return res.send({ message: 'No se subió ninguna imagen', error: 'Monto no puede ser negativo' });
        }
        getUsuario(req.body.idUsuario, (error, usuario) => {
            if (error) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        return res.send({ message: 'Error al eliminar el archivo del sistema de archivos', error: err.message });
                    }
                });
                return res.send({ message: 'Error al obtener usuario', error: error.message });
            }
            if (!usuario) {
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err
                });
                return res.send({ message: 'No se subió ninguna imagen', error: 'Usuario no existe' });
            }

            if (err) {
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err
                });
                if (err.code === 'INVALID_FILE_TYPE') {
                    return res.send({ message: 'Error al subir la imagen', error: 'Solo se admiten formatos de imagen' });
                }
                return res.send({ message: 'Error al subir la imagen', error: err.message });
            }

            if (!req.file) {
                return res.send({ message: 'Error al subir la imagen', error: 'No se subió ninguna imagen' });
            }

            const fecha = new Date().toISOString().split('T')[0];
            const deposito = {
                idUsuario: req.body.idUsuario,
                urlComprobante: req.file.filename,
                estadoDeposito: 'P',
                fechaDeposito: fecha,
                monto: req.body.monto
            };

            crearDeposito(deposito, (error) => {
                if (error) {
                    return res.send({ message: 'Ocurrió un error al subir o crear comprobante', error: error.message });
                }
                res.send("Comprobante subido y creado con éxito");
            });
        });
    });
});

// Ruta para eliminar un depósito
app.delete('/api/depositos/:id', (req, res) => {
    const id = req.params.id;
    getDeposito(id, (error, deposito) => {
        if (error) {
            return res.send({ message: 'Error al obtener un depósito', error: error.message });
        }
        if (!deposito) {
            return res.send({ message: 'Error al eliminar un depósito', error: 'Depósito no encontrado' });
        }
        const filePath = path.join(__dirname, '../uploads', deposito.urlComprobante);
        eliminarDeposito(id, (error, success) => {
            if (error) {
                return res.send({ message: 'Error al eliminar el depósito', error: error.message });
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.send({ message: 'Error al eliminar el archivo del sistema de archivos', error: err.message });
                }
                res.send({ message: 'Depósito eliminado correctamente' });
            });
        });
    });
});

// Ruta para obtener todos los depósitos
app.get('/api/depositos', (req, res) => {
    getDepositos((error, depositos) => {
        if (error) {
            return res.send({ message: 'Error al obtener los depósitos', error: error.message });
        }
        res.json(depositos);
    });
});

// Ruta para obtener los depósitos de un usuario específico
app.get('/api/deposito-usuario/:id', (req, res) => {
    const id = req.params.id;
    getDepositosUsuario(id, (error, depositos) => {
        if (error) {
            return res.send({ message: 'Error al obtener depósitos del usuario', error: error.message });
        }
        res.json(depositos);
    });
});

// Ruta para obtener un depósito específico
app.get('/api/depositos/:id', (req, res) => {
    const id = req.params.id;
    getDeposito(id, (error, deposito) => {
        if (error) {
            return res.status(500).send({ message: 'Error al obtener el depósito', error: error.message });
        }
        if (deposito) {
            res.json(deposito);
        } else {
            res.status(404).send({ message: 'Depósito no encontrado' });
        }
    });
});

//PRODUCTOS

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
    getProductos((error, productos) => {
        if (error) {
            return res.send({ message: 'Error al obtener los productos', error: error.message });
        }
        res.json(productos);
    });
});

// Ruta para obtener un producto por su ID
app.get('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    getProducto(id, (error, producto) => {
        if (error) {
            return res.send({ message: 'Error al obtener el producto', error: error.message });
        }
        if (!producto) {
            return res.send({ message: 'Error al obtener el producto', error: 'Producto no encontrado' });
        }
        res.json(producto);
    });
});

// Ruta para crear un nuevo producto
app.post('/api/productos', (req, res) => {
    uploader.upload(req, res, (err) => {
        if (err) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    return res.send({ message: 'Error al eliminar el archivo del sistema de archivos', error: err.message });
                }
            });
            if (err.code === 'INVALID_FILE_TYPE') {
                return res.send({ message: 'Error al subir la imagen', error: 'Solo se admiten formatos de imagen' });
            }
            return res.send({ message: 'Error al subir la imagen', error: err.message });
        }

        if (!req.file) {
            return res.send({ message: 'Error al subir la imagen', error: 'No se subió ninguna imagen' });
        }

        const nuevoProducto = req.body;
        const fecha = new Date().toISOString().split('T')[0];
        nuevoProducto.urlProducto = req.file.filename;

        crearProducto(nuevoProducto, (error, insertId) => {
            if (error) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        return res.send({ message: 'Error al eliminar el archivo del sistema de archivos', error: err.message });
                    }
                });
                return res.send({ message: 'Error al crear producto', error: error.message });
            }
            res.json({ id: insertId, message: 'Producto creado exitosamente' });
        });
    });
});

// Ruta para actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    if (!req.body.nombreProducto) {
        return res.send({message : "Error al actualizar el producto", error: "Debe haber un nombre de producto"})
    }
    if (!req.body.descripcion) {
        return res.send({message : "Error al actualizar el producto", error: "Debe haber una descripcion de producto"})
    }
    if (!req.body.precioProducto) {
        return res.send({message : "Error al actualizar el producto", error: "Debe haber un precio de producto"})
    }
    if (!req.body.idTipoProducto) {
        return res.send({message : "Error al actualizar el producto", error: "Debe tener un tipo de producto vinculado"})
    }
    if (!req.body.stock) {
        return res.send({message : "Error al actualizar el producto", error: "Debe tener un stock de producto"})
    }
    const nuevoProducto = {
        nombreProducto: req.body.nombreProducto,
        descripcion: req.body.descripcion,
        precioProducto: req.body.precioProducto,
        idTipoProducto: req.body.idTipoProducto,
        stock: req.body.stock
    };
    actualizarProducto(id, nuevoProducto, (error, success) => {
        if (error) {
            return res.send({ message: 'Error al actualizar producto', error: error.message });
        }
        if (success) {
            res.send({ message: 'Producto actualizado exitosamente', producto: nuevoProducto });
        } else {
            res.send({ message: 'Error al actualizar producto', error: 'Producto no encontrado' });
        }
    });
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    getProducto(id, (error, producto) => {
        if (error) {
            return res.send({ message: 'Error al obtener un producto', error: error.message });
        }
        if (!producto) {
            return res.send({ message: 'Error al eliminar un producto', error: 'Producto no encontrado' });
        }
        const filePath = path.join(__dirname, '../uploads', producto.urlProducto);
        eliminarProducto(id, (error, success) => {
            if (error) {
                return res.send({ message: 'Error al eliminar el producto', error: error.message });
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.send({ message: 'Error al eliminar el archivo del sistema de archivos: ', error: err.message });
                }
                res.send({ message: 'Producto eliminado correctamente' });
            });
        });
    });
});

//TIPO PRODUCTOS

// Ruta para obtener un tipo de producto por su ID
app.get('/api/tipo-productos/:id', (req, res) => {
    const id = req.params.id;
    getTipoProducto(id, (error, tipo_producto) => {
        if (error) {
            return res.send({ message: 'Error al obtener tipo producto', error: error.message });
        }
        if (tipo_producto) {
            res.json(tipo_producto);
        } else {
            res.send({ message: 'Error al obtener tipo producto', error: 'Tipo producto no encontrado' });
        }
    });
});

app.get('/api/tipo-productos', (req, res) => {
    getTiposProducto((error, tipo_producto) => {
        if (error) {
            return res.send({ message: 'Error al obtener tipo producto', error: error.message });
        }
        if (tipo_producto) {
            res.json(tipo_producto);
        } else {
            res.send({ message: 'Error al obtener tipo producto', error: 'Tipo producto no encontrado' });
        }
    });
});

// Ruta para crear un nuevo tipo producto
app.post('/api/tipo-productos', (req, res) => {
    if (!req.body.nombreTipo) {
        return res.send({ message: 'Error al crear tipo producto', error: 'Debe haber un nombre de tipo producto' });
    }
    crearTipoProducto(req.body.nombreTipo, (error, insertId) => {
        if (error) {
            return res.send({ message: 'Error al crear tipo producto', error: error.message });
        }
        res.json({ id: insertId, message: 'Tipo producto creado exitosamente' });
    });
});

// Ruta para actualizar un producto existente
app.put('/api/tipo-productos/:id', (req, res) => {
    const id = req.params.id;
    const nombreTipo = req.body.nombreTipo;

    if (!nombreTipo) {
        return res.send({ message: 'Error al actualizar tipo producto', error: 'Debe haber un nombre de tipo de producto.' });
    }

    actualizarTipoProducto(id, nombreTipo, (error, success) => {
        if (error) {
            return res.send({ message: 'Error al actualizar tipo producto', error: error.message });
        }
        if (success) {
            res.json({ message: 'Tipo producto actualizado exitosamente' });
        } else {
            res.send('Tipo producto no encontrado');
        }
    });
});

// Ruta para eliminar un producto
app.delete('/api/tipo-productos/:id', (req, res) => {
    const id = req.params.id;
    eliminarTipoProducto(id, (error, success) => {
        if (error) {
            return res.send({ message: 'Error al eliminar tipo producto', error: error.message });
        }
        if (success) {
            res.json({ message: 'Tipo producto eliminado exitosamente' });
        } else {
            res.send({ message: 'Error al eliminar tipo producto', error: 'Tipo producto no encontrado' });
        }
    });
});

//USUARIOS

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    getUsuarios((err, usuarios) => {
        if (err) {
            res.send({ message: 'Error al obtener usuarios', error: err.message });
        } else {
            res.json(usuarios);
        }
    });
});

// Ruta para obtener un usuario por su ID
app.get('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    getUsuario(id, (err, usuario) => {
        if (err) {
            res.send({ message: 'Error al obtener usuario', error: err.message });
        } else if (usuario) {
            res.json(usuario);
        } else {
            res.send('Usuario no encontrado');
        }
    });
});

// Ruta para autenticar al usuario
app.post('/api/autenticar', (req, res) => {
    const correo = req.body.correoUsuario;
    const contrasenaUsuario = req.body.contrasenaUsuario;

    if (!correo) {
        return res.send({ message: "Error al autenticar", error: "Se necesita un correo" });
    }

    if (!contrasenaUsuario) {
        return res.send({ message: "Error al autenticar", error: "Se necesita una clave" });
    }

    autenticarUsuario(correo, contrasenaUsuario, (err, usuario) => {
        if (err) {
            res.send({ message: 'Error al autenticar al usuario', error: err.message });
        } else if (usuario) {
            // Generar token JWT
            const token = jwt.sign({ id: usuario.idUsuario }, 'SistemaFerremasTokensDeMierdaAhoraEsPersonal2', {
                expiresIn: '100y' // El token expira en 100 años jajaj lol
            });
            // Crear un objeto que contenga tanto el token como los datos del usuario
            const responseData = {
                token: token,
                usuario: usuario
            };
            // Enviar la respuesta con el objeto que contiene el token y los datos del usuario
            res.json(responseData);
        } else {
            res.send({ message: 'Error al autenticar al usuario', error: 'Usuario no encontrado' });
        }
    });
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    crearUsuario(nuevoUsuario, (err, insertId) => {
        if (err) {
            res.send({ message: 'Error al crear usuario', error: err.message });
        } else {
            res.json({ id: insertId, message: 'Usuario creado exitosamente' });
        }
    });
});

// Ruta para actualizar un usuario existente
app.put('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const nuevoUsuario = req.body;

    getUsuario(id, (err, usuarioActual) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener usuario', error: err.message });
        } else if (!usuarioActual) {
            res.status(404).json({ message: 'Error al actualizar usuario', error: 'Usuario no encontrado' });
        } else {
            actualizarUsuario(id, nuevoUsuario, (err, success) => {
                if (err) {
                    res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
                } else if (success) {
                    res.json({ message: 'Usuario actualizado exitosamente' });
                } else {
                    res.status(500).json({ message: 'Error al actualizar usuario', error: 'Error desconocido' });
                }
            });
        }
    });
});

// Ruta para eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    eliminarUsuario(id, (err, success) => {
        if (err) {
            res.send({ message: 'Error al eliminar usuario', error: err.message });
        } else if (success) {
            res.json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.send({ message: 'Error al eliminar usuario', error: 'Usuario no encontrado' });
        }
    });
});

//BOLETAS

// Ruta para obtener todas las boletas
app.get('/api/boletas', (req, res) => {
    getBoletas((err, boletas) => {
        if (err) {
            return res.send({ message: 'Error al obtener boletas', error: err.message });
        }
        res.json(boletas);
    });
});

// Ruta para obtener una boleta por su ID
app.get('/api/boletas/:id', (req, res) => {
    const id = req.params.id;
    getBoleta(id, (err, boleta) => {
        if (err) {
            return res.send({ message: 'Error al obtener boleta', error: err.message });
        }
        if (boleta) {
            res.json(boleta);
        } else {
            res.send({ message: 'Error al obtener boleta', error: 'Boleta no encontrada' });
        }
    });
});

// Ruta para actualizar una boleta existente
app.put('/api/boletas/:id', (req, res) => {
    const id = req.params.id;
    const nuevaBoleta = req.body;
    actualizarBoleta(id, nuevaBoleta, (err, success) => {
        if (err) {
            return res.send({ message: 'Error al actualizar boleta', error: err.message });
        }
        if (success) {
            res.json({ message: 'Boleta actualizada exitosamente' });
        } else {
            res.send({ message: 'Error al actualizar boleta', error: 'Boleta no encontrada' });
        }
    });
});

// Ruta para eliminar un usuario
app.delete('/api/boletas/:id', (req, res) => {
    const id = req.params.id;
    eliminarBoleta(id, (err, success) => {
        if (err) {
            res.send({ message: 'Error al eliminar boleta', error: err.message });
        } else if (success) {
            res.json({ message: 'Boleta eliminada exitosamente' });
        } else {
            res.send({ message: 'Error al eliminar boleta', error: 'Boleta no encontrada' });
        }
    });
});

// CARRITO

// Ruta para obtener el carrito de un usuario
app.get('/api/carrito/:id', (req, res) => {
    const id = req.params.id;
    getCarritoPorUsuario(id, (error, carrito) => {
        if (error) {
            return res.send({ message: 'Error al obtener carrito', error: error.message });
        }
        
        if (carrito.error) {
            return res.send({ message: carrito.message, error: carrito.error });
        }
        
        res.json(carrito);
    });
});

// Ruta para agregar un producto al carrito
app.post('/api/carrito', (req, res) => {
    const { idUsuario, idProducto, cantidadProducto } = req.body;

    // Verificar que se proporcionen los parámetros necesarios
    if (!idUsuario) {
        return res.json({ message: 'No se agregó ningún producto', error: 'Falta el usuario' });
    }
    if (!idProducto) {
        return res.json({ message: 'No se agregó ningún producto', error: 'Falta el producto' });
    }
    if (!cantidadProducto) {
        return res.json({ message: 'No se agregó ningún producto', error: 'Falta la cantidad del producto' });
    }

    getProducto(idProducto, (error, producto) => {
        if (error) {
            return res.json({ message: 'Error al recuperar el producto', error: error.message });
        }
        if (!producto) {
            return res.json({ message: 'No se agregó ningún producto', error: 'El producto no existe' });
        }

        agregarProductoAlCarrito(idUsuario, idProducto, cantidadProducto, (error, resultado) => {
            if (error) {
                return res.json({ message: 'Error al agregar producto al carrito', error: error.message });
            }
            if (resultado.length === 0) {
                return res.json({ message: 'Error al agregar producto al carrito', error: "Carrito esta vacio"});
            }
            return res.json(resultado);
        });
    });
});

// Ruta para eliminar un producto de un carrito DELETE EJEMPLO: /api/carrito?carrito=456&producto=789
app.delete('/api/carrito', (req, res) => {
    const idCarrito = req.body.carrito;
    const idProducto = req.body.producto;

    // Verificar que se proporcionen los parámetros necesarios
    if (!idCarrito) {
        return res.send({ message : ' Error al eliminar producto del carrito', error: 'Falta id del carrito'});
    }

    if (!idProducto) {
        return res.send({ message : ' Error al eliminar producto del carrito', error: 'Falta id del producto'});
    }

    eliminarProductoDelCarrito(idCarrito, idProducto, (error, success) => {
        if (error) {
            res.send({ message: 'Error al eliminar producto del carrito', error: error.message });
        } else {
            if (success) {
                res.json({ message: 'Producto eliminado del carrito exitosamente' });
            } else {
                res.send({ message : ' Error al eliminar producto del carrito', error: 'Producto no encontrado en el carrito'});
            }
        }
    });
});

//ORDENES DE PEDIDO

// Ruta para obtener todos los pedidos de orden
app.get('/api/orden-pedido', (req, res) => {
    getOrdenesPedido((error, ordenesPedido) => {
        if (error) {
            res.send({ message: 'Error al obtener ordenes de pedido', error: error.message });
        } else {
            res.json(ordenesPedido);
        }
    });
});

// Ruta para obtener un pedido de orden por su ID
app.get('/api/orden-pedido/:id', (req, res) => {
    const id = req.params.id;
    getOrdenPedido(id, (error, ordenPedido) => {
        if (error) {
            res.send({ message: 'Error al obtener orden de pedido', error: error.message });
        } else {
            if (ordenPedido) {
                res.json(ordenPedido);
            } else {
                res.send({ message: 'Error al obtener orden de pedido', error: 'Orden de pedido no encontrada' });
            }
        }
    });
});

// Ruta para crear un nuevo pedido de orden
app.post('/api/orden-pedido', (req, res) => {
    if (!req.body.idUsuario) {
        return res.send({ message: 'Error al crear orden de pedido', error: 'Falta el id del usuario' });
    }
    if (!req.body.idBoleta) {
        return res.send({ message: 'Error al crear orden de pedido', error: 'Falta el id de boleta' });
    }
    
    const nuevaOrdenPedido = {
        fechaOrden: new Date().toISOString().split('T')[0],
        idUsuario: req.body.idUsuario,
        idBoleta: req.body.idBoleta
    };

    // Verificar si la boleta existe
    getBoleta(req.body.idBoleta, (error, boleta) => {
        if (error) {
            return res.send({ message: 'Error al crear orden de pedido', error: error.message });
        }

        if (!boleta) {
            return res.send({ message: 'Error al crear orden de pedido', error: 'No se encontró la boleta' });
        }

        // Crear la orden de pedido
        crearOrdenPedido(nuevaOrdenPedido, (error, insertId) => {
            if (error) {
                return res.send({ message: 'Error al crear orden de pedido', error: error.message });
            }
            res.json({ id: insertId, message: 'Orden de pedido creada exitosamente' });
        });
    });
});

// Ruta para actualizar un pedido de orden existente
app.put('/api/orden-pedido/:id', (req, res) => {
    const id = req.params.id;
    const nuevaOrdenPedido = req.body;
    actualizarOrdenPedido(id, nuevaOrdenPedido, (error, success) => {
        if (error) {
            res.send({ message: 'Error al actualizar orden de pedido', error: error.message });
        } else {
            if (success) {
                res.json({ message: 'Orden de pedido actualizada exitosamente' });
            } else {
                res.send({ message: 'Error al actualizar orden de pedido', error: 'Orden de pedido no encontrada' });
            }
        }
    });
});

// Ruta para eliminar un pedido de orden
app.delete('/api/orden-pedido/:id', (req, res) => {
    const id = req.params.id;
    eliminarOrdenPedido(id, (error, success) => {
        if (error) {
            res.send({ message: 'Error al eliminar orden de pedido', error: error.message });
        } else {
            if (success) {
                res.json({ message: 'Orden de pedido eliminada exitosamente' });
            } else {
                res.send({ message: 'Error al eliminar orden de pedido', error: 'Orden de pedido no encontrada' });
            }
        }
    });
});

// Pagos

const createPayment = (req, res) => {
    const costo_compra_clp = req.body.costo; // Suponiendo que costo es el monto en CLP
    const idUser = req.body.idUser;
    if (!req.body.costo || typeof req.body.costo !== 'number') {
        return res.json({ error: 'Se requiere un costo válido en la solicitud.' });
    }
    if (!req.body.idUser) {
        return res.json({ error: 'Se requiere un usuario en la solicitud.' });
    }

    if (req.body.costo < 0) {
        return res.json({error: "El costo debe tener un valor minimo de 5 pesos"})
    }

    getUsuario(idUser, (error, usuario) => {
        if (error) {
            return res.json({ error: 'Error al obtener usuario: ' + error.message });
        }
        if (!usuario) {
            return res.json({ error: 'Usuario no existe' });
        }

        const url_dolar = "https://dolarapi.com/v1/dolares";

        // Obtener el valor del dólar desde la API
        fetch(url_dolar)
            .then(response => response.json())
            .then(data => {
                const valor_dolar = data[0].compra; // Suponiendo que data contiene el valor del dólar
                // Convertir el costo de la compra a USD
                const costo_compra_usd = (costo_compra_clp / valor_dolar).toFixed(2);
                const return_url = `http://localhost:3001/api/ejecutar-pago?monto=${costo_compra_clp}&idUser=${idUser}`;
                const body = {
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            currency_code: 'USD', // https://developer.paypal.com/docs/api/reference/currency-codes/
                            value: costo_compra_usd
                        }
                    }],
                    application_context: {
                        brand_name: `Ferremas`,
                        landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                        user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                        return_url: return_url, // Url despues de realizar el pago
                        cancel_url: `http://localhost:3000/cancelar-pago` // Url despues de cancelar el pago
                    }
                };

                // https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]
                request.post(`${PAYPAL_API}/v2/checkout/orders`, {
                    auth,
                    body,
                    json: true
                }, (error, response) => {
                    if (error) {
                        return res.json({ error: 'Error al crear orden de pago: ' + error.message });
                    }
                    if (response.body.name === 'UNPROCESSABLE_ENTITY') {
                        return res.json({message : "Transferencia incompleta", error: response.body})
                    }
                    return res.json({ message: response.body , paylink: response.body.links[1].href });
                });
            })
            .catch(error => {
                return res.json({ error: 'Error al obtener el valor del dólar: ' + error.message });
            });
    });
};

const executePayment = (req, res) => {
    const token = req.query.token;
    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (error, response) => {
        if (error) {
            return res.json({ error: 'Error al capturar el pago: ' + error.message });
        }

        const total = req.query.monto;
        const idUser = req.query.idUser;
        const fechaBoleta = new Date().toISOString().split('T')[0];
        const nombreFull = response.body.payment_source.paypal.name.given_name + " " + response.body.payment_source.paypal.name.surname 
        const boleta = {
            fechaBoleta : fechaBoleta,
            totalclp: total,
            idUsuario: idUser,
            nombreCompleto: nombreFull,
            countryCode : response.body.payment_source.paypal.address.country_code,
            correo: response.body.payment_source.paypal.email_address,
        };

        crearBoleta(boleta, (error, insertId) => {
            if (error) {
                console.error("Error al crear boleta: " + error.message);
                return res.send({ message: 'Error al crear boleta', error: error.message });
            }

            // Aquí insertId contiene el id generado automáticamente de la boleta creada
            const nuevaOrdenPedido = {
                fechaOrden: new Date().toISOString().split('T')[0],
                idUsuario: idUser,
                idBoleta: insertId  // Usamos el insertId de la boleta creada
            };

            // Crear la orden de pedido
            crearOrdenPedido(nuevaOrdenPedido, (error, insertIdOrden) => {
                if (error) {
                    return res.send({ message: 'Error al crear orden de pedido', error: error.message });
                }
                return res.send({ idBoleta: insertId, idOrdenPedido: insertIdOrden });
            });
        });
    });
};

app.post('/api/crear-pago', createPayment);
app.get('/api/ejecutar-pago', executePayment);

//Reportes financieros

// Ruta para obtener todos los reportes financieros
app.get('/api/reportes-financieros', (req, res) => {
    getReportesFinancieros((error, reportes) => {
        if (error) {
            return res.send({ message: 'Error al obtener los reportes financieros', error: error });
        }
        return res.send(reportes);
    });
});

// Ruta para obtener un reporte financiero por su ID
app.get('/api/reportes-financieros/:id', (req, res) => {
    const idReporte = req.params.id;
    if (!idReporte) {
        return res.send({ message: 'Error al obtener el reporte financiero', error: 'Falta id del reporte' });
    }
    getReporteFinanciero(idReporte, (err, reporte) => {
        if (err) {
            return res.send({ message: 'Error al obtener el reporte financiero', error: error });
        }

        if (!reporte) {
            return res.send({ message: 'Error al obtener el reporte financiero', error: 'No se encontro un reporte financiero' });
        }

        return res.send(reporte);
    });
});

// Ruta para crear un nuevo reporte financiero
app.post('/api/reportes-financieros', (req, res) => {
    const reporte = req.body;

    // Validación de campos requeridos
    if (!reporte.monto) {
        return res.status(400).send({ message: 'Error al crear el reporte financiero', error: 'Se necesita un monto' });
    }

    if (!reporte.idUsuario) {
        return res.status(400).send({ message: 'Error al crear el reporte financiero', error: 'Se necesita el id de usuario del contador' });
    }

    // Verificar si el usuario es un contador
    getUsuario(reporte.idUsuario, (error, usuario) => {
        if (error) {
            return res.status(500).send({ message: 'Error al crear el reporte financiero', error: error });
        }

        if (!usuario) {
            return res.status(404).send({ message: 'Error al crear el reporte financiero', error: 'No se encontró un usuario' });
        }

        if (usuario.cargo.toLowerCase() !== "contador") {
            return res.status(403).send({ message: 'Error al crear el reporte financiero', error: 'Solo los contadores están habilitados para esta acción' });
        }

        // Crear el reporte financiero
        reporte.fecha = new Date().toISOString().split('T')[0];
        crearReporteFinanciero(reporte, (error, idReporte) => {
            if (error) {
                return res.status(500).send({ message: 'Error al crear el reporte financiero', error: error });
            }
            res.status(201).send({ message: 'Reporte financiero creado exitosamente', idReporte: idReporte });
        });
    });
});

// Ruta para actualizar un reporte financiero existente
app.put('/api/reportes-financieros/:id', (req, res) => {
    const idReporte = req.params.id;
    const nuevoReporte = req.body;

    // Validación de campos requeridos
    if (!nuevoReporte.monto) {
        return res.status(400).send({ message: 'Error al actualizar el reporte financiero', error: 'Se necesita un monto' });
    }

    if (!nuevoReporte.idUsuario) {
        return res.status(400).send({ message: 'Error al actualizar el reporte financiero', error: 'Se necesita el id de usuario del contador' });
    }

    // Verificar si el usuario es un contador
    getUsuario(nuevoReporte.idUsuario, (error, usuario) => {
        if (error) {
            return res.status(500).send({ message: 'Error al actualizar el reporte financiero', error: 'No se encontró un usuario' });
        }

        if (!usuario || usuario.cargo.toLowerCase() !== "contador") {
            return res.status(403).send({ message: 'Error al actualizar el reporte financiero', error: 'Solo los contadores están habilitados para esta acción' });
        }

        // Actualizar el reporte financiero
        nuevoReporte.fecha = new Date().toISOString().split('T')[0];
        actualizarReporteFinanciero(idReporte, nuevoReporte, (error, success) => {
            if (error) {
                return res.status(500).send({ message: 'Error al actualizar el reporte financiero', error: error });
            }
            if (!success) {
                return res.status(404).send({ message: 'No se encontró ningún reporte financiero con ese ID' });
            }
            res.send({ message: 'Reporte financiero actualizado correctamente' });
        });
    });
});

// Ruta para eliminar un reporte financiero
app.delete('/api/reportes-financieros/:id', (req, res) => {
    const idReporte = req.params.id;
    eliminarReporteFinanciero(idReporte, (error, success) => {
        if (err) {
            return res.send({ message: 'Error al obtener el reporte financiero', error: err });
        }
        if (!success) {
            return res.send({ message: 'No se encontró ningún reporte financiero con ese ID' });
        }
        res.send({ message: 'Reporte financiero eliminado correctamente' });
    });
});

// Array para almacenar los códigos de recuperación y sus tiempos de expiración
const codigosRecuperacionList = [];

// Endpoint para recuperar contraseña
app.get('/api/recuperar/:id', async (req, res) => {
    try {
        // Simulación de búsqueda de usuario en la base de datos
        const userId = req.params.id;
        const usuario = await getUsuario(userId);

        if (!usuario) {
            return res.send('Usuario no encontrado');
        }

        // Generar un código aleatorio
        const recoveryCode = generarCodigo();

        // Guardar el código de recuperación y su tiempo de expiración
        const codigoRecuperacion = {
            idUsuario: usuario.idUsuario,
            codigo: recoveryCode,
            tiempoExpiracion: Date.now() + 5 * 60 * 1000 // 5 minutos de expiración
        };

        // Agregar el código de recuperación a la lista
        codigosRecuperacionList.push(codigoRecuperacion);

        // Enviar el código al correo electrónico del usuario
        enviarCorreo(usuario.correoUsuario, recoveryCode);

        res.json({ message: 'Código de recuperación enviado con éxito' });
    } catch (err) {
        res.send({ message : 'Error interno del servidor', error : err.message});
    }
});


// Endpoint para verificar el código de recuperación
app.post('/api/verificar-codigo', (req, res) => {
    const userId = req.body.id;
    const codigoIngresado = req.body.codigo;

    // Buscar el código de recuperación correspondiente al usuario
    const codigoRecuperacion = codigosRecuperacionList.find(codigo => codigo.idUsuario === userId);

    // Verificar si se encontró un código de recuperación para este usuario
    if (!codigoRecuperacion) {
        return res.json({ message: 'No se encontró un código de recuperación para este usuario' });
    }

    // Verificar si el código ingresado coincide con el código de recuperación guardado
    if (codigoIngresado === codigoRecuperacion.codigo) {
        // Verificar si el código ha expirado
        if (Date.now() <= codigoRecuperacion.tiempoExpiracion) {
            // Eliminar el código de recuperación después de usarlo
            const index = codigosRecuperacionList.indexOf(codigoRecuperacion);
            if (index > -1) {
                codigosRecuperacionList.splice(index, 1);
            }
            // Código válido y dentro del tiempo de expiración
            return res.json({ success: true });
        } else {
            // Código válido pero ha expirado
            return res.json({ message: 'El código de recuperación ha expirado' });
        }
    } else {
        // Código incorrecto
        return res.json({ message: 'El código de recuperación es incorrecto' });
    }
});

// Función para enviar correo electrónico
function enviarCorreo(destinatario, codigo) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'valenzuelavivancofelipe@gmail.com', // Correo electrónico desde el cual se enviará el mensaje
            pass: 'xplbrynyxyazzlsg' // Contraseña del correo electrónico
        }
    });

    const mailOptions = {
        from: 'valenzuelavivancofelipe@gmail.com', // Usar el correo electrónico configurado
        to: destinatario,
        subject: 'Recuperación de contraseña',
        text: `Tu código de recuperación es: ${codigo}. Este código es válido por 5 minutos.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        }
    });
}


const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error('Error al iniciar el servidor Express:', err.message);
    process.exit(1);
});