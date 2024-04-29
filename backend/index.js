// Importa el módulo Express
const express = require('express');

// Crea una instancia de la aplicación Express
const app = express();

// Define una ruta básica que responde con un mensaje
app.get('/', (req, res) => {
    res.send('¡Hola desde Express!');
});

// Importa la conexión a la base de datos
const connection = require('./resources/conection');

// Configura el servidor para escuchar en el puerto 3001 o el que se le asigne a través de variables de entorno
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`---------------------------------------------\nServidor Express escuchando en el puerto ${PORT}\n---------------------------------------------`);
});