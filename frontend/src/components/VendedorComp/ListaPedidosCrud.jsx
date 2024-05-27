import React, { useState, useEffect } from "react";
import s from "./ListaPedidos.module.css";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import TablePagination from '@mui/material/TablePagination';

export const obtenerDepositosDesdeAPI = () => {
  return axios
    .get("http://localhost:3001/api/depositos")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error al obtener depositos:", error);
      throw error;
    });
};

export const obtenerUsuariosDesdeAPI = () => {
  return axios
    .get("http://localhost:3001/api/usuarios")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error al obtener usuarios:", error);
      throw error;
    });
};

const ListaPedidosCrud = () => {
  const [depositos, setDepositos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    obtenerDepositosDesdeAPI().then(setDepositos).catch(console.error);
    obtenerUsuariosDesdeAPI().then(setUsuarios).catch(console.error);
  }, []);

  const handleEstadoChange = (id, nuevoEstado) => {
    console.log(`Cambiando estado de depósito ${id} a ${nuevoEstado}`);
    axios
      .put(`http://localhost:3001/api/depositos/${id}`, {
        estado: nuevoEstado,
      })
      .then((response) => {
        setDepositos(
          depositos.map((deposito) =>
            deposito.idDeposito === id
              ? { ...deposito, estado: nuevoEstado }
              : deposito
          )
        );
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del depósito:", error);
      });
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUserNameById = (idUsuario) => {
    const usuario = usuarios.find((usuario) => usuario.idUsuario === idUsuario);
    return usuario ? usuario.correoUsuario : "Desconocido";
  };

  return (
    <div className={s.empLista}>
      <div className={s.listaHeader}>
        <h2>Lista de Depósitos</h2>
      </div>
      <div className={s.listaContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Comprobante</th>
            </tr>
          </thead>
          <tbody>
            {depositos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((deposito) => (
                <tr key={deposito.id}>
                  <td>{getUserNameById(deposito.idUsuario)}</td>
                  <td>{deposito.fechaDeposito}</td>
                  <td>${deposito.monto}</td>
                  <td>
                    <select
                      value={deposito.estado}
                      onChange={(e) =>
                        handleEstadoChange(deposito.idDeposito, e.target.value)
                      }
                    >
                      <option value="P">Pendiente</option>
                      <option value="A">Aceptado</option>
                      <option value="R">Rechazado</option>
                    </select>
                    <p>{deposito.estado}</p>
                    
                  </td>
                  <td>
                    <img
                      src={
                        "http://localhost:3001/images/" +
                        deposito.urlComprobante
                      }
                      alt={`Comprobante ${deposito.id}`}
                      onClick={() =>
                        handleImageClick(
                          "http://localhost:3001/images/" +
                            deposito.urlComprobante
                        )
                      }
                      style={{ cursor: "pointer", width: "50px" }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <TablePagination
          component="div"
          count={depositos.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comprobante de Depósito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Comprobante de Depósito"
            className="img-fluid"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaPedidosCrud;