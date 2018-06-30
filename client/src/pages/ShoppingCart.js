import React, { Component } from 'react';
import { Row, Col } from 'react-materialize'
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import PaypalExpressBtn from 'react-paypal-express-checkout'

class ShoppingCart extends Component {
		state = {

        }


  render() { 
    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
                console.log("The payment was succeeded!", payment);
                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }		
    
    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }	
    
    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
    }			
    const client = {
        sandbox:    '6dxgn4sk6b86kj32',
        production: '6dxgn4sk6b86kj32',
    }	
    return ( 
          
        <Row>
            <Col s={8}>
                <Cart />
            </Col>
            <Col s={4}>
                <Checkout />
                <PaypalExpressBtn client={client} currency={'USD'} total={1.00} env={'sandbox'} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
            </Col>
        </Row>
    );
  }
}

export default ShoppingCart;
