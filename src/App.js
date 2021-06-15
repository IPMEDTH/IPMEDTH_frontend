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
import ReservationPage from "./pages/reservation/Reservation";

const guestRoutes = [
  { path: "/", component: IndexPage, exact: true },
  { path: "/inventory", component: Inventory, exact: true },
  { path: "/deviceselection", component: DeviceSelectionPage, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/register", component: Register, exact: true },
  { path: "/reservation", component: ReservationPage, exact: true },
  {/* path: "/personnel", component: None, exact: true },
  { path: "/usr-reservations", component: None, exact: true },
  { path: "/material-history", component: None, exact: true },*/},
];

console.log("w3 validated?");

class App extends Component {
  render() {
    return (
      <>
      {/*<meta name="xsrf-token" content="{{ xsrf_token() }}" />*/}

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
      </>
    );
  }
}

export default App;
