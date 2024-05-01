const express = require('express');
const { getProductos } = require('./resources/DAOproductos');

const app = express();

app.get('/', (req, res) => {
    getProductos()
        .then(productos => {
            // Cuando la promesa se resuelve con éxito, se ejecuta este bloque de código
            res.send('Datos obtenidos desde la base de datos: ' + JSON.stringify(productos));
        })
        .catch(error => {
            // Si hay algún error al obtener los productos, se ejecuta este bloque de código
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
