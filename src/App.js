import React, { Component } from 'react';
import './App.css';

import { Route, Router, Switch } from "react-router-dom";
import history from "./history";

//Pagina's
import IndexPage from "./pages/index/index";
import Inventory from "./pages/inventory/Inventory";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DeviceSelectionPage from "./pages/deviceselection/DeviceSelection";

const guestRoutes: Array<GuestRouteInterface> = [
  { path: "/", component: IndexPage, exact: true },
  { path: "/inventory", component: Inventory, exact: true },
  { path: "/deviceselection", component: DeviceSelectionPage, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/register", component: Register, exact: true },
  {/*}{ path: "/reservation", component: None, exact: true },
  { path: "/personnel", component: None, exact: true },
  { path: "/usr-reservations", component: None, exact: true },
  { path: "/material-history", component: None, exact: true },*/},
];

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {guestRoutes.map((route, key) => {
            return (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={key}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
