import './Payment.scss';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {checkout, createOrder, deleteBasket} from '../../actions/orderActions';

export const Payment = (props) => {

    const orderData = props.orderData;
    const status = props.order.status;
    const checkout = props.checkout;
    const createOrder = props.createOrder;
    const deleteBasket = props.deleteBasket;
    const loggedOn = props.auth.loggedOn;

    const [loading, setLoading] = useState(false)

    const handleToken = (token) => {
        checkout(token, orderData)
    }

    useEffect(() => {
        if(status === "success"){
            createOrder(orderData);
            localStorage.removeItem("basket-expires");
            localStorage.removeItem("basket");
            deleteBasket();
        }
    },[status, createOrder, deleteBasket, orderData])

    if(status === "success" && loggedOn){
        return <Redirect to="/order" />
    } 
    if(status === "success" && !loggedOn){
        return <Redirect to="/order/guest" />
    }

    return (
        <div className="payment-container">
        <StripeCheckout stripeKey={process.env.NODE_ENV === "production" ? process.env.REACT_APP_STRIPE_PUB_KEY_LIVE : process.env.REACT_APP_STRIPE_PUB_KEY} token={handleToken} name="The Cake Dilemma" 
        amount={orderData.discount ? Math.round(orderData.total_with_discount * 100) : Math.round(orderData.total * 100)}  currency="GBP">
        <li><button className="checkout-btn2" onClick={() => setLoading(true)}>Checkout </button></li> 
        {loading ? <li><p className="loading_2" /></li> : "" }
        </StripeCheckout>
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.productReducers,
    order: state.orderReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {deleteBasket, checkout, createOrder})(Payment)
