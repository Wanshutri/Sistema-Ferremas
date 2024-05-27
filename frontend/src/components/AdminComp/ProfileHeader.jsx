import React from "react";
import { BiEdit } from "react-icons/bi";
import s from "./Profile.module.css";

function ProfileHeader() {
  return (
    <div className={s.perfilHeader}>
      <h2 className={s.headerTitulo}>Perfil</h2>
      <div className={s.editar}>
        <BiEdit className={s.icon} />
      </div>
    </div>
  );
}

export default ProfileHeader;
