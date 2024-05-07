import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/home/home';
import Error404 from './views/error404/error404';
import Contactanos from './views/contactanos/contactanos1';
import Productos from './views/productos/productos';

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
        <Route path="productos" element={<Productos></Productos>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();