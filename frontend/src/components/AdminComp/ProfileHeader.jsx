import React, {useState, useContext} from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import s from "./Profile.module.css";
import { AuthContext } from "./../../js/AuthContext"; 
import { useNavigate } from 'react-router-dom';

function ProfileHeader() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { logout, authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {

    logout();
    navigate('/login');
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