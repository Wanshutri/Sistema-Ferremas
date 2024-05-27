import React, { useState, useEffect } from "react";
import Content from "../../components/ContadorComp/Content";
import Profile from "../../components/AdminComp/Profile";
import s from "./containdex.module.css";
import Sidebarcontador from "../../components/sidebarcontador/sidebarcontador";
import { DataGrid } from "@mui/x-data-grid";
import Informe from "../../components/AdminComp/Informe";
import axios from "axios";
import CrudV from "../../components/VendedorComp/CrudV";

const columns = [
  { field: "idBoleta", headerName: "ID Boleta", width: 100 },
  { field: "fechaBoleta", headerName: "Fecha", width: 130 },
  { field: "totalclp", headerName: "Total (CLP)", type: "number", width: 120 },
  { field: "nombreCompleto", headerName: "Nombre Completo", width: 200 },
  { field: "correo", headerName: "Correo", width: 200 },
];

export const obtenerBoletassDesdeAPI = () => {
  return axios
    .get("http://localhost:3001/api/boletas")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error al obtener boletas:", error);
      throw error; // Re-lanza el error para que pueda ser manejado fuera de la función si es necesario
    });
};

const Containdex = () => {
  const [boletas, setBoletas] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    fetchBoletas();
  }, []);

  const fetchBoletas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/boletas");
      setBoletas(response.data);
    } catch (error) {
      console.error("Error fetching boletas:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id="root" className={s.customBackground}>
      <div className={s.dashboard}>
        <Sidebarcontador handleTabClick={handleTabClick} />
        <div className={s.dashboardcontent}>
          {activeTab === "dashboard" && <Content />}
          {activeTab === "pagos" && (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={boletas}
                columns={columns}
                pageSize={5}
                checkboxSelection
                getRowId={(row) => row.idBoleta} // Indicar que idBoleta es el identificador único
              />
            </div>
          )}
          {activeTab === "depositos" && <CrudV />}
          {activeTab === "informe" && <Informe />}
          
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Containdex;