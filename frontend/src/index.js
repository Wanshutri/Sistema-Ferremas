import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home/home";
import Error404 from "./views/error404/error404";
import Contactanos from "./views/contactanos/contactanos1";
import Login from "./views/login/login";
import Registro from "./views/registro/registro";
import RecuperarContraseña from "./views/recuperarContraseña/recuperarContraseña";
import Sobrenosotros from "./views/sobrenosotros/sobrenosotros";
import Ayuda from "./views/ayuda/ayuda";
import Admindex from "./views/administrador/admindex";
import Ficha from "./views/ficha/ficha";
import Checkout from "./views/checkout/Checkout";
import Vendindex from "./views/vendedor/vendindex";
import Bodeindex from "./views/bodeguero/bodeindex";
import Containdex from "./views/contador/containdex";
import Carro from "./views/carro/carro";
import { AuthProvider } from "./js/AuthContext"; // Importa el AuthProvider
import PaginaProducto from "./views/PaginaProducto/PaginaProducto";
import DetalleProducto from "./views/detalleProducto/detalleproducto";
import Perfil from "./views/perfil/perfil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home></Home>} />
          <Route path="contactanos" element={<Contactanos></Contactanos>} />
          <Route path="sobrenosotros" element={<Sobrenosotros></Sobrenosotros>}/>
          <Route path="login" element={<Login></Login>} />
          <Route path="registro" element={<Registro></Registro>} />
          <Route path="recuperarcontraseña" element={<RecuperarContraseña></RecuperarContraseña>}/>
          <Route path="ayuda" element={<Ayuda></Ayuda>} />
          <Route path="admin" element={<Admindex></Admindex>} />
          <Route path="carro" element={<Carro></Carro>} />
          <Route path="ficha" element={<Ficha></Ficha>} />
          <Route path="checkout" element={<Checkout></Checkout>} />
          <Route path="vendindex" element={<Vendindex></Vendindex>} />
          <Route path="bodeindex" element={<Bodeindex></Bodeindex>} />
          <Route path="contindex" element={<Containdex></Containdex>} />
          <Route path="detalleproducto" element={<DetalleProducto></DetalleProducto>}/>
          <Route path="perfil" element={<Perfil></Perfil>} />
          <Route path="paginaproducto" element={<PaginaProducto></PaginaProducto>} />
          <Route path="*" element={<Error404></Error404>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

reportWebVitals();
