import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sobrenosotros from './views/sobrenosotros/sobrenosotros';
import Ayuda from './views/ayuda/ayuda'

import Home from './views/home/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home></Home>} /> {/*Podemos importar paginas y componentes para cada ruta pertinente*/}
        <Route path="test" element={<h1>PAGINA DE TEST</h1>} />
        <Route path="sobrenosotros" element={<Sobrenosotros></Sobrenosotros>} />
        <Route path="ayuda" element={<Ayuda></Ayuda>} />
        <Route path="*" element={<h1>Pagina no encontrada</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

