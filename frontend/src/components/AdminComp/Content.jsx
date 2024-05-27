import React from "react";
import ContentHeader from "./ContentHeader";
import s from "./Content.module.css";
import AdminCard from "./AdminCard";
import ListaEmpleados from "./ListaEmpleados";

const Content = () => {
  return (
    <div className={s.content1}>
      <ContentHeader />
      <AdminCard />
      <ListaEmpleados />
    </div>
  );
};

export default Content;
