const express = require('express');
const cors = require('cors');
const request = require('request')
const fs = require('fs');
const path = require('path');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto, getProducto } = require('./../resources/DAOproductos');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, getUsuario } = require('./../resources/DAOusuarios');
const { getBoletas, actualizarBoleta, getBoleta } = require('./../resources/DAOboletas');
const { getCarritoPorUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito } = require('./../resources/DAOcarrito');
const { eliminarOrdenPedido, actualizarOrdenPedido, crearOrdenPedido, getOrdenPedido, getOrdenesPedido } = require('../resources/DAOorden_pedido');
const { crearPago, actualizarPago, eliminarPago, getPago, getPagos } = require('../resources/DAOpago');
const { getReportesFinancieros, getReporteFinanciero, crearReporteFinanciero, actualizarReporteFinanciero, eliminarReporteFinanciero } = require('../resources/DAOreporte_financiero');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

const CLIENT = process.env.CLIENT_ID;
const SECRET = process.env.CLIENT_SECRET;
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

// Ruta para la página de documentación
app.get('/', (req, res) => {
    // Lee el contenido del archivo 'doc.html'
    fs.readFile(path.join(__dirname, '..', 'public', 'doc.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de documentación:', err);
            res.status(500).send('Error al cargar la documentación');
            return;
        }
        // Envía la respuesta con el contenido HTML del archivo de documentación
        res.send(data);
    });
});

//PRODUCTOS

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
    getProductos()
        .then(productos => {
            res.json(productos);
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Error al obtener productos desde la base de datos');
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
                res.status(404).send('Producto no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al obtener producto:', error);
            res.status(500).send('Error al obtener producto desde la base de datos');
        });
});

// Ruta para crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const nuevoProducto = req.body;
    crearProducto(nuevoProducto)
        .then(insertId => {
            res.status(201).json({ id: insertId, message: 'Producto creado exitosamente' });
        })
        .catch(error => {
            console.error('Error al crear producto:', error);
            res.status(500).send('Error al crear producto en la base de datos');
        });
});

// Ruta para actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const nuevoProducto = req.body;
    actualizarProducto(id, nuevoProducto)
        .then(success => {
            if (success) {
                res.json({ message: 'Producto actualizado exitosamente' });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al actualizar producto:', error);
            res.status(500).send('Error al actualizar producto en la base de datos');
        });
});

// Ruta para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    eliminarProducto(id)
        .then(success => {
            if (success) {
                res.json({ message: 'Producto eliminado exitosamente' });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al eliminar producto:', error);
            res.status(500).send('Error al eliminar producto en la base de datos');
        });
});

//USUARIOS

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    getUsuarios()
        .then(usuarios => {
            res.json(usuarios);
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            res.status(500).send('Error al obtener usuarios desde la base de datos');
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
                res.status(404).send('Usuario no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al obtener usuario:', error);
            res.status(500).send('Error al obtener usuario desde la base de datos');
        });
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    crearUsuario(nuevoUsuario)
        .then(insertId => {
            res.status(201).json({ id: insertId, message: 'Usuario creado exitosamente' });
        })
        .catch(error => {
            console.error('Error al crear usuario:', error);
            res.status(500).send('Error al crear usuario en la base de datos');
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
                res.status(404).send('Usuario no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al actualizar usuario:', error);
            res.status(500).send('Error al actualizar usuario en la base de datos');
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
                res.status(404).send('Usuario no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al eliminar usuario:', error);
            res.status(500).send('Error al eliminar usuario en la base de datos');
        });
});


//BOLETAS

// Ruta para obtener todas las boletas
app.get('/api/boletas', (req, res) => {
    getBoletas()
        .then(boletas => {
            res.json(boletas);
        })
        .catch(error => {
            console.error('Error al obtener boletas:', error);
            res.status(500).send('Error al obtener boletas desde la base de datos');
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
                res.status(404).send('Boleta no encontrada');
            }
        })
        .catch(error => {
            console.error('Error al obtener boleta:', error);
            res.status(500).send('Error al obtener boleta desde la base de datos');
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
                res.status(404).send('Boleta no encontrada');
            }
        })
        .catch(error => {
            console.error('Error al actualizar boleta:', error);
            res.status(500).send('Error al actualizar boleta en la base de datos');
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
                res.status(404).send('El carrito esta vacio');
            }
        })
        .catch(error => {
            console.error('Error al obtener carrito:', error);
            res.status(500).send('Error al obtener carrito desde la base de datos');
        });
});

// Ruta para agregar un producto al carrito POST EJEMPLO: /api/carrito/agregar
app.post('/api/carrito', (req, res) => {
    const { idCarrito, idProducto, cantidadProducto } = req.body;

    // Verificar que se proporcionen los parámetros necesarios
    if (!idCarrito || !idProducto || !cantidadProducto) {
        res.status(400).send('Faltan parámetros en la solicitud');
        return;
    }

    agregarProductoAlCarrito(idCarrito, idProducto, cantidadProducto)
        .then(insertId => {
            res.status(201).json({ id: insertId, message: 'Producto agregado al carrito exitosamente' });
        })
        .catch(error => {
            console.error('Error al agregar producto al carrito:', error);
            res.status(500).send('Error al agregar producto al carrito');
        });
});


// Ruta para eliminar un producto de un carrito DELETE EJEMPLO: /api/carrito?carrito=456&producto=789
app.delete('/api/carrito', (req, res) => {
    const idCarrito = req.query.carrito;
    const idProducto = req.query.producto;

    // Verificar que se proporcionen los parámetros necesarios
    if (!idCarrito || !idProducto) {
        res.status(400).send('Faltan parámetros en la solicitud');
        return;
    }

    eliminarProductoDelCarrito(idCarrito, idProducto)
        .then(success => {
            if (success) {
                res.json({ message: 'Producto eliminado exitosamente' });
            } else {
                res.status(404).send('Producto no encontrado en el carrito');
            }
        })
        .catch(error => {
            console.error('Error al eliminar producto del carrito:', error);
            res.status(500).send('Error al eliminar producto del carrito');
        });
});

//ORDENES DE PEDIDO

// Ruta para obtener todos los pedidos de orden
app.get('/api/ordenPedido', (req, res) => {
    getOrdenesPedido()
        .then(ordenesPedido => {
            res.json(ordenesPedido);
        })
        .catch(error => {
            console.error('Error al obtener ordenes de pedido:', error);
            res.status(500).send('Error al obtener ordenes de pedido desde la base de datos');
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
                res.status(404).send('Orden de pedido no encontrada');
            }
        })
        .catch(error => {
            console.error('Error al obtener orden de pedido:', error);
            res.status(500).send('Error al obtener orden de pedido desde la base de datos');
        });
});

// Ruta para crear un nuevo pedido de orden
app.post('/api/ordenPedido', (req, res) => {
    const nuevaOrdenPedido = req.body;
    crearOrdenPedido(nuevaOrdenPedido)
        .then(insertId => {
            res.status(201).json({ id: insertId, message: 'Orden de pedido creada exitosamente' });
        })
        .catch(error => {
            console.error('Error al crear orden de pedido:', error);
            res.status(500).send('Error al crear orden de pedido en la base de datos');
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
                res.status(404).send('Orden de pedido no encontrada');
            }
        })
        .catch(error => {
            console.error('Error al actualizar orden de pedido:', error);
            res.status(500).send('Error al actualizar orden de pedido en la base de datos');
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
                res.status(404).send('Orden de pedido no encontrada');
            }
        })
        .catch(error => {
            console.error('Error al eliminar orden de pedido:', error);
            res.status(500).send('Error al eliminar orden de pedido en la base de datos');
        });
});

// Ruta para los pagos

// Ruta para obtener todos los pagos
app.get('/api/pago', (req, res) => {
    getPagos()
        .then(pagos => {
            res.json(pagos);
        })
        .catch(error => {
            console.error('Error al obtener los pagos:', error);
            res.status(500).send('Error al obtener los pagos desde la base de datos');
        });
});

// Ruta para obtener un pago por su ID
app.get('/api/pago/:id', (req, res) => {
    const id = req.params.id;
    getPago(id)
        .then(pago => {
            if (pago) {
                res.json(pago);
            } else {
                res.status(404).send('Pago no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al obtener el pago:', error);
            res.status(500).send('Error al obtener el pago desde la base de datos');
        });
});

// Ruta para crear un nuevo pago
/*
{
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://example.com/success",
    "cancel_url": "http://example.com/cancel"
  },
  "transactions": [
    {
      "amount": {
        "total": "10.00",
        "currency": "USD"
      },
      "description": "Compra en línea",
      "item_list": {
        "items": [
          {
            "name": "Producto 1",
            "quantity": 1,
            "price": "10.00",
            "currency": "USD"
          }
        ]
      }
    }
  ]
}

const nuevoPago = {
            fechaPago: new Date(), // Corrección: Agrega paréntesis para invocar Date()
            total: pagoData.transactions[0].amount.total,
            idUsuario: req.params.id, // Corrección: Obtén el ID de usuario de los parámetros de la URL
            direccionSucursal: "test"
        };
        crearPago(nuevoPago)
            .then(({ pagoId, boletaId }) => { })
            .catch(error => {
                console.error('Error al crear el pago:', error);
            });

*/

const createPayment = (req, res) => {

    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: '115'
            }
        }],
        application_context: {
            brand_name: `Ferremas`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `http://localhost:3001/api/ejecutar-pago`, // Url despues de realizar el pago
            cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

const executePayment = (req, res) => {
    const token = req.query.token; //<-----------

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}

app.post('/api/crear-pago', createPayment);
app.get('/api/ejecutar-pago', executePayment);

// Ruta para actualizar un pago existente
app.put('/api/pago/:id', (req, res) => {
    const id = req.params.id;
    const nuevoPago = req.body;
    actualizarPago(id, nuevoPago)
        .then(success => {
            if (success) {
                res.json({ message: 'Pago actualizado exitosamente' });
            } else {
                res.status(404).send('Pago no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al actualizar el pago:', error);
            res.status(500).send('Error al actualizar el pago en la base de datos');
        });
});

// Ruta para eliminar un pago
app.delete('/api/pago/:id', (req, res) => {
    const id = req.params.id;
    eliminarPago(id)
        .then(success => {
            if (success) {
                res.json({ message: 'Pago eliminado exitosamente' });
            } else {
                res.status(404).send('Pago no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el pago:', error);
            res.status(500).send('Error al eliminar el pago en la base de datos');
        });
});

// Rutas para el reporte financiero

// Ruta para obtener todos los reportes financieros
app.get('/api/reportesFinancieros', (req, res) => {
    getReportesFinancieros()
        .then(reportes => {
            res.json(reportes);
        })
        .catch(error => {
            console.error('Error al obtener los reportes financieros:', error);
            res.status(500).send('Error al obtener los reportes financieros desde la base de datos');
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
                res.status(404).send('Reporte financiero no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al obtener el reporte financiero:', error);
            res.status(500).send('Error al obtener el reporte financiero desde la base de datos');
        });
});

// Ruta para crear un nuevo reporte financiero
app.post('/api/reportesFinancieros', (req, res) => {
    const nuevoReporte = req.body;
    crearReporteFinanciero(nuevoReporte)
        .then(insertId => {
            res.status(201).json({ id: insertId, message: 'Reporte financiero creado exitosamente' });
        })
        .catch(error => {
            console.error('Error al crear el reporte financiero:', error);
            res.status(500).send('Error al crear el reporte financiero en la base de datos');
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
                res.status(404).send('Reporte financiero no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al actualizar el reporte financiero:', error);
            res.status(500).send('Error al actualizar el reporte financiero en la base de datos');
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
                res.status(404).send('Reporte financiero no encontrado');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el reporte financiero:', error);
            res.status(500).send('Error al eliminar el reporte financiero en la base de datos');
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
            return res.status(404).send('Usuario no encontrado');
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

        res.status(200).json({ message: 'Código de recuperación enviado con éxito' });
    } catch (error) {
        console.error('Error al procesar la solicitud de recuperación de contraseña:', error);
        res.status(500).send('Error interno del servidor');
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
        return res.status(404).json({ message: 'No se encontró un código de recuperación para este usuario' });
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
            return res.status(200).json({ success: true });
        } else {
            // Código válido pero ha expirado
            return res.status(400).json({ message: 'El código de recuperación ha expirado' });
        }
    } else {
        // Código incorrecto
        return res.status(400).json({ message: 'El código de recuperación es incorrecto' });
    }
});


// Endpoint para verificar el código de recuperación
app.post('/api/verificar-codigo', (req, res) => {
    const userId = req.body.id;
    const codigoIngresado = req.body.codigo;

    // Verificar si el usuario tiene un código de recuperación guardado
    if (!codigosRecuperacion[userId]) {
        return res.status(404).json({ message: 'No se encontró un código de recuperación para este usuario' });
    }

    // Obtener el código de recuperación del usuario
    const recoveryCode = codigosRecuperacion[userId].codigo;

    // Verificar si el código ingresado coincide con el código de recuperación guardado
    if (codigoIngresado === recoveryCode) {
        // Verificar si el código ha expirado
        if (Date.now() <= codigosRecuperacion[userId].tiempoExpiracion) {
            // Eliminar el código de recuperación después de usarlo
            codigosRecuperacionList.remove(c);
            // Código válido y dentro del tiempo de expiración
            return res.status(200).json({ success: true });
        } else {
            // Eliminar el código de recuperación si ha expirado
            codigosRecuperacionList.remove(c);
            // Código válido pero ha expirado
            return res.status(400).json({ message: 'El código de recuperación ha expirado' });
        }
    } else {
        // Código incorrecto
        return res.status(400).json({ message: 'El código de recuperación es incorrecto' });
    }
});


// Función para enviar correo electrónico
function enviarCorreo(destinatario, codigo) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NAME, // Correo electrónico desde el cual se enviará el mensaje
            pass: process.env.EMAIL_PASS // Contraseña del correo electrónico
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_NAME, // Usar el correo electrónico configurado
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


const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error('Error al iniciar el servidor Express:', err);
    process.exit(1);
});