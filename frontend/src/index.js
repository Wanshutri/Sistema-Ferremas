import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/home/home';
import Error404 from './views/error404/error404';
import Contactanos from './views/contactanos/contactanos1';
import Login from './views/login/login';
import Registro from './views/registro/registro';
import RecuperarContraseña from './views/recuperarContraseña/recuperarContraseña';
import Sobrenosotros from './views/sobrenosotros/sobrenosotros';
import Ayuda from './views/ayuda/ayuda';
import Admindex from './views/administrador/admindex';
import Ficha from './views/ficha/ficha';
import Checkout from './views/checkout/Checkout';
import Vendindex from './views/vendedor/vendindex';
import Bodeindex from './views/bodeguero/bodeindex';
import Containdex from './views/contador/containdex';
import Carro from './views/carro/carro';
import { AuthProvider } from './js/AuthContext'; // Importa el AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="test" element={<h1>PAGINA DE TEST</h1>} />
          <Route path="*" element={<Error404 />} />
          <Route path="contactanos" element={<Contactanos />} />
          <Route path="sobrenosotros" element={<Sobrenosotros />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="recuperarContraseña" element={<RecuperarContraseña />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="admin" element={<Admindex />} />
          <Route path="carro" element={<Carro />} />
          <Route path="ficha" element={<Ficha />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="vendindex" element={<Vendindex />} />
          <Route path="bodeindex" element={<Bodeindex />} />
          <Route path="contindex" element={<Containdex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider> 
);

reportWebVitals();