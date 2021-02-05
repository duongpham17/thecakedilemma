import './Payment.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {createOrder, createZeroGrandTotalOrder, deleteBasket} from '../../actions/orderActions';
import {setAlert} from '../../actions/alertActions';

import {loadStripe} from '@stripe/stripe-js'
//const stripePromise = loadStripe(process.env.NODE_ENV === "production" ? process.env.REACT_APP_STRIPE_PUB_KEY_LIVE : process.env.REACT_APP_STRIPE_PUB_KEY)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY)

export const Payment = (props) => {
    const [readyToPay, orderData, loggedOn] = [props.readyToPay, props.orderData, props.loggedOn];
    const [createOrder, createZeroGrandTotalOrder, status, deleteBasket] = [props.createOrder, props.createZeroGrandTotalOrder, props.order.status, props.deleteBasket];

    //start the session for checking out with stripe
    const handleClick = async (event) => {
        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: "",
        });
    
        if (result.error) {
            setAlert("Something went wrong. Please reload.", "danger")
        }
    };

    const [zeroCheckout, setZeroCheckout] = useState("ok")
    
    useEffect(() => {
        if(zeroCheckout === "success"){
            createZeroGrandTotalOrder(orderData);
            localStorage.removeItem("basket-expires");
            localStorage.removeItem("basket");
            deleteBasket();
        }
    },[zeroCheckout, createZeroGrandTotalOrder, deleteBasket, orderData])

    //checkout out if the grand total is zero
    const zeroGrandTotalCheckout = (e) => {
        e.preventDefault()
        setZeroCheckout("awaiting");
        setTimeout(() => {setZeroCheckout("success")}, 3000)
    }
    if(zeroCheckout === "success" && loggedOn){
        return <Redirect to="/order" />
    } 
    if(zeroCheckout === "success" && !loggedOn){
        return <Redirect to="/order/guest" />
    }

    return (
        <div className="payment-container">
            {readyToPay && orderData.grand_total === 0 
            ?   
            <Fragment>
                {zeroCheckout === "awaiting" ? 
                <div> 
                    <div className="loading_payment"/> 
                    <p>Please do not refresh. </p>
                </div>
                : 
                    <button onClick={(e) => zeroGrandTotalCheckout(e)}>Checkout</button>
                }
            </Fragment>
            : 
                <button type="button" className="checkout-btn" role="link" onClick={handleClick}>Checkout</button>
            }       
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.productReducers,
    order: state.orderReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {deleteBasket, createOrder, createZeroGrandTotalOrder})(Payment)
