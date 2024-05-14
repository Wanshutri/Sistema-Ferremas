import React, { useState } from "react";
import s from "./ListaPedidos.module.css";
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

const Pedidos = [
  {
    imagen: Imagen1,
    nombre: "Martillo",
    apellido: "#1231",
    cargo: "20-05-25",
    correo: "negrito_sabroso@gmail.com",
  },
];

const ListaPedidosCrud = () => {
  


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cargo, setCargo] = React.useState('');


  return (
    <>
      <div className={s.empLista}>
        <div className={s.listaHeader}>
          <h2>Pedidos</h2>
        </div>
        <div className={s.listaContainer}>
          {Pedidos.map((Pedidos) => (
            <div className={s.lista2}>
              <div className={s.empDetalle}>
                <img src={Pedidos.imagen} alt={Pedidos.nombre} />
                <h2>
                  {Pedidos.nombre} {Pedidos.apellido}
                </h2>
              </div>
              <span>{Pedidos.cargo}</span>
              <span>{Pedidos.correo}</span>
              <span className="empTodo">:</span>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default ListaPedidosCrud;
