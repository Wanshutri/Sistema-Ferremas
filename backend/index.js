const express = require('express');
const connection = require('./resources/connection');

const app = express();

const con = connection()

app.get('/', (req, res) => {
    res.send('CONEXION\n' + con);
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error('Error al iniciar el servidor Express:', err);
    process.exit(1);
});