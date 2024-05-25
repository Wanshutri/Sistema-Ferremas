const express = require('express');
const cors = require('cors');
const request = require('request')
const fs = require('fs');
const path = require('path');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto, getProducto } = require('./../resources/DAOproductos');
const { actualizarTipoProducto, crearTipoProducto, eliminarTipoProducto, getTipoProducto, getTiposProducto } = require('./../resources/DAOtipo_producto');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, getUsuario, autenticarUsuario } = require('./../resources/DAOusuarios');
const { getBoletas, actualizarBoleta, getBoleta, crearBoleta } = require('./../resources/DAOboletas');
const { getCarritoPorUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito } = require('./../resources/DAOcarrito');
const { eliminarOrdenPedido, actualizarOrdenPedido, crearOrdenPedido, getOrdenPedido, getOrdenesPedido } = require('../resources/DAOorden_pedido');
const { getReportesFinancieros, getReporteFinanciero, crearReporteFinanciero, actualizarReporteFinanciero, eliminarReporteFinanciero } = require('../resources/DAOreporte_financiero');
const nodemailer = require('nodemailer');
const app = express();
const port = 3001;
const uploader = require('../resources/uploads')
const jwt = require('jsonwebtoken');
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
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
app.use(bodyParser.json());
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


app.post('/api/upload', upload.single('imagenProducto'), (req, res) => {
    // Aquí puedes procesar la imagen cargada
    const file = req.file;
    // Guarda la imagen en tu servidor o realiza cualquier otra operación necesaria
    res.send({ message: 'Imagen cargada exitosamente' });
  });
  

// Ruta para subir un depósito
app.post('/api/deposito/:idUsuario', (req, res) => {
    // Validar que se haya enviado un ID de usuario
    if (!req.params.idUsuario) {
        return res.send({ message: 'No se subio ninguna imagen', error: 'Falta id del usuario' });
    }

   const idUsuario = req.params.idUsuario

    uploader.upload(req, res, (err) => {
        if (err) {
            if (err.code === 'INVALID_FILE_TYPE') {
                return res.send({ message : 'Error al subir la imagen' ,error: 'Solo se admiten formatos de imagen' });
            }
            return res.send({ message: 'Error al subir la imagen: ', error: err.message });
        }

        if (!req.file) {
            return res.send({ message : 'Error al subir la imagen' , error: 'No se subió ninguna imagen' });
        }

        deposito = {
            "idUsuario" : idUsuario,
            "urlComprobante" : req.file.filename,
            "estadoDeposito" : 'P'
        }

        uploader.crearDeposito(deposito).then(() => {
            res.send("Comprobande subido y creado con exito")
        }).catch((err) => {
            res.send({ message: "Ocurrio un error al subir o crear comprobante: ", error:  err.message})
        })
    });
});

// Ruta para eliminar un depósito
app.delete('/api/deposito/:id', (req, res) => {
    const id = req.params.id;
    uploader.getDeposito(id).then(deposito => {
        if (!deposito) {
            return res.send({ message: 'Error al eliminar un deposito' ,error: 'Depósito no encontrado' });
        }
        const filePath = path.join(__dirname, '../uploads', deposito[0].urlComprobante);
        uploader.eliminarDeposito(id).then( () => {
            fs.unlink(filePath, (err) => {
                if (err.message) {
                    return res.send({ message: 'Error al eliminar el archivo del sistema de archivos: ', error: err.message });
                }
                res.send({ message: 'Depósito eliminado correctamente' });
            });
        })
    }).catch(error => {
        return res.send({ message: "Error durante eliminar comprobante", error: err.message})
    })
});

// Ruta para obtener todos los depósitos
app.get('/api/depositos', (req, res) => {
    const id = req.params.id;
    uploader.getDepositos()
        .then(depositos => {
        if (depositos) 
            res.json(depositos)
        }).catch(err => {
            res.send({ message : 'Error al obtener los depositos', error: err.message});
        })
});



// Ruta para obtener los depósitos de un usuario específico
app.get('/api/deposito-usuario/:id', (req, res) => {
    const id = req.params.id;
    uploader.getDepositosUsuario(id)
        .then(depositos => {
        if (depositos) 
            res.json(depositos)
        }).catch(err => {
            res.send({message: 'Error al obtener depositos del usuario', error : err.message});
        })
});

// Ruta para obtener un depósito específico
app.get('/api/deposito/:id', (req, res) => {
    const id = req.params.id;
    uploader.getDeposito(id)
        .then(deposito => {
        if (deposito) 
            res.json(deposito)
        }).catch(err => {
            res.send({ message : 'Error al obtener el deposito', error: err.message});
        })
});

//PRODUCTOS

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
    getProductos()
        .then(productos => {
            res.json(productos);
        })
        .catch(err => {
            res.send({message : 'Error al obtener los productos', error: err.message});
        });
});

// Ruta para obtener un producto por su ID
app.get('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    getProducto(id)
        .then(producto => {
            if (producto) {
                res.json(producto);
            } else {
                res.send({ message: 'Error al obtener el producto' , error: 'Producto no encontrado'});
            }
        })
        .catch(err => {
            res.send({ message: 'Error al obtener producto' , error: err.message});
        });
});

// Ruta para crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const nuevoProducto = req.body;
    crearProducto(nuevoProducto)
        .then(insertId => {
            res.json({ id: insertId, message: 'Producto creado exitosamente' });
        })
        .catch(err => {
            res.send({ message : 'Error al crear producto', error: err.message});
        });
});

// Ruta para actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const nuevoProducto = req.body;
    actualizarProducto(id, nuevoProducto)
        .then(success => {
            if (success) {
                res.send({ message: 'Producto actualizado exitosamente' , producto: nuevoProducto});
            } else {
                res.send({ message: 'Error al actualizar producto', error: 'Producto no encontrado'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al actualizar producto' , error: err.message});
        });
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    eliminarProducto(id)
        .then(success => {
            if (success) {
                res.send('Producto eliminado exitosamente');
            } else {
                res.send({message: 'Error al eliminar el producto', error: 'Producto no encontrado'});
            }
        })
        .catch(err => {
            res.send({message : 'Error al eliminar producto', error: err.message});
        });
});

//TIPO PRODUCTOS

// Ruta para obtener todos los productos
app.get('/api/tipo-productos', (req, res) => {
    getTiposProducto()
        .then(tipo_productos => {
            res.json(tipo_productos);
        })
        .catch(err => {
            res.send({ message : 'Error al obtener productos', error: err.message });
        });
});

// Ruta para obtener un producto por su ID
app.get('/api/tipo-productos/:id', (req, res) => {
    const id = req.params.id;
    getTipoProducto(id)
        .then(tipo_producto => {
            if (producto) {
                res.json(tipo_producto);
            } else {
                res.send({ message: 'Error al obtener producto' , error: 'Producto no encontrado'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al obtener producto' , error: err.message });
        });
});



// Ruta para crear un nuevo producto
app.post('/api/tipo-productos', (req, res) => {
    const nuevoTipoProducto = req.body;
    crearTipoProducto(nuevoTipoProducto)
        .then(insertId => {
            res.json({ id: insertId, message: 'Producto creado exitosamente' });
        })
        .catch(err => {
            res.send({message : 'Error al crear producto', error: err.message});
        });
});

// Ruta para actualizar un producto existente
app.put('/api/tipo-productos/:id', (req, res) => {
    const id = req.params.id;
    const nuevoTipoProducto = req.body;
    actualizarTipoProducto(id, nuevoTipoProducto)
        .then(success => {
            if (success) {
                res.json({ message: 'Producto actualizado exitosamente' });
            } else {
                res.send('Producto no encontrado');
            }
        })
        .catch(err => {
            res.send({ message : 'Error al actualizar producto', error: err.message});
        });
});

// Ruta para eliminar un producto
app.delete('/api/tipo-productos/:id', (req, res) => {
    const id = req.params.id;
    eliminarTipoProducto(id)
        .then(success => {
            if (success) {
                res.json({ message: 'Producto eliminado exitosamente' });
            } else {
                res.send({ message: 'Error al eliminar producto' , error: 'Producto no encontrado'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al eliminar producto' , error: err.message});
        });
});

//USUARIOS

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    getUsuarios()
        .then(usuarios => {
            res.json(usuarios);
        })
        .catch(err => {
            res.send({ message : 'Error al obtener usuarios', error: err.message});
        });
});

// Ruta para obtener un usuario por su ID
app.get('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    getUsuario(id)
        .then(usuario => {
            if (usuario) {
                res.json(usuario);
            } else {
                res.send('Usuario no encontrado');
            }
        })
        .catch(err => {
            res.send({ message: 'Error al obtener usuario', error: err.message});
        });
});

// Ruta para autenticar al usuario
app.post('/api/autenticar', (req, res) => {
    const correo = req.body.correoUsuario;
    const contrasenaUsuario = req.body.contrasenaUsuario;

    autenticarUsuario(correo, contrasenaUsuario)
        .then(usuario => {
            if (usuario) {
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
                res.send({ message: 'Error al autenticar al usuario', error: 'Usuario no encontrado'});
            }
        })
        .catch(err => {
            res.send({ message: 'Error al autenticar al usuario', error: err.message});
        });
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    crearUsuario(nuevoUsuario)
        .then(insertId => {
            res.json({ id: insertId, message: 'Usuario creado exitosamente' });
        })
        .catch(err => {
            res.send({message : 'Error al crear usuario: ', error: err.message });
        });
});

// Ruta para actualizar un usuario existente
app.put('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const nuevoUsuario = req.body;
    actualizarUsuario(id, nuevoUsuario)
        .then(success => {
            if (success) {
                res.json({ message: 'Usuario actualizado exitosamente' });
            } else {
                res.send({message : 'Error al actualizar usuario', error: 'Usuario no encontrado'});
            }
        })
        .catch(err => {
            res.send({message : 'Error al actualizar usuario', error: err.message});
        });
});

// Ruta para eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
    const id = req.params.id;
    eliminarUsuario(id)
        .then(success => {
            if (success) {
                res.json({ message: 'Usuario eliminado exitosamente' });
            } else {
                res.send({ message : 'Error al eliminar usuario', error : 'Usuario no encontrado'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al eliminar usuario', error : err.message});
        });
});

//BOLETAS

// Ruta para obtener todas las boletas
app.get('/api/boletas', (req, res) => {
    getBoletas()
        .then(boletas => {
            res.json(boletas);
        })
        .catch(err => {
            res.send({ message : 'Error al obtener boletas)', error: err.message});
        });
});

// Ruta para obtener una boleta por su ID
app.get('/api/boletas/:id', (req, res) => {
    const id = req.params.id;
    getBoleta(id)
        .then(boleta => {
            if (boleta) {
                res.json(boleta);
            } else {
                res.send({ message : 'Error al obtener boleta' , error: 'Boleta no encontrada'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al obtener boleta' , error : err.message});
        });
});

// Ruta para actualizar una boleta existente
app.put('/api/boletas/:id', (req, res) => {
    const id = req.params.id;
    const nuevaBoleta = req.body;
    actualizarBoleta(id, nuevaBoleta)
        .then(success => {
            if (success) {
                res.json({ message: 'Boleta actualizada exitosamente' });
            } else {
                res.send({ message : 'Error al actualizar boleta' , error: 'Boleta no encontrada'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al actualizar boleta' , error: err.message});
        });
});

//CARRITO

// Ruta para obtener el carrito de un usuario
app.get('/api/carrito/:id', (req, res) => {
    const id = req.params.id;
    getCarritoPorUsuario(id)
        .then(carrito => {
            if (carrito) {
                res.json(carrito);
            } else {
                res.send({message: 'Error al obtener carrito', error: 'El carrito esta vacio'});
            }
        })
        .catch(err => {
            res.send({message: 'Error al obtener carrito', error: err.message});
        });
});

// Ruta para agregar un producto al carrito
app.post('/api/carrito', (req, res) => {
    const { idCarrito, idProducto, cantidadProducto } = req.body;

    // Verificar que se proporcionen los parámetros necesarios
    if (!idCarrito || !idProducto || !cantidadProducto) {
        res.send('Faltan parámetros en la solicitud');
        return;
    }

    agregarProductoAlCarrito(idCarrito, idProducto, cantidadProducto)
        .then(insertId => {
            res.json({ id: insertId, message: 'Producto agregado al carrito exitosamente' });
        })
        .catch(err => {
            res.send({message :'Error al agregar producto al carrito', error: err.message});
        });
});

// Ruta para eliminar un producto de un carrito DELETE EJEMPLO: /api/carrito?carrito=456&producto=789
app.delete('/api/carrito', (req, res) => {
    const idCarrito = req.query.carrito;
    const idProducto = req.query.producto;

    // Verificar que se proporcionen los parámetros necesarios
    if (!idCarrito || !idProducto) {
        res.send('Faltan parámetros en la solicitud');
        return;
    }

    eliminarProductoDelCarrito(idCarrito, idProducto)
        .then(success => {
            if (success) {
                res.json({ message: 'Producto eliminado del carrito exitosamente' });
            } else {
                res.send({ message : ' Error al eliminar producto del carrito', error: 'Producto no encontrado en el carrito'});
            }
        })
        .catch(err => {
            res.send({ message: 'Error al eliminar producto del carrito', error: err.message});
        });
});

//ORDENES DE PEDIDO

// Ruta para obtener todos los pedidos de orden
app.get('/api/ordenPedido', (req, res) => {
    getOrdenesPedido()
        .then(ordenesPedido => {
            res.json(ordenesPedido);
        })
        .catch(err => {
            res.send({ message : 'Error al obtener ordenes de pedido', error : err.message});
        });
});

// Ruta para obtener un pedido de orden por su ID
app.get('/api/ordenPedido/:id', (req, res) => {
    const id = req.params.id;
    getOrdenPedido(id)
        .then(ordenPedido => {
            if (ordenPedido) {
                res.json(ordenPedido);
            } else {
                res.send({message : ' Error al obtener orden de pedido', error: 'Orden de pedido no encontrada'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al obtener orden de pedido', error : err.message});
        });
});

// Ruta para crear un nuevo pedido de orden
app.post('/api/ordenPedido', (req, res) => {
    const nuevaOrdenPedido = req.body;
    crearOrdenPedido(nuevaOrdenPedido)
        .then(insertId => {
            res.json({ id: insertId, message: 'Orden de pedido creada exitosamente' });
        })
        .catch(err => {
            res.send({message : 'Error al crear orden de pedido', error : err.message});
        });
});

// Ruta para actualizar un pedido de orden existente
app.put('/api/ordenPedido/:id', (req, res) => {
    const id = req.params.id;
    const nuevaOrdenPedido = req.body;
    actualizarOrdenPedido(id, nuevaOrdenPedido)
        .then(success => {
            if (success) {
                res.json({ message: 'Orden de pedido actualizada exitosamente' });
            } else {
                res.send({ message : 'Error al actualizar orden de pedido', error : 'Orden de pedido no encontrada'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al actualizar orden de pedido', error : err.message});
        });
});

// Ruta para eliminar un pedido de orden
app.delete('/api/ordenPedido/:id', (req, res) => {
    const id = req.params.id;
    eliminarOrdenPedido(id)
        .then(success => {
            if (success) {
                res.json({ message: 'Orden de pedido eliminada exitosamente' });
            } else {
                res.send({ message : 'Error al eliminar orden de pedido', error: 'Orden de pedido no encontrada'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al eliminar orden de pedido', error : err.message});
        });
});

// Ruta para los pagos

//ENTREGAR BODY CON ATRIBUTO "costo" : precio_clp
const createPayment = async (req, res) => {
    const costo_compra_clp = req.body.costo; // Suponiendo que costo es el monto en CLP
    const idUser = req.body.idUser;
    if (!req.body.costo || typeof req.body.costo !== 'number') {
        return res.json({ error: 'Se requiere un costo válido en la solicitud.' });
    }
    if (!req.body.idUser) {
        return res.json({ error: 'Se requiere un usuario en la solicitud.' });
    }

    const usuario = await getUsuario(idUser)
    if (!usuario) {
        return res.json({ error: 'Usuario no existe' });
    }

    const url_dolar = "https://dolarapi.com/v1/dolares";

    // Obtener el valor del dólar desde la API
    const response = await fetch(url_dolar);
    const data = await response.json();
    const valor_dolar = data[0].compra; // Suponiendo que data contiene el valor del dólar
    // Convertir el costo de la compra a USD
    const costo_compra_usd = (costo_compra_clp / valor_dolar).toFixed(2);
    const return_url = `http://localhost:3001/api/ejecutar-pago?monto=${costo_compra_clp}&idUser=${idUser}`;
    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: costo_compra_usd
            }
        }],
        application_context: {
            brand_name: `Ferremas`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: return_url, // Url despues de realizar el pago
            cancel_url: `http://localhost:3000/cancelar-pago` // Url despues de realizar el pago
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (error, response) => {
        res.json({ data: response.body })
    })
}

const executePayment = (req, res) => {
    const token = req.query.token;
    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (error, response) => {
            const total = req.query.monto;
            const idUser = req.query.idUser;
            const fechaBoleta = new Date().toISOString().split('T')[0];
            const boleta = {
                fechaBoleta: fechaBoleta,
                total: total,
                idUsuario: idUser
                };
        crearBoleta(boleta).catch( error => {
            console.error("Error al crear boleta: " + error.message)
        })
        res.redirect('http://localhost:3000/pago-exitoso')
    })
}

app.post('/api/crear-pago', createPayment);
app.get('/api/ejecutar-pago', executePayment);

// Rutas para el reporte financiero

// Ruta para obtener todos los reportes financieros
app.get('/api/reportesFinancieros', (req, res) => {
    getReportesFinancieros()
        .then(reportes => {
            res.json(reportes);
        })
        .catch(err => {
            res.send({ message : 'Error al obtener los reportes financieros', error: err.message});
        });
});

// Ruta para obtener un reporte financiero por su ID
app.get('/api/reportesFinancieros/:id', (req, res) => {
    const id = req.params.id;
    getReporteFinanciero(id)
        .then(reporte => {
            if (reporte) {
                res.json(reporte);
            } else {
                res.send({message : 'Error al obtener reporte financiero', error: 'Reporte financiero no encontrado'});
            }
        })
        .catch(err => {
            res.send({message : 'Error al obtener reporte financiero', error: err.message});
        });
});

// Ruta para crear un nuevo reporte financiero
app.post('/api/reportesFinancieros', (req, res) => {
    const nuevoReporte = req.body;
    crearReporteFinanciero(nuevoReporte)
        .then(insertId => {
            res.json({ id: insertId, message: 'Reporte financiero creado exitosamente' });
        })
        .catch(err => {
            res.send({message : 'Error al crear el reporte financiero', error: err.message});
        });
});

// Ruta para actualizar un reporte financiero existente
app.put('/api/reportesFinancieros/:id', (req, res) => {
    const id = req.params.id;
    const nuevoReporte = req.body;
    actualizarReporteFinanciero(id, nuevoReporte)
        .then(success => {
            if (success) {
                res.json({ message: 'Reporte financiero actualizado exitosamente' });
            } else {
                res.send({message : 'Error al actualizar el reporte financiero', error: 'Reporte financiero no encontrado'});
            }
        })
        .catch(err => {
            res.send({message : 'Error al actualizar el reporte financiero', error: err.message});
        });
});

// Ruta para eliminar un reporte financiero
app.delete('/api/reportesFinancieros/:id', (req, res) => {
    const id = req.params.id;
    eliminarReporteFinanciero(id)
        .then(success => {
            if (success) {
                res.json({ message: 'Reporte financiero eliminado exitosamente' });
            } else {
                res.send({ message : 'Error al eliminar el reporte financiero', error: 'Reporte financiero no encontrado'});
            }
        })
        .catch(err => {
            res.send({ message : 'Error al eliminar el reporte financiero', error: err.message});
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