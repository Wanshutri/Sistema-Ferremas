import React, { useState } from "react";
import Content from "../../components/ContadorComp/Content";
import Profile from "../../components/AdminComp/Profile";
import s from "./containdex.module.css";
import CrudC from "../../components/ContadorComp/CrudC";
import Sidebarcontador from "../../components/sidebarcontador/sidebarcontador";
import tablaPago from "../../components/tablaPago/tablaPago";
import { DataGrid } from "@mui/x-data-grid";
import Informe from "../../components/AdminComp/Informe";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "pago",
    headerName: "Pago",
    type: "number",
    width: 120,
  },

];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", pago: 35000 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", pago: 42000 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", pago: 45000 },
  { id: 4, lastName: "Stark", firstName: "Arya", pago: 16000 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", pago: 0 },
  { id: 6, lastName: "Melisandre", firstName: null, pago: 150000 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", pago: 44000 },
  { id: 8, lastName: "Frances", firstName: "Rossini", pago: 36000 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", pago: 65000 },
  { id: 10, lastName: "Roxie", firstName: "Harvey", pago: 65000 },
  { id: 11, lastName: "Roxie", firstName: "Harvey", pago: 65000 },
  { id: 12, lastName: "Roxie", firstName: "Harvey", pago: 65000 },
];

const Containdex = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
            <tablaPago>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },

                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </div>{" "}
            </tablaPago>
          )}
          {activeTab === "informe" && <Informe />}
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Containdex;
