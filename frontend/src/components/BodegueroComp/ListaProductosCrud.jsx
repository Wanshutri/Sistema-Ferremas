import React, { useState, useEffect } from "react";
import s from "./ListaProductos.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

import { FaPlusCircle, FaEllipsisV } from "react-icons/fa";

export const obtenerProductosDesdeAPI = () => {
  return axios
    .get("http://localhost:3001/api/productos")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error al obtener productos:", error);
      throw error; // Re-lanza el error para que pueda ser manejado fuera de la función si es necesario
    });
};

const ListaProductosCrud = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombreProducto: "",
    descripcion: "",
    precioProducto: 0,
    idTipoProducto: 1,
    stock: 0,
    urlProducto: "",
  });

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("Agregar Producto");

  const handleClose = () => {
    setShow(false);
    setModalTitle("Agregar Producto");
    // Limpiar el estado del producto cuando se cierra el modal
    setProducto({
      idProducto: "",
      nombreProducto: "",
      descripcion: "",
      precioProducto: 0,
      idTipoProducto: 1,
      stock: 0,
      urlProducto: "",
    });
  };
  const handleShow = () => {
    // Crear un nuevo objeto de producto con valores vacíos
    const nuevoProducto = {
      nombreProducto: "",
      descripcion: "",
      precioProducto: 0,
      idTipoProducto: 1,
      stock: 0,
      urlProducto: "",
    };
    setProducto(nuevoProducto);
    setModalTitle("Agregar Producto");
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setProducto({
      ...producto,
      idTipoProducto: e.target.value,
    });
  };

  const handleModificarProducto = (producto) => {
    setProducto(producto);
    setModalTitle("Modificar Producto");
    setShow(true);
  };

  const handleEliminarProducto = (idProducto) => {
    axios
      .delete(`http://localhost:3001/api/productos/${idProducto}`)
      .then((response) => {
        console.log("Producto eliminado:", response.data);
        // Vuelve a obtener la lista de productos después de eliminar uno
        axios
          .get("http://localhost:3001/api/productos")
          .then((response) => {
            setProductos(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener productos:", error);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
        // Maneja el error de acuerdo a tus requerimientos
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (producto.idProducto) {
      axios
        .put(
          `http://localhost:3001/api/productos/${producto.idProducto}`,
          producto
        )
        .then((response) => {
          console.log("Producto modificado:", response.data);
          // Vuelve a obtener la lista de productos después de modificar uno
          axios
            .get("http://localhost:3001/api/productos")
            .then((response) => {
              setProductos(response.data);
            })
            .catch((error) => {
              console.error("Error al obtener productos:", error);
            });
          setShow(false); // Cierra el modal después de guardar
        })
        .catch((error) => {
          console.error("Error al modificar producto:", error);
          // Maneja el error de acuerdo a tus requerimientos
        });
    } else {
      // Si el producto no tiene un ID, significa que es nuevo y debe ser creado en la base de datos
      axios
        .post("http://localhost:3001/api/productos", producto)
        .then((response) => {
          console.log("Producto creado:", response.data);
          // Vuelve a obtener la lista de productos después de crear uno
          axios
            .get("http://localhost:3001/api/productos")
            .then((response) => {
              setProductos(response.data);
            })
            .catch((error) => {
              console.error("Error al obtener productos:", error);
            });
          setShow(false); // Cierra el modal después de guardar
        })
        .catch((error) => {
          console.error("Error al crear producto:", error);
          // Maneja el error de acuerdo a tus requerimientos
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/productos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

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
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Menú</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <>
                  <tr key={producto.idProducto}>
                    <td>
                      <div className={s.empDetalle}>
                        <img
                          src={
                            "http://localhost:3001/images/" +
                            producto.urlProducto
                          }
                          alt={producto.nombreProducto}
                          className={s.imgprod}
                        />
                      </div>
                    </td>
                    <td>{producto.nombreProducto}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precioProducto}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                          <FaEllipsisV />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleModificarProducto(producto)}
                          >
                            Modificar
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleEliminarProducto(producto.idProducto)
                            }
                          >
                            Eliminar
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  <br></br>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="nombreProducto"
                value={producto.nombreProducto}
                onChange={handleChange}
                placeholder="Nombre de Producto"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                placeholder="Descripción de Producto"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="precioProducto"
                value={producto.precioProducto}
                onChange={handleChange}
                placeholder="Precio de Producto"
                required
              />
            </Form.Group>
            <FormControl fullWidth className="mb-3">
              <InputLabel id="selectTipoLabel">Tipo Producto</InputLabel>
              <Select
                labelId="selectTipoLabel"
                id="selectTipo"
                value={producto.idTipoProducto}
                label="Tipo de Producto"
                onChange={handleSelectChange}
              >
                <MenuItem value={1}>Herramienta</MenuItem>
                <MenuItem value={2}>Cosa 2</MenuItem>
                <MenuItem value={3}>Material</MenuItem>
              </Select>
            </FormControl>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="stock"
                value={producto.stock}
                onChange={handleChange}
                placeholder="Stock de Producto"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ margin: "0px" }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListaProductosCrud;
