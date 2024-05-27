import React from "react";
import s from "./Content.module.css";
import ListaProductosCrud from "./ListaProductosCrud";

const CrudB = () => {
  return (
    <div className={s.content1}>
      <ListaProductosCrud />
    </div>
  );
};

export default CrudB;
