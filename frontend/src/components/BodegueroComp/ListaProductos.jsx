import React from 'react'
import s from './ListaProductos.module.css'
import Imagen1 from "./../../assets/img/martillo.jpg";

const Productos = [
    {
        imagen: Imagen1,
        nombre: "Martillo",
        apellido: "#1231",
        cargo: "20-05-25",
        correo: "negrito_sabroso@gmail.com",
      },
      {
        imagen: Imagen1,
        nombre: "Martillo",
        apellido: "#1234",
        cargo: "26-05-25",
        correo: "negrito_sabroso@gmail.com",
      },
      {
        imagen: Imagen1,
        nombre: "Martillo",
        apellido: "#1244",
        cargo: "23-05-25",
        correo: "negrito_sabroso@gmail.com",
      },

]



const ListaProductos = () => {
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
            {Productos.map((Productos) => (
                <div className={s.lista2}>
                    <div className={s.empDetalle}>
                        <img src={Productos.imagen} alt={Productos.nombre} />
                        <h2>{Productos.nombre} {Productos.apellido}</h2>
                    </div>
                    <span>{Productos.cargo}</span>
                    <span>{Productos.correo}</span>
                    <span className='empTodo'>:</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ListaProductos