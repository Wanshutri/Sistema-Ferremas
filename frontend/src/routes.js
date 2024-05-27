import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Detalle from "./pages/Detalle";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/productos" component={Productos} />
    <Route path="/detalle" component={Detalle} />
  </Switch>
);

export default Routes;
