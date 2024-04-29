const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'system12345',
    database: 'mysql'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('-----------------------------------------\nConexión exitosa a la base de datos MySQL\n-----------------------------------------');
});

module.exports = connection;
