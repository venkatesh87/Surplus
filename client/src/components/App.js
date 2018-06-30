import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./Navigation";
import LandingPage from "../pages/Landing";
import SignupPage from "../pages/Signup";
import SigninPage from "../pages/Signin";
import SignoutPage from "../pages/Signout";
import ForgotPasswordPage from "../pages/ForgotPW";
import HomePage from "../pages/Home";
import AccountPage from "../pages/Profile";
import Footer from "./Footer";

// import Market from "../pages/Market";
import ShoppingCart from "../pages/ShoppingCart";
import NoMatch from '../pages/404';
import './App.css';

import * as routes from '../constants/routes';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      cartId: 1,
    }
  };

  render() {
    return (
      <Router>
        <div>
          <Navigation isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route
              exact path={routes.LANDING}
              component={() => <LandingPage />}
            />
            <Route
              exact path={routes.HOME}
              component={() => <HomePage />}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={() => <AccountPage />}
            />
            <Route
              exact path={routes.CHECKOUT}
              component={() => <ShoppingCart />}
            />
            <Route
              exact path={routes.SIGN_IN}
              component={() => <SigninPage />}
            />
            <Route
              exact path={routes.SIGN_UP}
              component={() => <SignupPage />}
            />
            <Route
              exact path={routes.SIGN_OUT}
              component={() => <SignoutPage />}
            />
            <Route
              exact path={routes.PASSWORD_FORGET}
              component={() => <ForgotPasswordPage />}
            />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  };
};

export default App;
