import React, { useState } from "react";
import Sidebaradmin from "../../components/sidebaradmin/sidebaradmin";
import Content from "../../components/AdminComp/Content";
import CrudA from "../../components/AdminComp/CrudA";
import Profile from "../../components/AdminComp/Profile";
import s from "./admindex.module.css";

const Admindex = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div id="root" className={s.customBackground}>
      <div className={s.dashboard}>
        <Sidebaradmin handleTabClick={handleTabClick} />
        <div className={s.dashboardcontent}>
          {activeTab === "dashboard" && <Content />}
          {activeTab === "crudA" && <CrudA />}
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Admindex;
