DROP TABLE IF EXISTS ordenPedido;
DROP TABLE IF EXISTS pago;
DROP TABLE IF EXISTS boleta;
DROP TABLE IF EXISTS detalle_carrito;
DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS informe_venta;
DROP TABLE IF EXISTS reporte_financiero;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS sucursal;


-- Creacion de la base de datos

CREATE TABLE sucursal(
    idSucursal INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    direccion VARCHAR(30) NOT NULL
);

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
    administrador BOOLEAN NOT NULL,
    contador BOOLEAN NOT NULL,
    bodeguero BOOLEAN NOT NULL,
    cliente BOOLEAN NOT NULL,
    vendedor BOOLEAN NOT NULL
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

CREATE TABLE reporte_financiero(
    idReporteFinanciero INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fecha DATE NOT NULL,
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
    total INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    idCarrito INTEGER NOT NULL,
    idSucursal INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idCarrito) REFERENCES carrito(idCarrito),
    FOREIGN KEY (idSucursal) REFERENCES sucursal(idSucursal)
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
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idBoleta) REFERENCES boleta(idBoleta)
);