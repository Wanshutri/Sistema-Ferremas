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
import Pagination from "react-bootstrap/Pagination";
import { FaPlusCircle, FaEllipsisV } from "react-icons/fa";

export const obtenerProductosDesdeAPI = () => {
  return axios
    .get("http://localhost:3001/api/productos")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error al obtener productos:", error);
      throw error;
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
    imageFile: null,
  });

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("Agregar Producto");
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 5;

  const handleClose = () => {
    setShow(false);
    setModalTitle("Agregar Producto");
    setProducto({
      nombreProducto: "",
      descripcion: "",
      precioProducto: 0,
      idTipoProducto: 1,
      stock: 0,
      imageFile: null,
    });
  };

  const handleShow = () => {
    setProducto({
      nombreProducto: "",
      descripcion: "",
      precioProducto: 0,
      idTipoProducto: 1,
      stock: 0,
      imageFile: null,
    });
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

  const handleImageChange = (e) => {
    setProducto({
      ...producto,
      imageFile: e.target.files[0],
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
        obtenerProductosDesdeAPI()
          .then((data) => {
            setProductos(data);
          })
          .catch((error) => {
            console.error("Error al obtener productos:", error);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombreProducto", producto.nombreProducto);
    formData.append("descripcion", producto.descripcion);
    formData.append("precioProducto", producto.precioProducto);
    formData.append("idTipoProducto", producto.idTipoProducto);
    formData.append("stock", producto.stock);
    formData.append("image", producto.imageFile);

    try {
      if (producto.idProducto) {
        const response = await axios.put(
          `http://localhost:3001/api/productos/${producto.idProducto}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(response.data)
      } else {
        await axios.post("http://localhost:3001/api/productos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const updatedProducts = await obtenerProductosDesdeAPI();
      setProductos(updatedProducts);
      setShow(false);
    } catch (error) {
      console.error("Error al crear/modificar producto:", error);
    }
  };

  useEffect(() => {
    obtenerProductosDesdeAPI()
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  // Calcular los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productosPorPagina;
  const indexOfFirstProduct = indexOfLastProduct - productosPorPagina;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

  // Configurar la paginación
  const totalPages = Math.ceil(productos.length / productosPorPagina);

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
              {currentProducts.map((producto) => (
                <tr key={producto.idProducto}>
                  <td>
                    <div className={s.empDetalle}>
                      <img
                        src={
                          "http://localhost:3001/images/" + producto.urlProducto
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
              ))}
            </tbody>
          </table>
        </div>
        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => setCurrentPage(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
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
                <MenuItem value={2}>Materiales Básicos</MenuItem>
                <MenuItem value={3}>Equipos de Seguridad</MenuItem>
                <MenuItem value={4}>Tornillos y Anclajes</MenuItem>
                <MenuItem value={5}>Fijaciones y Adhesivos</MenuItem>
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
            <Form.Group className="mb-3">
              <Form.Label>Imagen de Producto</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
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
