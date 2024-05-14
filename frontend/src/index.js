import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/home/home';
import Error404 from './views/error404/error404';
import Contactanos from './views/contactanos/contactanos1';
import Login from './views/login/login'
import Registro from './views/registro/registro';
import RecuperarContraseña from './views/recuperarContraseña/recuperarContraseña';
import Sobrenosotros from './views/sobrenosotros/sobrenosotros';
import Ayuda from './views/ayuda/ayuda'
import Admindex from './views/administrador/admindex'
import Ficha from './views/ficha/ficha';
import Checkout from './views/checkout/Checkout';
import Vendindex from './views/vendedor/vendindex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home></Home>} /> {/*Podemos importar paginas y componentes para cada ruta pertinente*/}
        <Route path="test" element={<h1>PAGINA DE TEST</h1>} />
        <Route path="*" element={<Error404></Error404>} />
        <Route path="*" element={<h1>Pagina no encontrada</h1>} />
        <Route path="contactanos" element={<Contactanos></Contactanos>} />
        <Route path="sobrenosotros" element={<Sobrenosotros></Sobrenosotros>} />
        <Route path="login" element={<Login></Login>} />
        <Route path="registro" element={<Registro></Registro>} />
        <Route path="recuperarContraseña" element={<RecuperarContraseña></RecuperarContraseña>} />
        <Route path="ayuda" element={<Ayuda></Ayuda>} />
        <Route path="admin" element={<Admindex></Admindex>} />
        <Route path="ficha" element={<Ficha></Ficha>} />
        <Route path="checkout" element={<Checkout></Checkout>} />
        <Route path="vendindex" element={<Vendindex></Vendindex>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();