import React from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import "./breadcrumbs.css";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const routeNameMap = {
  "/": "Home",
  "/material-ui/getting-started/installation/": "Productos",
  "/detalleproducto": "Detalle del Producto",
  "/contactanos": "Contáctanos",
  "/sobrenosotros": "Sobre Nosotros",
  "/login": "Iniciar Sesión",
  "/registro": "Registro",
  "/recuperarContraseña": "Recuperar Contraseña",
  "/ayuda": "Ayuda",
  "/admin": "Administrador",
  "/carro": "Carro",
  "/ficha": "Ficha",
  "/checkout": "Checkout",
  "/vendindex": "Vendedor",
  "/bodeindex": "Bodeguero",
  "/contindex": "Contador",
  "/perfil": "Perfil",
};

export default function BasicBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div role="presentation" onClick={handleClick} className="breadcrubsdiv">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return isLast ? (
            <Typography color="text.primary" key={to}>
              {routeNameMap[to] || "Detalle"}
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" href={to} key={to}>
              {routeNameMap[to] || value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
