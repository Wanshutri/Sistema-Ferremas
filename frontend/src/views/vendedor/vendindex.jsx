import React, { useState } from "react";
import Content from "../../components/VendedorComp/Content";
import CrudV from "../../components/VendedorComp/CrudV";
import Profile from "../../components/AdminComp/Profile";
import s from "./vendindex.module.css";
import Sidebarvendedor from "../../components/sidebarvendedor/sidebarvendedor";

const Vendindex = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div id="root" className={s.customBackground}>
      <div className={s.dashboard}>
        <Sidebarvendedor handleTabClick={handleTabClick} />
        <div className={s.dashboardcontent}>
          {activeTab === "dashboard" && <Content />}
          {activeTab === "pedidosV" && <CrudV />}
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Vendindex;
