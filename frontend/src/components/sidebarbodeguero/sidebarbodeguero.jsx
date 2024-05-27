import React from "react";
import {
  BiBookAlt,
  BiHome,
  BiMessage,
  BiTask,
  BiHelpCircle,
} from "react-icons/bi";
import styles from "./sidebarbodeguero.module.css";
import logo from "./../../assets/img/logo.png";

const Sidebarbodeguero = ({ handleTabClick }) => {
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
          onClick={(e) => handleClick("productos", e)}
        >
          <BiTask className={styles.icon} />
          Productos
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

export default Sidebarbodeguero;
