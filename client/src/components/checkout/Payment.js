import React, {useEffect} from 'react';
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
    const loggedOn = props.auth.loggedOn

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
        <StripeCheckout stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY} token={handleToken} name="The Cake Dilemma" 
        amount={orderData.discount ? orderData.total_with_discount * 100 : orderData.total * 100}  currency="GBP">
        <button className="checkout-btn2">Checkout</button>
        </StripeCheckout>
    )
}

const mapStateToProps = (state) => ({
    product: state.productReducers,
    order: state.orderReducers,
    auth: state.authReducers
})

export default connect(mapStateToProps, {deleteBasket, checkout, createOrder})(Payment)
