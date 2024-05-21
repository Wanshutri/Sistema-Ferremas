const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const dbConfig = {
    //host: 'mysqldb_ferremas', DEJAR ESTE AL MOMENTO DE DEJAR EN PRODUCCION (OSEA PRESENTACION Y CON DOCKER)
    host: 'localhost', // ESTE ES SOLO PARA DESARROLLO
    port: 3306,
    user: 'root',
    password: 'SistemaFerremas2024',
    database: 'ferremasBD'
};

// Función para establecer la conexión a la base de datos
function conectar() {
    const connection = mysql.createConnection(dbConfig);
    return connection;
}

// Exportar la función de conexión
module.exports = conectar;