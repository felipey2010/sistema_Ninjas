import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Crud from "./pages/Crud";
import Mapa from "./pages/Mapa";
export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/crud" component={Crud} />
          <Route path="/mapa" component={Mapa} />
        </Switch>
      </div>
    </Router>
  );
}
