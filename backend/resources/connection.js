const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const dbConfig = {
    //host: obtenerDireccionIP(), // Obtiene la dirección IP dinámicamente
    host: 'mysqldb_ferremas',
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
