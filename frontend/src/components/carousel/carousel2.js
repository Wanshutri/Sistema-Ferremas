import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel2.css"
import React from "react";
import Slider from "react-slick";

function Fade1({image, image2, image3, image4}) {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    centerMode: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    cssEase: "linear"
  };
  return (
    <div className="slider-container scont">
      <Slider {...settings}>
        <div className="divimg">
          <img src={image} className="carimg2"/>
        </div>
        <div className="divimg">
          <img src={image2} className="carimg2"/>
        </div>
        <div className="divimg">
          <img src={image3} className="carimg2"/>
        </div>
        <div className="divimg"> 
          <img src={image4} className="carimg2"/>
        </div>
      </Slider>
    </div>
  );
}

export default Fade1;