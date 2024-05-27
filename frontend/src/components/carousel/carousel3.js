import Carousel from 'react-bootstrap/Carousel';
import "./carousel3.css";
import escaletira from "./../../assets/img/escalerita.jpg";

function Carousel3( {imagen1}) {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="imagencarousel"
          src= {imagen1}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousel3;