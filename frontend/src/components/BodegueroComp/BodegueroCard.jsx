import React from "react";
import { BiLogoHtml5 } from "react-icons/bi";
import s from './Content.module.css'

const course = [
  {
    title: "Card1",
    icon: <BiLogoHtml5 />,
  },
  {
    title: "Card2",
    icon: <BiLogoHtml5 />,
  },
  {
    title: "Card3",
    icon: <BiLogoHtml5 />,
  },
];

const AdminCard = () => {
  return (
    <div className={s.cardContainer}>
      {course.map((item) => (
        <div className={s.carta}>
          <div className={s.cardCover}>{item.icon}</div>
          <div className={s.cardTitle}><h2>{item.title}</h2></div>
        </div>
      ))}
    </div>
  );
};

export default AdminCard;
