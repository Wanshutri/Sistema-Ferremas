import React, { useState } from "react";
import Content from "../../components/ContadorComp/Content";
import Profile from "../../components/AdminComp/Profile";
import s from "./containdex.module.css";
import CrudC from "../../components/ContadorComp/CrudC";
import Sidebarcontador from "../../components/sidebarcontador/sidebarcontador";
import tablaPago from "../../components/tablaPago/tablaPago";

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
          {activeTab === "pagos" && <tablaPago />}
          {activeTab === "informe" && <CrudC />}
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Containdex;
