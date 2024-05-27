import React from "react";
import ContentHeader from "./ContentHeader";
import s from "./Content.module.css";
import ContadorCard from "./ContadorCard";

const Content = () => {
  return (
    <div className={s.content1}>
      <ContentHeader />
      <ContadorCard />
    </div>
  );
};

export default Content;
