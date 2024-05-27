import React from "react";
import s from "./Content.module.css";
import ListaEmpleadosCrud from "./ListaEmpleadosCrud";

const CrudA = () => {
  return (
    <div className={s.content1}>
      <ListaEmpleadosCrud />
    </div>
  );
};

export default CrudA;
