import React from "react";
import s from "./Content.module.css";
import ListaPagosCrud from "./ListaPagosCrud";

const CrudC = () => {
  return (
    <div className={s.content1}>
      <ListaPagosCrud />
    </div>
  );
};

export default CrudC;
