import React, { useState, useEffect } from "react";
import s from "./ListaEmpleados.module.css";
import Imagen1 from "./../../assets/img/empleadoDefault.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";

const ListaEmpleadosCrud = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalTitle, setModalTitle] = useState("Agregar Usuario");

  const [usuario, setUsuario] = useState({
    correoUsuario: "",
    contrasenaUsuario: "",
    rutUsuario: "",
    pNombre: "",
    sNombre: "",
    pApellido: "",
    sApellido: "",
    fechaNac: "",
    celular: "",
    direccion: "",
    cargo: "Contador", // Valor por defecto para el cargo
  });

  const obtenerUsuariosDesdeAPI = () => {
    return axios
      .get("http://localhost:3001/api/usuarios")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
        throw error;
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "celular" ? parseInt(value) : value; // Convertir a número si el campo es 'celular'
    setUsuario({
      ...usuario,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalTitle === "Agregar Usuario") {
      // Crear nuevo usuario
      axios
        .post("http://localhost:3001/api/usuarios", {
          correoUsuario: usuario.correoUsuario,
          contrasenaUsuario: usuario.contrasenaUsuario,
          rutUsuario: usuario.rutUsuario,
          pNombre: usuario.pNombre,
          sNombre: usuario.sNombre,
          pApellido: usuario.pApellido,
          sApellido: usuario.sApellido,
          fechaNac: usuario.fechaNac,
          celular: usuario.celular,
          direccion: usuario.direccion,
          cargo: usuario.cargo,
        })
        .then((response) => {
          console.log("Usuario creado:", response.data);
          // Actualizar la lista de usuarios
          obtenerUsuariosDesdeAPI()
            .then((data) => {
              setUsuarios(data);
            })
            .catch((error) => {
              console.error("Error al obtener usuarios:", error);
            });
          // Limpiar el formulario y cerrar el modal
          setUsuario({
            correoUsuario: "",
            contrasenaUsuario: "",
            rutUsuario: "",
            pNombre: "",
            sNombre: "",
            pApellido: "",
            sApellido: "",
            fechaNac: "",
            celular: "",
            direccion: "",
            cargo: "Contador", // Puedes establecer el valor por defecto nuevamente
          });
          handleClose(); // Cerrar el modal después de enviar los datos
        })
        .catch((error) => {
          console.error("Error al crear usuario:", error);
        });
    } else if (modalTitle === "Modificar Usuario") {
      // Modificar usuario existente
      axios
        .put(`http://localhost:3001/api/usuarios/${usuario.idUsuario}`, usuario)
        .then((response) => {
          console.log("Usuario modificado:", response.data);
          // Actualizar la lista de usuarios
          obtenerUsuariosDesdeAPI()
            .then((data) => {
              setUsuarios(data);
            })
            .catch((error) => {
              console.error("Error al obtener usuarios:", error);
            });
          // Cerrar el modal después de enviar los datos
          handleClose();
        })
        .catch((error) => {
          console.error("Error al modificar usuario:", error);
        });
    }
  };

  const handleEliminarUsuario = (idUsuario) => {
    axios
      .delete(`http://localhost:3001/api/usuarios/${idUsuario}`)
      .then((response) => {
        console.log("Usuario eliminado:", response.data);
        obtenerUsuariosDesdeAPI()
          .then((data) => {
            setUsuarios(data);
          })
          .catch((error) => {
            console.error("Error al obtener usuarios:", error);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar usuarios:", error);
      });
  };

  const handleCrearUsuario = (usuario) => {
    setModalTitle("Agregar Usuario");
    setShow(true);
    setUsuario({
      idUsuario: "",
      correoUsuario: "",
      contrasenaUsuario: "",
      rutUsuario: "",
      pNombre: "",
      sNombre: "",
      pApellido: "",
      sApellido: "",
      fechaNac: "",
      celular: "",
      direccion: "",
      cargo: "Contador", // Puedes establecer el valor por defecto nuevamente
    });
  };

  const handleModificarUsuario = (usuario) => {
    setModalTitle("Modificar Usuario");
    setShow(true);
    const usuarioModificado = { ...usuario };
    setUsuario(usuarioModificado);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/usuarios")
      .then((response) => {
        // Filtrar los empleados para mostrar solo aquellos que no tienen el cargo de cliente
        const empleadosFiltrados = response.data.filter(
          (usuario) => usuario.cargo !== "cliente"
        );
        setUsuarios(empleadosFiltrados);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de empleados:", error);
      });
  }, []);

  return (
    <>
      <div className={s.empLista}>
        <div className={s.listaHeader}>
          <h2>Empleados</h2>
          <div>
            <Button variant="outline-success" onClick={handleCrearUsuario}>
              <FaPlusCircle />
            </Button>
          </div>
        </div>
        <div className={s.listaContainer}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    {usuario.pNombre} {usuario.sNombre}
                  </td>
                  <td>{usuario.cargo}</td>
                  <td>{usuario.correoUsuario}</td>
                  <td>
                    <FormControl>
                      <Select defaultValue="">
                        <MenuItem value="" disabled>
                          Acciones
                        </MenuItem>
                        <MenuItem
                          value="eliminar"
                          onClick={() =>
                            handleEliminarUsuario(usuario.idUsuario)
                          }
                        >
                          Eliminar
                        </MenuItem>
                        <MenuItem
                          value="modificar"
                          onClick={() => handleModificarUsuario(usuario)}
                        >
                          Modificar
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* Tus campos de entrada aquí */}
            {/* Ejemplo: */}
            <div className="mb-3">
              <input
                type="email"
                name="correoUsuario"
                value={usuario.correoUsuario}
                onChange={handleChange}
                className="form-control"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="contrasenaUsuario"
                value={usuario.contrasenaUsuario}
                onChange={handleChange}
                className="form-control"
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="rutUsuario"
                value={usuario.rutUsuario}
                onChange={handleChange}
                className="form-control"
                placeholder="RUT"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="pNombre"
                value={usuario.pNombre}
                onChange={handleChange}
                className="form-control"
                placeholder="Primer nombre"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="sNombre"
                value={usuario.sNombre}
                onChange={handleChange}
                className="form-control"
                placeholder="Segundo nombre"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="pApellido"
                value={usuario.pApellido}
                onChange={handleChange}
                className="form-control"
                placeholder="Primer apellido"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="sApellido"
                value={usuario.sApellido}
                onChange={handleChange}
                className="form-control"
                placeholder="Segundo apellido"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                name="fechaNac"
                value={usuario.fechaNac}
                onChange={handleChange}
                className="form-control"
                placeholder="Fecha de nacimiento"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                name="celular"
                value={usuario.celular}
                onChange={handleChange}
                className="form-control"
                placeholder="Celular"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="direccion"
                value={usuario.direccion}
                onChange={handleChange}
                className="form-control"
                placeholder="Dirección"
                required
              />
            </div>
            <div className="mb-3">
              <FormControl fullWidth>
                <InputLabel id="selectCargoLabel">Cargo</InputLabel>
                <Select
                  labelId="selectCargoLabel"
                  id="selectCargo"
                  value={usuario.cargo}
                  label="Cargo"
                  onChange={handleChange}
                  name="cargo"
                >
                  <MenuItem value={"Contador"}>Contador</MenuItem>
                  <MenuItem value={"Vendedor"}>Vendedor</MenuItem>
                  <MenuItem value={"Bodeguero"}>Bodeguero</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* Fin de tus campos de entrada */}
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginRight: "10px" }}
            >
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListaEmpleadosCrud;
