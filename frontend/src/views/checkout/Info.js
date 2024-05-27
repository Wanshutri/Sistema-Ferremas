import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";

function Info() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/carrito/${localStorage.getItem("user")}`
        );
        const list = [];
        let total = 0; // Inicializar el total
        if (response.data) {
          const detalleCarrito = response.data;
          for (const dt of detalleCarrito) {
            const proData = await axios.get(
              `http://localhost:3001/api/productos/${dt.idProducto}`
            );
            const pro = proData.data;
            let p = {
              idProducto: pro.id, // Agregar idProducto
              nombreProducto: pro.nombreProducto,
              cantidadProducto: dt.cantidadProducto,
              precio: pro.precioProducto,
              totalProducto: pro.precioProducto * dt.cantidadProducto,
            };
            total += p.totalProducto; // Sumar al total
            list.push(p);
          }
          setProductos(list);
          setTotal(total); // Setear el total
          localStorage.setItem("total", total);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        ${total}
      </Typography>
      <List disablePadding>
        {productos.map((producto) => (
          <ListItem key={producto.idProducto} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={`${producto.nombreProducto} ($${producto.precio})`}
              secondary={`Cantidad: ${producto.cantidadProducto}`}
            />
            <Typography variant="body1" fontWeight="medium">
              {producto.totalProducto?.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Info;
