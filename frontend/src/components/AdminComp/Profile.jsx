import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import s from "./Profile.module.css";
import userpic from "./../../assets/img/userFoto.png";
import { BiAtom } from "react-icons/bi";
import { AuthContext } from "./../../js/AuthContext"; // Importa el contexto de autenticación
import axios from "axios";

const course = [
  {
    titulo: "Correo",
    icon: <BiAtom />,
    descripcion: "2 Magister",
  },
  {
    titulo: "Forklift Certificado",
    icon: <BiAtom />,
    descripcion: "Puede usar un Forklift",
  },
  {
    titulo: "Manual de cocina",
    icon: <BiAtom />,
    descripcion: "Sabe cocinar",
  },
];


const Profile = () => {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
  
    if (!localStorage.getItem("user")) {
    } else {
      const fetchPedidos = async () => {
        try {
          const userId = localStorage.getItem("user");
          const responseUsuario = await axios.get(
            `http://localhost:3001/api/usuarios/${userId}`
          );
            setUsuario(responseUsuario.data);
        } catch (error) {
          console.error("Error al obtener los datos", error);
        }
      };
      fetchPedidos();
    }
  }, []);
  

  return (
    <div className={s.perfilAdm}>
      <ProfileHeader />

      <div className={s.perfilUser}>
        <div className={s.detalleUser}>
          <img src={userpic} alt="" />
          <h3 className={s.username}>{usuario.pNombre} {usuario.pApellido}</h3>
          <span className={s.cargoTxt}>{usuario.cargo}</span>
        </div>
        <div className={s.extraUser}>
          {course.map((course) => (
            <div className={s.course}>
              <div className={s.detalleCourse}>
                <div className={s.courseCover}>{course.icon}</div>
                <div className={s.nombreCourse}>
                  <h5 className={s.tituloCourse}>{course.titulo}</h5>
                  <span className={s.descripcionCourse}>
                    {course.descripcion}
                  </span>
                </div>
              </div>
              <div className="action">:</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
