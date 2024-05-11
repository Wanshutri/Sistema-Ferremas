import React from "react";
import {
  BiBookAlt,
  BiHome,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
} from "react-icons/bi";
import styles from "./sidebaradmin.module.css";
import logo from './../../assets/img/logo.png'

const Sidebaradmin = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <BiBookAlt className={styles.logoicon} />
        <img src={logo} alt="" />
      </div>

      <div className={styles.menulist}>
        <a href="" className={`${styles.item} active`}>
          <BiHome className={styles.icon} />
          Dashboard
        </a>
        <a href="" className={styles.item}>
          <BiTask className={styles.icon} />
          Cosa 2
        </a>
        <a href="" className={styles.item}>
          <BiSolidReport className={styles.icon} />
          Cosa 3
        </a>
        <a href="" className={styles.item}>
          <BiStats className={styles.icon} />
          Cosa 4
        </a>
        <a href="" className={styles.item}>
          <BiMessage className={styles.icon} />
          Cosa 5
        </a>
        <a href="" className={styles.item}>
          <BiHelpCircle className={styles.icon} />
          Cosa 6
        </a>
      </div>
    </div>
  );
};

export default Sidebaradmin;
