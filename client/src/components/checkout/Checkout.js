import './Checkout.scss';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import OrderSummary from './OrderSummary';
import Address from './Address';

const Checkout = ({user:{user}, order:{basket, total}}) => {
    
    const [readyToPay, setReadyToPay] = useState(false);
    const [code, setCode] = useState("")
    const [check, setCheck] = useState("")

    const [orderData, setOrderData] = useState({
        user: !user ? "guest" : user._id,

        email: "",
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        postcode: "",
    
        method: "",
        postage: total >= 50 ? 0 : process.env.NODE_ENV === "production" ? parseFloat(process.env.REACT_APP_DELIVERY_COST) :  5,
        order: !basket ? "" : basket,
        date: new Date().toISOString().slice(0,10),

        saved_postage: process.env.NODE_ENV === "production" ? parseFloat(process.env.REACT_APP_DELIVERY_COST) :  5,
        saved_total_with_postage: total >= 50 ? total : total + (process.env.NODE_ENV === "production" ? parseFloat(process.env.REACT_APP_DELIVERY_COST) :  5),

            
        total_before_postage: total,
        total: total >= 50 ? total : total + (process.env.NODE_ENV === "production" ? parseFloat(process.env.REACT_APP_DELIVERY_COST) :  5),
        total_with_discount: 0,
        discount_value: 0,
        discount: false,

        message: "",
    })

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <div className="checkout-content">
                <div className="area-address">
                    <Address setReadyToPay={setReadyToPay} readyToPay={readyToPay} setOrderData={setOrderData} orderData={orderData} setCheck={setCheck} />
                </div>
                <div className="area-ordersummary">
                    <OrderSummary setOrderData={setOrderData} orderData={orderData} readyToPay={readyToPay} setCheck={setCheck} check={check} setCode={setCode} code={code} />
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers,
    order: state.orderReducers
})

export default connect(mapStateToProps, {})(Checkout)
