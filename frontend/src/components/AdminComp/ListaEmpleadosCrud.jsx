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


const ListaEmpleadosCrud = () => {
  const [usuarios, setUsuarios] = useState([]);
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
    administrador: false,
    contador: false,
    bodeguero: false,
    cliente: true,
    vendedor: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/usuarios", usuario)
      .then((response) => {
        console.log("Usuario creado:", response.data);
        // Aquí podrías redirigir a otra página, mostrar un mensaje de éxito, etc.
      })
      .catch((error) => {
        console.error("Error al crear usuario:", error);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cargo, setCargo] = React.useState("");

  const handleChange2 = (event) => {
    setCargo(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/usuarios")
      .then(response => {
        // Filtrar los empleados para mostrar solo aquellos que no tienen el cargo de cliente
        const empleadosFiltrados = response.data.filter(usuario => usuario.cargo !== 'cliente');
        setUsuarios(empleadosFiltrados);
      })
      .catch(error => {
        console.error("Error al obtener la lista de empleados:", error);
      });
  }, []);

  return (
    <>
      <div className={s.empLista}>
        <div className={s.listaHeader}>
          <h2>Empleados</h2>
          <div>
            <select>
              <option value="contador">Contadores</option>
              <option value="vendedor">Vendedores</option>
              <option value="bodeguero">Bodegueros</option>
            </select>
            <Button variant="outline-success" onClick={handleShow}>
              <FaPlusCircle />
            </Button>
          </div>
        </div>
        <div className={s.listaContainer}>
          {usuarios.map((usuarios) => (
            <div className={s.lista2}>
              <div className={s.empDetalle}>
                <img src={Imagen1} alt={usuarios.pNombre} />
                <h2>
                  {usuarios.pNombre} {usuarios.sNombre}
                </h2>
              </div>
              <span>{usuarios.cargo}</span>
              <span>{usuarios.correoUsuario}</span>
              <span className="empTodo">:</span>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
                  value={cargo}
                  label="Cargo"
                  onChange={handleChange2}
                >
                  <MenuItem value={"contador"}>Contador</MenuItem>
                  <MenuItem value={"vendedor"}>Vendedor</MenuItem>
                  <MenuItem value={"bodeguero"}>Bodeguero</MenuItem>
                </Select>
              </FormControl>
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

export default ListaEmpleadosCrud;
