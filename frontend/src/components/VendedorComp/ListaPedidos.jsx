import React from 'react'
import s from './ListaPedidos.module.css'
import Imagen1 from "./../../assets/img/martillo.jpg";

const Pedidos = [
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



const ListaPedidos = () => {
  return (
    <div className={s.empLista}>
        <div className={s.listaHeader}>
            <h2>Pedidos</h2>
            <select>
                <option value="gerente">Gerentes</option>
                <option value="vendedor">Vendedores</option>
                <option value="bodeguero">Bodegueros</option>
            </select>
        </div>
        <div className={s.listaContainer}>
            {Pedidos.map((Pedidos) => (
                <div className={s.lista2}>
                    <div className={s.empDetalle}>
                        <img src={Pedidos.imagen} alt={Pedidos.nombre} />
                        <h2>{Pedidos.nombre} {Pedidos.apellido}</h2>
                    </div>
                    <span>{Pedidos.cargo}</span>
                    <span>{Pedidos.correo}</span>
                    <span className='empTodo'>:</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ListaPedidos