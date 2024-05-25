import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./FloatCarrito.css";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

function FloatCarrito() {
  return (
    <div className="float-cart-container">
      <Badge color="primary" variant="dot">
        <ShoppingCartIcon className="float-cart-icon" />
      </Badge>
    </div>
  );
}

export default FloatCarrito;
