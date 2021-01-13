import './OrderSummary.scss';
import React, {Fragment} from 'react';

import Payment from './Payment';

const OrderSummary = props => {
    const readyToPay = props.readyToPay;
    const setOrderData = props.setOrderData;
    const orderData = props.orderData;
    const setCheck = props.setCheck;
    const check = props.check;
    const setCode = props.setCode;
    const code = props.code;

    const applyDiscount = (e) => {
        e.preventDefault()
        if(code === (process.env.NODE_ENV === "production" ? process.env.REACT_APP_DISCOUNT_CODE : "dev") ){
            setCheck("correct")
            setOrderData({...orderData, total_with_discount: ((orderData.total_before_postage * 0.8) + orderData.postage).toFixed(2), discount_value: (orderData.total_before_postage * 0.2).toFixed(2), discount: true })
        } else {
            setCheck("incorrect")
        }
    }

    return (
        <Fragment>
        <div className="order-summary-container">
            <h2>Order Summary</h2>
            {!orderData.order ? "" : orderData.order.map((el) => 
                <p key={el.unique}>- {el.title} &nbsp; {el.size} {el.flavour} 
                <br/> &nbsp;&nbsp; Qty {el.quantity} &nbsp;&nbsp; £{el.price} &nbsp;&nbsp; £{(el.price * el.quantity).toFixed(2)}</p>
            )}
            <p className="item-total">Item Total: £{orderData.total_before_postage.toFixed(2)}</p>
            <p>Delivery cost: £{orderData.postage.toFixed(2)}</p>

            {readyToPay ? 
            <Fragment>
                <input type="text" placeholder="Promo code" onChange={(e) => setCode(e.target.value)} maxLength="20" />
                <button onClick={(e) => applyDiscount(e)}>apply discount</button><br/>
            </Fragment>
            : ""}

            {check === "correct" ? <p>20% Discount applied. <br/>You saved £{Number(orderData.discount_value).toFixed(2)}</p> : check === "incorrect" ? <p className="promo-no">Promo code does not exist</p> : "" }
            <p>Grand Total: £{orderData.discount ? Number(orderData.total_with_discount).toFixed(2) : Number(orderData.total).toFixed(2)}</p>

            {readyToPay ? 
                <Payment orderData={orderData} />
            : ""}
        </div>

        <div className="order-message-container">
        <h2>Message For Seller</h2>
        <textarea type="text" maxLength="500" placeholder="Add any special request here and we will try our best." onChange={(e) => setOrderData({...orderData, message: e.target.value}) }/>
            
        </div>
        </Fragment>
    )
}

export default OrderSummary

