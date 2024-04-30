const mysql = require('mysql2');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const result = require('dotenv').config();

if (result.error) {
    console.error('Error al cargar el archivo .env:', result.error);
}

// Función para establecer la conexión a la base de datos
function conectar() {
    //console.log('Valores de las variables de entorno:');
    //console.log('DB_HOST:', process.env.DB_HOST);
    //console.log('DB_PORT:', process.env.DB_PORT);
    //console.log('DB_USER:', process.env.DB_USER);
    //console.log('DB_DATABASE:', process.env.DB_DATABASE);
    //console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    //console.log('Variables de entorno disponibles:', process.env);

    const connection = mysql.createConnection(dbConfig);

    // Intenta conectarte a la base de datos
    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return;
        }
        console.log('Conexión exitosa a la base de datos MySQL.');
    });

    // Escuchar eventos de error y cerrar conexión
    connection.on('error', (err) => {
        console.error('Error en la conexión a la base de datos:', err);
        connection.destroy();
    });

    // Retornar la conexión establecida
    return connection;
}

// Exportar la función de conexión
module.exports = conectar;