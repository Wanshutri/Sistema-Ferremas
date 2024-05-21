import Carousel from 'react-bootstrap/Carousel';
import "./carousel3.css";

function Carousel3() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="imagencarousel"
          src= "https://m.media-amazon.com/images/I/71IgFnDhlUL.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="imagencarousel2"
          src="https://comicvine.gamespot.com/a/uploads/scale_medium/11117/111178336/7616899-5267378913-latest.png"
          alt="Second slide"
          
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="imagencarousel3"
          src="https://steamuserimages-a.akamaihd.net/ugc/1735548946630065027/C957493DF72EEA0B2DD9230784508A3A904DF8B6/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousel3;