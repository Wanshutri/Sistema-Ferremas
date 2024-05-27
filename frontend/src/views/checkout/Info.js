import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function Info({ products, totalPrice }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((producto) => (
          <ListItem key={producto.idProducto} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={producto.nombreProducto}
              secondary={producto.descripcion}
            />
            <Typography variant="body1" fontWeight="medium">
              {producto.precio?.toLocaleString("es-CL", {
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

Info.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
