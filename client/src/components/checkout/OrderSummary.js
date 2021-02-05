import './OrderSummary.scss';
import React, {Fragment, useState, useEffect} from 'react';
import {MdDone} from 'react-icons/md';

import Payment from './Payment';

const OrderSummary = props => {
    const [deducation, setDeducation] = [props.deducation, props.setDeducation]
    const [orderData, setOrderData] = [props.orderData, props.setOrderData]
    const [readyToPay] = [props.readyToPay]
    const [applyGiftCardBalance, gift_card_balance_checkout] = [props.applyGiftCardBalance, props.gift_card_balance_checkout]

    //calculate promo code
    const code = process.env.NODE_ENV === "production" ? process.env.REACT_APP_DISCOUNT_CODE : "dev";
    const [checkDiscountCode, setCheckDiscountCode] = useState("")
    const applyDiscount = (e) => {
        e.preventDefault()

        //let users put in disocunt code, if a discount code is correct then this code no longer works
        if(!deducation.includes("discount_code_applied")){
            setDeducation([...deducation, "discount_code_no_exist"])
        }

        //then this code will run once
        if(checkDiscountCode === code && !deducation.includes("discount_code_applied")){
            setOrderData({
                ...orderData, 
                discount: true, 
                discount_value: orderData.grand_total === 0 ? 0 : orderData.original_total * 0.2, 
                grand_total: orderData.grand_total - (orderData.original_total * 0.2) < 0 ? 0 : orderData.grand_total - (orderData.original_total * 0.2) })
            setDeducation([...deducation, "discount_code_applied"])
        }
    }

    //for form input field
    const [checkGiftCode, setCheckGiftCode] = useState("");
    //instantly search for the gift card code and return its value
    useEffect(() => {
        if(checkGiftCode.length === 16){
            applyGiftCardBalance(checkGiftCode)
        }
    }, [applyGiftCardBalance, checkGiftCode])

    const applyGiftCard = (e) => {
        e.preventDefault()
        // let the customer find their gift card code.
        if(!deducation.includes("gift_card_exist")){
            if(gift_card_balance_checkout === -1 || !gift_card_balance_checkout){
                setDeducation([...deducation, "gift_card_no_exist"])
            } else {
                setDeducation([...deducation, "gift_card_exist"])
            }
        }
        //once gift card is found we can set it.
        if(deducation.includes("gift_card_exist")) {
            if(!deducation.includes("gift_card_applied")){
                setOrderData({
                    ...orderData, 
                    gift_card: true, 
                    gift_card_code: checkGiftCode, 
                    gift_card_value: gift_card_balance_checkout > orderData.grand_total ? orderData.grand_total :gift_card_balance_checkout,
                    grand_total: gift_card_balance_checkout > orderData.grand_total ? 0 : orderData.grand_total - gift_card_balance_checkout,
                });
                setDeducation([...deducation, "gift_card_applied"])
            } 
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
            <p className="item-total">Item Total: £{orderData.original_total.toFixed(2)}</p>
            <p>Delivery cost: £{orderData.postage}</p>

            {readyToPay ? 
            <form className="applying-codes" onSubmit={(e) => applyDiscount(e)}>
                <input type="text" placeholder="Promo code" onChange={(e) => setCheckDiscountCode(e.target.value)} maxLength="20" />
                <button>{deducation.includes("discount_code_applied") ? <MdDone className="icon"/> : "apply"}</button>
                {
                    deducation.includes("discount_code_applied") ? <p className="code-yes">Discount applied. Saved £{orderData.discount_value.toFixed(2)}</p> : 
                    deducation.includes("discount_code_no_exist") ? <p className="code-no">Discount code does not exist</p> : "" 
                }
            </form>
            : ""}

            {readyToPay ? 
            <form className="applying-codes" onSubmit={(e) => applyGiftCard(e, true)}>
                <input placeholder="Gift Card Code" onChange={(e) => setCheckGiftCode(e.target.value)} minLength="16" required/>
                <button>{deducation.includes("gift_card_applied") ? <MdDone className="icon"/>  : deducation.includes("gift_card_exist") ? "apply" : "find"}</button>
                {   
                    deducation.includes("gift_card_applied") ? <p className="code-yes">Gift Card Balance £{gift_card_balance_checkout === -1 ? 0 : gift_card_balance_checkout} <br/> Balance after checkout £{ gift_card_balance_checkout - orderData.gift_card_value } </p> :
                    deducation.includes("gift_card_exist") ? <p className="code-yes">Gift Card Balance £{gift_card_balance_checkout === -1 ? 0 : gift_card_balance_checkout} <br/>  Spending £{Number(orderData.grand_total).toFixed(2)}</p> :
                    deducation.includes("gift_card_no_exist") ? <p className="code-no">Code does not exist or has expired</p> : ""
                }
            </form>
            : "" }

            <p className="grand-total">Grand Total: 
                £{Number(orderData.grand_total).toFixed(2)}
            </p>
            
            <Payment orderData={orderData} readyToPay={readyToPay} />
        </div>

        <div className="order-message-container">
        <h2>Message For Seller</h2>
        <textarea type="text" maxLength="500" placeholder="Add any special request here and we will try our best." onChange={(e) => setOrderData({...orderData, message: e.target.value}) }/>
            
        </div>
        </Fragment>
    )
}

export default OrderSummary