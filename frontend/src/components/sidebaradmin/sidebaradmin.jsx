import React from "react";
import {
  BiBookAlt,
  BiHome,
  BiMessage,
  BiSolidReport,
  BiTask,
  BiHelpCircle,
} from "react-icons/bi";
import styles from "./sidebaradmin.module.css";
import logo from "./../../assets/img/logo.png";

const Sidebaradmin = ({ handleTabClick }) => {
  const handleClick = (tab, event) => {
    event.preventDefault();
    handleTabClick(tab);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <BiBookAlt className={styles.logoicon} />
        <img src={logo} alt="" />
      </div>

      <div className={styles.menulist}>
        <a
          href=""
          className={`${styles.item} active`}
          onClick={(e) => handleClick("dashboard", e)}
        >
          <BiHome className={styles.icon} />
          Dashboard
        </a>
        <a
          href=""
          className={styles.item}
          onClick={(e) => handleClick("crudA", e)}
        >
          <BiTask className={styles.icon} />
          Registro Empleados
        </a>
        <a
          href=""
          className={styles.item}
          onClick={(e) => handleClick("informe", e)}
        >
          <BiSolidReport className={styles.icon} />
          Informe
        </a>
        <a href="" className={styles.item}>
          <BiMessage className={styles.icon} />
          Mensajes
        </a>
        <a href="" className={styles.item}>
          <BiHelpCircle className={styles.icon} />
          Ayuda
        </a>
      </div>
    </div>
  );
};

export default Sidebaradmin;
