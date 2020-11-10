import logo from "./logo.svg";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Order from "./components/payment/Order";
import Success from "./components/payment/Success";
import Cancel from "./components/payment/Cancel";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/cancel" component={Cancel} />
            <PrivateRoute exact path="/order" component={Order} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
