USE ferremasBD;
DROP TABLE IF EXISTS ordenPedido;
DROP TABLE IF EXISTS boleta;
DROP TABLE IF EXISTS detalle_carrito;
DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS informe_venta;
DROP TABLE IF EXISTS reporte_financiero;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS tipo_producto;
DROP TABLE IF EXISTS deposito;
DROP TABLE IF EXISTS usuario;

-- Creacion de la base de datos

CREATE TABLE usuario(
    idUsuario INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    correoUsuario VARCHAR(40) NOT NULL,
    contrasenaUsuario VARCHAR(100) NOT NULL,
    rutUsuario VARCHAR(12) NOT NULL,
    pNombre VARCHAR(40) NOT NULL,
    sNombre VARCHAR(40),
    pApellido VARCHAR(40) NOT NULL,
    sApellido VARCHAR(40) NOT NULL,
    fechaNac DATE NOT NULL,
    celular INTEGER NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    cargo VARCHAR(20) NOT NULL
);

CREATE TABLE informe_venta(
    idInforme INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE tipo_producto(
	idTipoProducto INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombreTipo VARCHAR(30) NOT NULL
);

CREATE TABLE producto(
    idProducto INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombreProducto VARCHAR(25) NOT NULL,
    descripcion LONGTEXT NOT NULL,
    precioProducto INTEGER NOT NULL,
    idTipoProducto INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    FOREIGN KEY (idTipoProducto) REFERENCES tipo_producto(idTipoProducto)
);

CREATE TABLE reporte_financiero(
    idReporteFinanciero INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    monto INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);


CREATE TABLE carrito(
    idCarrito INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE detalle_carrito(
    idProducto INTEGER NOT NULL,
    idCarrito INTEGER NOT NULL,
    cantidadProducto INTEGER NOT NULL,
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto),
    FOREIGN KEY (idCarrito) REFERENCES carrito(idCarrito)
);

CREATE TABLE boleta(
    idBoleta INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fechaBoleta DATE NOT NULL,
    comentario VARCHAR(200),
    numeroCuenta INTEGER NOT NULL,
    bancoNombre VARCHAR(50),
    total INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    direccionSucursal VARCHAR(100) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE ordenPedido(
    idOrdenPedido INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fechaOrden DATE NOT NULL,
    idUsuario INTEGER NOT NULL,
    idBoleta INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idBoleta) REFERENCES boleta(idBoleta)
);

CREATE TABLE deposito(
    idDeposito INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idUsuario INTEGER NOT NULL,
    urlComprobante VARCHAR(100) NOT NULL,
    estadoDeposito VARCHAR(1) NOT NULL, #P (Pendiente), A (Aceptado), R (Rechazado)
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

INSERT INTO usuario (correoUsuario, contrasenaUsuario, rutUsuario, pNombre, sNombre, pApellido, sApellido, fechaNac, celular, direccion, cargo) 
VALUES ('fe.valenzuelav@duocuc.cl', 'judas123', '21244616-5', 'Felipe', null, 'Valenzuela', 'Vivanco', '2004-04-29', 123456789, 'Calle de las reinas magicas.', 'Admin');