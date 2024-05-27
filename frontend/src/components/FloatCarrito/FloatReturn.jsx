import React from "react";
import "./FloatCarrito.css";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function FloatReturn() {
  return (
    <div className="float-cart-container">
      <Link to="/">
        <Badge color="primary" variant="dot">
        <FontAwesomeIcon icon={faRotateLeft} className="float-cart-icon" />
        </Badge>
      </Link>
    </div>
  );
}

export default FloatReturn;
