import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import sana from "./../../img/sana.jpg";
import s from "./PaginaProducto.module.css";
import BannerCom from "../../components/banner/bannerCom";
import Footer from "../../components/footer/footer";
import BasicSelect from "./dropdownbarra";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import escaletira from "./../../assets/img/escalerita.jpg";
import CardActions from "@mui/material/CardActions";
import FloatCarrito from "../../components/FloatCarrito/FloatCarrito";
import axios from "axios";

function PaginaProducto() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/productos")
      .then((response) => {
        const productosData = response.data.map((producto) => ({
          id: producto.idProducto,
          title: producto.nombreProducto,
          description: producto.descripcion,
          price: producto.precioProducto,
          image: producto.urlProducto,
          category: producto.idTipoProducto,
        }));
        setProductos(productosData);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  // Esta función genera una lista de productos para la página actual
  const generateProductsForPage = (pageNumber) => {
    const productsPerPage = 20; // Número de productos por página
    const startIndex = (pageNumber - 1) * productsPerPage; // Índice de inicio de la página actual
    const endIndex = startIndex + productsPerPage; // Índice de fin de la página actual

    return productos.slice(startIndex, endIndex); // Retorna solo los productos correspondientes a la página actual
  };

  return (
    <div className={s.pagproductodo}>
      <header>
        <FloatCarrito />
        <BannerCom />
      </header>
      <body className={s.bodyprodpag}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar className={s.toolbarproducto}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Catálogo de Productos
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Buscar productos..."
                size="small"
                sx={{ bgcolor: "background.paper", borderRadius: 1, mr: 2 }}
              />
              <Button
                className={s.buttonbuscar}
                variant="contained"
                color="secondary"
              >
                Buscar
              </Button>
            </Toolbar>
          </AppBar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <Box sx={{ p: 2, width: 250 }}>
              <BasicSelect />
            </Box>
          </Menu>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {generateProductsForPage(page).map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <div class="Cards cardproductohome">
                    <Card
                      className="cartasdet"
                      sx={{ width: 320, maxWidth: 545 }}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image={"http://localhost:3001/images/"+product.image}
                        
                      />
                      <CardContent className="cardcontentcarrusel">
                        <br></br>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title}
                        </Typography>
                        <Divider>
                          <Chip
                            label={product.category}
                            size="small"
                            color="warning"
                            sx={{ mr: 1 }}
                            className={s.chipcarrusel}
                          />
                        </Divider>
                        <br></br>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                      </CardContent>
                      <Divider className="dividercarrusel" />
                      <CardActions className="cardactioncarrusel">
                        <Button size="small">Agregar al carrito</Button>
                        <Button size="small">Ver detalles</Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
            <Pagination count={3} page={page} onChange={handleChange} />
          </Box>
        </Box>
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PaginaProducto;
