import './Payment.scss';
import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {createZeroGrandTotalOrder, deleteBasket, createOrderCheckoutSession, checkout, createOrder} from '../../actions/orderActions';

import StripeCheckout from 'react-stripe-checkout';
const StripeKey = process.env.NODE_ENV === "production" ? process.env.REACT_APP_STRIPE_PUB_KEY_LIVE : process.env.REACT_APP_STRIPE_PUB_KEY;

export const Payment = (props) => {
    const [readyToPay, orderData] = [props.readyToPay, props.orderData];
    const [checkout, createOrder, status] = [props.checkout, props.createOrder, props.order.status]
    const [createZeroGrandTotalOrder, deleteBasket] = [props.createZeroGrandTotalOrder, props.deleteBasket];

    //let users checkout if their grand total = 0
    const [zeroCheckout, setZeroCheckout] = useState("")

    //let users checkout with stripe wallet
    const handleToken = (token) => {
        checkout(token, orderData)
    }

    const [loading, setLoading] = useState(false)

    //create the order once stripe is done processing
    useEffect(() => {
        if(status === "success"){
            createOrder(orderData);
            localStorage.removeItem("basket-expires");
            localStorage.removeItem("basket");
            deleteBasket();
        }
    },[status, createOrder, deleteBasket, orderData])

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
        setZeroCheckout("success");
        setZeroCheckout("awaiting");
        setTimeout(() => {setZeroCheckout("success")}, 5000)
    }

    if(zeroCheckout === "success" || status === "success"){
        return <Redirect to="/order-success" />
    } 

    return (
        <div className="payment-container">
            {readyToPay && orderData.grand_total <= 0.30 
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
            <Fragment>
            {readyToPay ? 
            <StripeCheckout 
            stripeKey={StripeKey} 
            token={handleToken} name="The Cake Dilemma" 
            amount={+(Math.round(orderData.grand_total * 100)).toFixed(2)}
            currency="GBP">
            <li><button className="checkout-btn2" onClick={() => setLoading(true)}>Checkout</button></li> 
            {loading ? <li><p className="loading-stripe-legacy" /></li> : "" }
            </StripeCheckout>
            : "" }
            </Fragment>
            }       
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.productReducers,
    order: state.orderReducers
})

export default connect(mapStateToProps, {deleteBasket, createZeroGrandTotalOrder, createOrderCheckoutSession, checkout, createOrder})(Payment)


