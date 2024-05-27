import React, {useState} from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import s from "./Profile.module.css";

function ProfileHeader() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {

    console.log("Cerrando sesión...");
  };

  return (
    <div className={s.perfilHeader}>
      <h2 className={s.headerTitulo}>Perfil</h2>
      <div className={s.editar} onClick={toggleDropdown}>
        <RiLogoutCircleLine className={s.icon} />
        {dropdownVisible && (
          <div className={s.dropdownMenu}>
            <button onClick={handleLogout} className={s.dropdownItem}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;