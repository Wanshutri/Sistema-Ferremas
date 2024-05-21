import React, { useState } from "react";
import s from "./ListaProductos.module.css";
import Imagen1 from "./../../assets/img/martillo.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

  const [producto, setProducto] = useState({
    nombreProducto: "",
    descripcion: "",
    precioProducto: "",
    idTipoProducto: "",
    stock: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tipoP, setTipoP] = React.useState('');

  const handleChange2 = (event) => {
    setTipoP(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/producto", producto)
      .then((response) => {
        console.log("Producto creado:", response.data);
        // Aquí podrías redirigir a otra página, mostrar un mensaje de éxito, etc.
      })
      .catch((error) => {
        console.error("Error al crear producto:", error);
      });
  };


  return (
    <>
      <div className={s.empLista}>
        <div className={s.listaHeader}>
          <h2>Productos</h2>
          <Button variant="outline-success" onClick={handleShow}>
            <FaPlusCircle />
          </Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="nombreProducto"
                value={producto.nombreProducto}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre de Producto"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="description"
                value={producto.descripcion}
                onChange={handleChange}
                className="form-control"
                placeholder="Descripción de Producto"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="precio"
                value={producto.precioProducto}
                onChange={handleChange}
                className="form-control"
                placeholder="Precio de Producto"
                required
              />
            </div>
            <div className="mb-3">
              <FormControl fullWidth>
                <InputLabel id="selectTipoLabel">Tipo Producto</InputLabel>
                <Select
                  labelId="selectTipoLabel"
                  id="selectTipo"
                  value={tipoP}
                  label="Tipo de Producto"
                  onChange={handleChange2}
                >
                  <MenuItem value={"Herramienta"}>Herramienta</MenuItem>
                  <MenuItem value={"Cosa 2"}>Cosa 2</MenuItem>
                  <MenuItem value={"Material"}>Material</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="stockProduct"
                value={producto.stock}
                onChange={handleChange}
                className="form-control"
                placeholder="Stock de Producto"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ margin: "0px" }}
          >
            Cerrar
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListaProductosCrud;
