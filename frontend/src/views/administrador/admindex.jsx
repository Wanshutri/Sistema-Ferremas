import React from "react";
import Sidebaradmin from "../../components/sidebaradmin/sidebaradmin";
import Content from "../../components/AdminComp/Content";
import Profile from "../../components/AdminComp/Profile";
import s from "./admindex.module.css";

const admindex = () => {
  return (
    <div id="root" className={s.customBackground}>
      <div className={s.dashboard}>
        <Sidebaradmin />
        <div className={s.dashboardcontent}>
          <Content />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default admindex;
