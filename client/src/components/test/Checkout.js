import './Checkout.scss';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import OrderSummary from './OrderSummary';
import Address from './Address';
import {Redirect} from 'react-router-dom';
import {applyGiftCardBalance} from '../../actions/orderActions';

const Checkout = ({user:{user}, order:{basket, total, containCollect, gift_card_balance_checkout}, home:{data}, applyGiftCardBalance}) => {   

    let postageCost = !data ? 4.99 : data.delivery;

    //show checkout button once address and delivery method has been selected
    const [readyToPay, setReadyToPay] = useState(false);

    //allow deductions to be reset, to allow changes when user decided to change delivery methods
    const [deducation, setDeducation] = useState([])

    const [orderData, setOrderData] = useState({
        user: !user ? "guest" : user._id,

        email: "",
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        postcode: "",
    
        method: containCollect ? "Delivery" : "Collect",
        postage: total >= 50 ? 0 : postageCost,
        order: !basket ? "" : basket,
        date: new Date().toISOString().slice(0,10),

        original_total: total,
        discount: false,
        discount_value: 0,
        gift_card: false,
        gift_card_code: "",
        gift_card_value: 0,
        grand_total: Number(total + postageCost).toFixed(2),
        message: "",

        //saved values, used for resetting values
        savePost: total >= 50 ? 0 : postageCost,
        saved_grand_total: Number(total + postageCost).toFixed(2), 
    })

    console.log(orderData.method)

    //take back to basket, if consumer has to reload the basket
    if(!basket || total < data.minimumOrder){
        return <Redirect to="/test-basket" />
    }
    
    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <div className="checkout-content">
                <div className="area-address">
                    <Address 
                    orderData={orderData}  setOrderData={setOrderData}
                    setDeducation={setDeducation}
                    readyToPay={readyToPay}  setReadyToPay={setReadyToPay}
                    containCollect={containCollect}
                    />
                </div>
                <div className="area-ordersummary">
                    <OrderSummary 
                    orderData={orderData}   setOrderData={setOrderData}
                    deducation={deducation} setDeducation={setDeducation}
                    readyToPay={readyToPay} 
                    applyGiftCardBalance={applyGiftCardBalance} gift_card_balance_checkout={gift_card_balance_checkout} />
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    user: state.userReducers,
    order: state.orderReducers,
    home: state.homeReducers,
})

export default connect(mapStateToProps, {applyGiftCardBalance})(Checkout)
