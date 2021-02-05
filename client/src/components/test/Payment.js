import './Payment.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {createZeroGrandTotalOrder, deleteBasket, createOrderCheckoutSession} from '../../actions/orderActions';
import {setAlert} from '../../actions/alertActions';

import {loadStripe} from '@stripe/stripe-js'
//const stripePromise = loadStripe(process.env.NODE_ENV === "production" ? process.env.REACT_APP_STRIPE_PUB_KEY_LIVE : process.env.REACT_APP_STRIPE_PUB_KEY)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY)

export const Payment = (props) => {
    const [readyToPay, orderData] = [props.readyToPay, props.orderData];
    const [createZeroGrandTotalOrder, deleteBasket, createOrderCheckoutSession, orderSessionId ] = [props.createZeroGrandTotalOrder, props.deleteBasket, props.createOrderCheckoutSession, props.order.order_checkout_session ];
    
    //start the session for checking out with stripe
    const handleClick = async (event) => {
        createOrderCheckoutSession(orderData)

        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: orderSessionId?.id,
        });
    
        if (result.error) {
            setAlert("Something went wrong. Please reload.", "danger")
        }
    };

    //let users checkout if their grand total = 0
    const [zeroCheckout, setZeroCheckout] = useState("")
    //create the order and delete the basket
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
    if(zeroCheckout === "success"){
        return <Redirect to="/order-success" />
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
    order: state.orderReducers
})

export default connect(mapStateToProps, {deleteBasket, createZeroGrandTotalOrder, createOrderCheckoutSession})(Payment)


/*
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
*/