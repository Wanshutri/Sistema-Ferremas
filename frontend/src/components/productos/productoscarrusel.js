import React from "react";
import Slider from "react-slick";
import hammer from "../../assets/img/martillo.jpg";
import "./productoscarrusel.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function Responsiveproduct() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    centerMode: true,
    centerPadding: "200px",
    speed: 2500,
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
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel">
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles...</Button>
            </CardActions>
          </Card>
        </div>
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel" >
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles</Button>
            </CardActions>
          </Card>
        </div>
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel">
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles...</Button>
            </CardActions>
          </Card>
        </div>
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel">
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles...</Button>
            </CardActions>
          </Card>
        </div>
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel">
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles...</Button>
            </CardActions>
          </Card>
        </div>
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel">
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles...</Button>
            </CardActions>
          </Card>
        </div>
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel">
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles...</Button>
            </CardActions>
          </Card>
        </div>
        <div className="dividerCardsCarrusel">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="250"
              image={hammer}
            />
            <Divider className="dividercarrusel"/>
            <CardContent className="cardcontentcarrusel">
              <Typography gutterBottom variant="h5" component="div" className="titulocarruselprod">
                Lizard
              </Typography>
              <Divider className="dividercarrusel"/>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <Divider className="dividercarrusel"/>
            <CardActions className="cardactioncarrusel">
              <Button size="small" className="buttonShopCarrusel"><AddShoppingCartIcon/></Button>
              <Divider orientation="vertical" flexItem className="dividercarrusel"/>
              <Button size="small">Detalles...</Button>
            </CardActions>
          </Card>
        </div>
      </Slider>
    </div>
  );
}

export default Responsiveproduct;
