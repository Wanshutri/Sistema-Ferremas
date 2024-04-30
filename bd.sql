/*
--Creacion de DATABASE Y USUARIO
CREATE DATABASE ferremasDB;
CREATE USER 'ferremasUser'@'localhost' IDENTIFIED BY 'SistemaFerremas2024';
ALTER USER 'ferremasUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SistemaFerremas2024'; --ESTO ES SI DA ERROR "R_NOT_SUPPORTED_AUTH_MODE" EN EL NODE ()
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON ferremasDB.* TO 'ferremasUser'@'localhost';
FLUSH PRIVILEGES;
-- Creacion de la base de datos
*/

USE ferremasBD;

CREATE TABLE sucursal(
    idSucursal INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    direccion VARCHAR(30) NOT NULL
);

CREATE TABLE usuario(
    idUsuario INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    correoUsuario VARCHAR(40) NOT NULL,
    contrasenaUsuario VARCHAR(40) NOT NULL,
    rutUsuario VARCHAR(12) NOT NULL,
    pNombre VARCHAR(40) NOT NULL,
    sNombre VARCHAR(40),
    pApellido VARCHAR(40) NOT NULL,
    sApellido VARCHAR(40) NOT NULL,
    fechaNac DATE NOT NULL,
    celular INTEGER NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    administrador BOOLEAN NOT NULL
);

CREATE TABLE informe_venta(
    idInforme INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE producto(
    idProducto INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombreProducto VARCHAR(25) NOT NULL,
    precioProducto INTEGER NOT NULL,
    stock INTEGER NOT NULL
);

CREATE TABLE contador(
    contadorId INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE reporte_financiero(
    idReporteFinanciero INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
    contadorId INTEGER NOT NULL,
    FOREIGN KEY (contadorId) REFERENCES contador(contadorId)
);

CREATE TABLE bodeguero(
    bodegueroId INTEGER NOT NULL PRIMARY KEY,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE vendedor(
    vendedorId INTEGER NOT NULL PRIMARY KEY,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE cliente(
    clienteId INTEGER NOT NULL PRIMARY KEY,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE carrito(
    idCarrito INTEGER NOT NULL PRIMARY KEY,
    clienteId INTEGER NOT NULL,
    FOREIGN KEY (clienteId) REFERENCES cliente(clienteId)
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
    total INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    idCarrito INTEGER NOT NULL,
    idSucursal INTEGER NOT NULL,
    vendedorId INTEGER NOT NULL,
    contadorId INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idCarrito) REFERENCES carrito(idCarrito),
    FOREIGN KEY (idSucursal) REFERENCES sucursal(idSucursal),
    FOREIGN KEY (vendedorId) REFERENCES vendedor(vendedorId),
    FOREIGN KEY (contadorId) REFERENCES contador(contadorId)
);

CREATE TABLE pago(
    idPago INTEGER NOT NULL PRIMARY KEY,
    fechaPago DATE NOT NULL,
    monto INTEGER NOT NULL,
    idBoleta INTEGER NOT NULL,
    FOREIGN KEY (idBoleta) REFERENCES boleta(idBoleta)
);

CREATE TABLE ordenPedido(
    idOrdenPedido INTEGER NOT NULL PRIMARY KEY,
    fechaOrden DATE NOT NULL,
    idUsuario INTEGER NOT NULL,
    idBoleta INTEGER NOT NULL,
    bodegueroId INTEGER NOT NULL,
    contadorId INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idBoleta) REFERENCES boleta(idBoleta),
    FOREIGN KEY (bodegueroId) REFERENCES bodeguero(bodegueroId),
    FOREIGN KEY (contadorId) REFERENCES contador(contadorId)
);
