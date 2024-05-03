const conectar = require('./connection'); // Importa la función de conexión

// Función para recuperar datos de la base de datos
function getProductos() {
    return new Promise((resolve, reject) => {
        // Establecer la conexión
        const connection = conectar();

        // Consulta SQL para obtener datos
        const query = 'SELECT * FROM usuario';

        // Ejecutar la consulta
        connection.query(query, (error, results, fields) => {
            // Verificar si hubo un error
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                connection.end(); // Cerrar la conexión
                reject(error); // Rechazar la promesa con el error
                return;
            }
            // Cerrar la conexión
            connection.end();
            // Resolver la promesa con los resultados
            resolve(results);
        });
    });
}

// Exportar la función para obtener datos
module.exports = { getProductos };
