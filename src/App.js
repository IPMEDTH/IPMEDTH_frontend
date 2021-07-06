import React, { Component } from 'react';

import { Route, Router, Switch } from "react-router-dom";
import history from "./history";

//Pagina's
import IndexPage from "./pages/index/index";
import Inventory from "./pages/inventory/Inventory";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import DeviceSelectionPage from "./pages/deviceselection/DeviceSelection";
import ReservationPage from "./pages/reservation/Reservation";
import MyReservationPage from "./pages/my_reservations/MyReservation";
import Account from './pages/account/Account';
import Editaccount from './pages/editaccount/Editaccount';
import ManageUsers from './pages/manageusers/ManageUsers';
import ManageLocations from './pages/managelocations/ManageLocations';
import ManageReservations from './pages/managereservations/ManageReservations';
import HelpersPage from './pages/helpers/Helpers';

const guestRoutes = [
  { path: "/", component: IndexPage, exact: true },
  { path: "/inventory", component: Inventory, exact: true },
  { path: "/deviceselection", component: DeviceSelectionPage, exact: true },
  { path: "/login", component: Login, exact: true },
  { path: "/register", component: Register, exact: true },
  { path: "/forgot-password", component: ForgotPassword, exact: true },
  { path: "/reset-password", component: ResetPassword, exact: true },
  { path: "/reservation", component: ReservationPage, exact: true },
  { path: "/my_reservations", component: MyReservationPage, exact: true },
  { path: "/account", component: Account, exact: true},
  { path: "/editaccount", component: Editaccount, exact: true},
  { path: "/manageusers", component: ManageUsers, exact: true},
  { path: "/managelocations", component: ManageLocations, exact: true},
  { path: "/managereservations", component: ManageReservations, exact: true},
  { path: "/personnel", component: HelpersPage, exact: true },
  {/*path: "/material-history", component: None, exact: true },*/},
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
