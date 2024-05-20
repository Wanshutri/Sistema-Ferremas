import React, { useState } from "react";
import Content from "../../components/BodegueroComp/Content";
import CrudB from "../../components/BodegueroComp/CrudB";
import Profile from "../../components/AdminComp/Profile";
import s from "./bodeindex.module.css";
import Sidebarbodeguero from "../../components/sidebarbodeguero/sidebarbodeguero";

const Bodeindex = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div id="root" className={s.customBackground}>
      <div className={s.dashboard}>
        <Sidebarbodeguero handleTabClick={handleTabClick} />
        <div className={s.dashboardcontent}>
          {activeTab === "dashboard" && <Content />}
          {activeTab === "productos" && <CrudB />}
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Bodeindex;
