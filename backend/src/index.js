const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto, getProducto } = require('./../resources/DAOproductos');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, getUsuario } = require('./../resources/DAOusuarios');
const { getBoletas, crearBoleta, actualizarBoleta, eliminarBoleta, getBoleta } = require('./../resources/DAOboletas');
const { getCarritoPorUsuario, agregarProductoAlCarrito, eliminarProductoDelCarrito } = require('./../resources/DAOcarrito')


const app = express();

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

// Ruta para crear una nueva boleta
app.post('/api/boletas', (req, res) => {
    const nuevaBoleta = req.body;
    crearBoleta(nuevaBoleta)
        .then(insertId => {
            res.status(201).json({ id: insertId, message: 'Boleta creada exitosamente' });
        })
        .catch(error => {
            console.error('Error al crear boleta:', error);
            res.status(500).send('Error al crear boleta en la base de datos');
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

// Ruta para eliminar una boleta
app.delete('/api/boletas/:id', (req, res) => {
    const id = req.params.id;
    eliminarBoleta(id)
        .then(success => {
            if (success) {
                res.json({ message: 'Boleta eliminada exitosamente' });
            } else {
                res.status(404).send('Boleta no encontrada');
            }
        })
        .catch(error => {
            console.error('Error al eliminar boleta:', error);
            res.status(500).send('Error al eliminar boleta en la base de datos');
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


const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error('Error al iniciar el servidor Express:', err);
    process.exit(1);
});
