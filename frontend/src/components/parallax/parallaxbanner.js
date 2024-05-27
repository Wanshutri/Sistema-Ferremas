import "./parallaxbanner.css";
import { ParallaxBanner } from "react-scroll-parallax";

const Pbanner = ({ imagex }) => {
  return (
    <ParallaxBanner
      layers={[{ image: { imagex }, speed: -15 }]}
      className="aspect-[2/1] p1"
    />
  );
};

export default Pbanner;
