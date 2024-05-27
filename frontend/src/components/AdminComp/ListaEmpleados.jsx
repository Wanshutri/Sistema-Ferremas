import React from "react";
import s from "./ListaEmpleados.module.css";
import Imagen1 from "./../../assets/img/empleadoDefault.jpg";

const empleados = [
  {
    imagen: Imagen1,
    nombre: "Negrito",
    apellido: "Sabroso",
    cargo: "Gerente",
    correo: "negrito_sabroso@gmail.com",
  },
  {
    imagen: Imagen1,
    nombre: "Negrito",
    apellido: "Sabroso",
    cargo: "Gerente",
    correo: "negrito_sabroso@gmail.com",
  },
  {
    imagen: Imagen1,
    nombre: "Negrito",
    apellido: "Sabroso",
    cargo: "Gerente",
    correo: "negrito_sabroso@gmail.com",
  },
  {
    imagen: Imagen1,
    nombre: "Negrito",
    apellido: "Sabroso",
    cargo: "Gerente",
    correo: "negrito_sabroso@gmail.com",
  },
  {
    imagen: Imagen1,
    nombre: "Negrito",
    apellido: "Sabroso",
    cargo: "Gerente",
    correo: "negrito_sabroso@gmail.com",
  },
  {
    imagen: Imagen1,
    nombre: "Negrito",
    apellido: "Sabroso",
    cargo: "Gerente",
    correo: "negrito_sabroso@gmail.com",
  },
  {
    imagen: Imagen1,
    nombre: "Negrito",
    apellido: "Sabroso",
    cargo: "Gerente",
    correo: "negrito_sabroso@gmail.com",
  },
];

const ListaEmpleados = () => {
  return (
    <div className={s.empLista}>
      <div className={s.listaHeader}>
        <h2>Empleados</h2>
        <select>
          <option value="gerente">Gerentes</option>
          <option value="vendedor">Vendedores</option>
          <option value="bodeguero">Bodegueros</option>
        </select>
      </div>
      <div className={s.listaContainer}>
        {empleados.map((empleados) => (
          <div className={s.lista2}>
            <div className={s.empDetalle}>
              <img src={empleados.imagen} alt={empleados.nombre} />
              <h2>
                {empleados.nombre} {empleados.apellido}
              </h2>
            </div>
            <span>{empleados.cargo}</span>
            <span>{empleados.correo}</span>
            <span className="empTodo">:</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaEmpleados;
