const express = require('express');
const cors = require('cors'); // Importar el middleware de cors
const { getProductos } = require('./resources/DAOproductos');

const app = express();

// Agregar el middleware de cors a tu aplicación
app.use(cors());

// Definir la ruta para obtener productos
app.get('/', (req, res) => {
    getProductos()
        .then(productos => {
            res.json(productos);
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
            res.status(500).send('Error al obtener productos desde la base de datos');
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
