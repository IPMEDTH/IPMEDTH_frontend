import React, { Component } from 'react';
import './App.css';

import { Route, Router, Switch } from "react-router-dom";
import history from "./history";

//Pagina's
import IndexPage from "./pages/index/index";

const guestRoutes: Array<GuestRouteInterface> = [
  { path: "/", component: IndexPage, exact: true },
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
