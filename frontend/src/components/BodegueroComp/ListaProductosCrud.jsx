import React, { useState } from "react";
import s from "./ListaProductos.module.css";
import Imagen1 from "./../../assets/img/martillo.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";

const Productos = [
  {
    imagen: Imagen1,
    nombre: "Martillo",
    apellido: "#1231",
    cargo: "20-05-25",
    correo: "negrito_sabroso@gmail.com",
  },
];

const ListaProductosCrud = () => {
  


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cargo, setCargo] = React.useState('');


  return (
    <>
      <div className={s.empLista}>
        <div className={s.listaHeader}>
          <h2>Productos</h2>
        </div>
        <div className={s.listaContainer}>
          {Productos.map((Productos) => (
            <div className={s.lista2}>
              <div className={s.empDetalle}>
                <img src={Productos.imagen} alt={Productos.nombre} />
                <h2>
                  {Productos.nombre} {Productos.apellido}
                </h2>
              </div>
              <span>{Productos.cargo}</span>
              <span>{Productos.correo}</span>
              <span className="empTodo">:</span>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default ListaProductosCrud;
