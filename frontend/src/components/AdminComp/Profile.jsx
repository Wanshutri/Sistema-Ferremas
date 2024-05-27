import React from "react";
import ProfileHeader from "./ProfileHeader";
import s from "./Profile.module.css";
import userpic from "./../../assets/img/userDefault.jpg";
import { BiAtom } from "react-icons/bi";

const course = [
  {
    titulo: "HTML CSS",
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
  return (
    <div className={s.perfilAdm}>
      <ProfileHeader />

      <div className={s.perfilUser}>
        <div className={s.detalleUser}>
          <img src={userpic} alt="" />
          <h3 className={s.username}>Blanco Rico</h3>
          <span className={s.cargoTxt}>CEO</span>
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
