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

// Función para establecer la conexión a la base de datos
function conectar() {
    const connection = mysql.createConnection(dbConfig);
    return connection;
}

// Exportar la función de conexión
module.exports = conectar;