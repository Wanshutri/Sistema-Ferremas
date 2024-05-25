import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./FloatCarrito.css";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
function FloatCarrito() {
  return (
    <div className="float-cart-container">
      <Link to="/carro">
        <Badge color="primary" variant="dot">
          <ShoppingCartIcon className="float-cart-icon" />
        </Badge>
      </Link>
    </div>
  );
}

export default FloatCarrito;
