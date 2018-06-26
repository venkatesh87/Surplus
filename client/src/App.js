import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Market from "./pages/Market";
import Cart from "./pages/Cart";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Wrapper>
        <Route exact path="/" component={Market} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/Cart" component={Cart} />
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
