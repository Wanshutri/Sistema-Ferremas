import React, { useState, useEffect } from "react";
import s from "./ListaProductos.module.css";
import { obtenerProductosDesdeAPI } from "./ListaProductosCrud";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductosDesdeAPI()
      .then((productos) => {
        setProductos(productos);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        // Maneja el error de acuerdo a tus necesidades
      });
  }, []);

  return (
    <div className={s.empLista}>
      <div className={s.listaHeader}>
        <h2>Productos</h2>
        <select>
          <option value="Recientes">Recientes</option>
          <option value="Oferta">Oferta</option>
          <option value="EnEspera">En Espera</option>
        </select>
      </div>
      <div className={s.listaContainer}>
        {productos.map((producto) => (
          <div className={s.lista2} key={producto.idProducto}>
            {" "}
            {/* Asegúrate de usar una clave única para cada producto */}
            <div className={s.empDetalle}>
              <img
                src={"http://localhost:3001/images/" + producto.urlProducto}
                alt={producto.nombreProducto}
                className={s.imgprod}
              />
              <h2>
                {producto.nombreProducto} {producto.apellido}
              </h2>
            </div>
            <span>{producto.descripcion}</span>
            <span>{producto.precioProducto}</span>
            <span>{producto.stock}</span>
            {/* Agrega aquí cualquier otro detalle que desees mostrar */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProductos;
