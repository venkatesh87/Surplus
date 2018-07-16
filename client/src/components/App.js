import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./Navigation";
import LandingPage from "./pages/Landing";
import SignupPage from "./pages/AppSignUp";
import SigninPage from "./pages/AppSignIn";
import ForgotPasswordPage from "./pages/ForgotPW";
import ChangePasswordPage from "./pages/PasswordChange";
import HomePage from "./pages/Home";
import AccountPage from "./pages/Profile";
import Footer from "./Footer";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import SearchResults from "./pages/Results";
import AboutUs from './pages/About';
import AllProductsPage from "./pages/AllProducts";
import Product from "./pages/Product";
import NoMatch from './pages/404';
import './App.css';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import API from "../utils/API";
import moment from "moment";

function remove(array, index) {
	return array.filter((e,i) => i !== index);
}

class App extends React.Component {
  constructor(props){
    super(props);
		this.state = (JSON.parse(localStorage.getItem('sessionData'))
		? { ...JSON.parse(localStorage.getItem('sessionData')) }
		: { sessionId: '', shoppingCart: [], });

    this.onAddToCart = this.onAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  };

  onAddToCart = (product) => {
    this.setState((prevState) => ({
      shoppingCart: [...prevState.shoppingCart, product]
    }));

		API.getSessionID()
			.then(res => {
				localStorage.setItem('sessionData',JSON.stringify({
          sessionId: res.data,
          shoppingCart: this.state.shoppingCart,
        }));
			})
			.catch(err => console.log(err));
  }

  handleRemoveFromCart = (index) => {
		const newCart = remove(this.state.shoppingCart, index);
		this.setState({shoppingCart: newCart});

		API.getSessionID()
      .then(res => {
        localStorage.setItem('sessionData',JSON.stringify({
          sessionId: res.data,
          shoppingCart: newCart,
        }));
      })
      .catch(err => console.log(err));
	}

  render() {
		const currentTime = moment();
    return(
      <Router>
        <div>
          <Navigation cartSize={this.state.shoppingCart.length} />
          <Switch>
            <Route exact path={routes.LANDING} component={() => <LandingPage
              onAddToCart={this.onAddToCart}/>} />
            <Route exact path={routes.HOME} component={() => <HomePage
              onAddToCart={this.onAddToCart}/>} />
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
            <Route exact path={routes.CART} component={() => <ShoppingCart
              handleRemoveFromCart={this.handleRemoveFromCart}
              shoppingCart={this.state.shoppingCart} stage="cart"/>}/>
						<Route exact path={routes.CHECKOUT} component={() => <Checkout
							shoppingCart={this.state.shoppingCart} stage="checkout"/>} />
            <Route exact path={routes.SIGN_IN} component={() => <SigninPage />}/>
            <Route exact path={routes.SIGN_UP} component={() => <SignupPage />}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() =>
							<ForgotPasswordPage />}/>
            <Route exact path={routes.PASSWORD_CHANGE} component={() =>
							<ChangePasswordPage />}/>
            <Route exact path={routes.SEARCH} component={() =>
							<SearchResults key={currentTime}/>}/>
						<Route exact path={routes.ABOUT} component={() => <AboutUs />}/>
						<Route exact path={routes.PRODUCTS} component={() =>
							<AllProductsPage handleAddToCart={this.handleAddToCart}/>} />
						<Route exact path={routes.PRODUCT} component={(props) =>
							<Product productId={props.match.params.id} />} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
};

export default withAuthentication(App);
