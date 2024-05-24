const multer = require('multer');
const path = require('path');
const conectar = require('./connection'); // Asegúrate de que la ruta al archivo de conexión sea correcta

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Filtro de archivos para validar que sean imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Tipo de archivo no permitido. Solo se permiten imágenes.');
        error.code = 'INVALID_FILE_TYPE';
        return cb(error, false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

function crearDeposito(deposito) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'INSERT INTO deposito SET ?';
        connection.query(query, deposito, (error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results.insertId);
        });
    });
}

// Función para eliminar un depósito
function eliminarDeposito(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'DELETE FROM deposito WHERE idDeposito = ?';
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results.affectedRows > 0);
        });
    });
}

// Función para recuperar todos los depósitos de la base de datos
function getDepositos() {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM deposito';
        connection.query(query, (error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results);
        });
    });
}

// Función para recuperar los depósitos de un usuario específico
function getDepositosUsuario(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM deposito WHERE idUsuario = ?';
        connection.query(query, id ,(error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results);
        });
    });
}

// Función para recuperar un depósito específico
function getDeposito(id) {
    return new Promise((resolve, reject) => {
        const connection = conectar();
        const query = 'SELECT * FROM deposito WHERE idDeposito = ?';
        connection.query(query, id ,(error, results, fields) => {
            if (error) {
                connection.end();
                reject(error);
                return;
            }
            connection.end();
            resolve(results);
        });
    });
}

// Exportar todas las funciones y el middleware de multer
module.exports = {
    upload: upload.single('image'),
    crearDeposito,
    eliminarDeposito,
    getDepositos,
    getDepositosUsuario,
    getDeposito
};