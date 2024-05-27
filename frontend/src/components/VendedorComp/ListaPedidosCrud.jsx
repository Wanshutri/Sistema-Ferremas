import React, { useState, useEffect } from "react";
import s from "./ListaPedidos.module.css";
import axios from "axios";

export const obtenerDepositosDesdeAPI = () => {
  return axios
    .get("http://localhost:3001/api/depositos")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error al obtener depositos:", error);
      throw error; // Re-lanza el error para que pueda ser manejado fuera de la función si es necesario
    });
};

const ListaPedidosCrud = () => {
  const [depositos, setDepositos] = useState([]);

  useEffect(() => {
    obtenerDepositosDesdeAPI().then(setDepositos).catch(console.error);
  }, []);

  const handleEstadoChange = (id, nuevoEstado) => {
    axios
      .put(`http://localhost:3001/api/depositos/${id}`, {
        estadoDeposito: nuevoEstado,
      })
      .then((response) => {
        setDepositos(
          depositos.map((deposito) =>
            deposito.id === id
              ? { ...deposito, estadoDeposito: nuevoEstado }
              : deposito
          )
        );
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del depósito:", error);
      });
  };

  return (
    <div className={s.empLista}>
      <div className={s.listaHeader}>
        <h2>Lista de Depósitos</h2>
      </div>
      <div className={s.listaContainer}>
        {depositos.map((deposito) => (
          <div key={deposito.id} className={s.lista2}>
            <div className={s.empDetalle}>
              <img
                src={deposito.urlComprobante}
                alt={`Comprobante ${deposito.id}`}
              />
              <h2>
                Depósito #{deposito.id} - {deposito.fechaDeposito}
              </h2>
            </div>
            <span>Monto: ${deposito.monto}</span>
            <span>Estado: {deposito.estadoDeposito}</span>
            <div>
              <select
                value={deposito.estadoDeposito}
                onChange={(e) =>
                  handleEstadoChange(deposito.id, e.target.value)
                }
              >
                <option value="P">Pendiente</option>
                <option value="A">Aceptado</option>
                <option value="R">Rechazado</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPedidosCrud;
