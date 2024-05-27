import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import hammer from "../../assets/img/martillo.jpg";
import "./productoscarrusel.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import { Link } from "react-router-dom";

function Responsiveproduct() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/productos")
      .then((response) => {
        const productosData = response.data.map((producto) => ({
          id: producto.idProducto,
          nombre: producto.nombreProducto,
          descripcion: producto.descripcion,
          precio: producto.precioProducto,
          image: producto.urlProducto,
          categoria: producto.idTipoProducto,
        }));
        setProductos(productosData);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);
  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    centerMode: true,
    centerPadding: "200px",
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "110px",
        },
      },
    ],
  };
  return (
    <div className="slider-container c1prod">
      <Slider {...settings}>
        {productos.map((producto) => (
          <div key={producto.id} className="dividerCardsCarrusel">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={producto.nombre}
                height="250"
                image={ "http://localhost:3001/images/" + producto.image}
              />
              <Divider className="dividercarrusel" />
              <CardContent className="cardcontentcarrusel">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="titulocarruselprod"
                >
                  {producto.nombre}
                </Typography>
                <Divider className="dividercarrusel" />
                <Typography variant="body2" color="text.secondary">
                  {producto.descripcion}
                </Typography>
              </CardContent>
              <Divider className="dividercarrusel" />
              <CardActions className="cardactioncarrusel">
                <Button size="small" className="buttonShopCarrusel">
                  <AddShoppingCartIcon />
                </Button>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="dividercarrusel"
                />
                <Button size="small" component={Link} to={`/detalleproducto/${producto.id}`}>Detalles...</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Responsiveproduct;
