const express = require('express');
const cors = require('cors');
const { getProductos, crearProducto, actualizarProducto, eliminarProducto, getProducto } = require('./resources/DAOproductos');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON

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

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error('Error al iniciar el servidor Express:', err);
    process.exit(1);
});
