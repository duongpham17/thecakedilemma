import './Address.scss';
import React, {Fragment, useState} from 'react';
import SaveAddress from './SaveAddress';
import {GoCheck} from 'react-icons/go';
import {IoIosArrowForward} from 'react-icons/io';

const Address = (props) => {
    const [setDeducation] = [props.setDeducation]
    const [orderData, setOrderData] = [props.orderData, props.setOrderData]
    const [setReadyToPay, containCollect] = [props.setReadyToPay, props.containCollect]

    const [addressDone, setAddressDone] = useState(false)
    const [method, setMethod] = useState(containCollect === 0 ? "collect" : "delivery")

    const onChange = (e) => {
        setOrderData({...orderData, [e.target.name] : e.target.value})
    }

    const checkAddress = () => {
        setReadyToPay(false)
        setAddressDone(false)
    }

    //Must reset deductions when delivery method is changed, because delivery and collect have different set postage cost
    const orderMethod = (e, m) => {
        e.preventDefault()
        setDeducation([]);
        setOrderData({
            ...orderData,
            grand_total: orderData.saved_grand_total, 
            discount: false, discount_value: 0,
            gift_card: false, gift_card_code: "", gift_card_value: 0, 
        })
        setMethod(m === "delivery" ? "delivery" : "collect");
        setAddressDone(false);
        setReadyToPay(false);
    }

    const onSubmit = (e, m) => {
        if(m === "collect"){
            setOrderData({...orderData, grand_total: orderData.grand_total - orderData.savePost, postage: 0 })
        } else {
            setOrderData({...orderData, grand_total: !orderData.postage ? orderData.grand_total + orderData.savePost : orderData.grand_total, postage: orderData.savePost})
        }
        e.preventDefault()
        setAddressDone(true)
        setReadyToPay(true)
    }

    return (
        <div className="address-container">

            <div className="delivery-method-container">
                <h2>Delivery Method</h2>
                {containCollect === 1 ?  <button className={method === "delivery" ? "method" : ""} onClick={(e) =>  orderMethod(e, "delivery") }>Delivery</button> : "" }
                <button className={method === "collect" ? "method" : ""}  onClick={(e) =>  orderMethod(e, "collect") }>Collect</button>
            </div>

            {method === "collect" ? 
            <div className="collection-container">
                <h2>Collection Address</h2>
                <p>Adress: 121 high road</p>
                <p>Second Address: Infinity Nails</p>
                <p>City: Beeston</p>
                <p>Postcode: NG9 2HU</p>

                <div className="collect-content">
                <h2>For Order Confirmation</h2>
                {addressDone ? <button className="check-address-btn" onClick={() => checkAddress()}>Check Email <GoCheck className="icon"/></button> :
                <form onSubmit={e => onSubmit(e, "collect")}>
                    <p>First Name</p>
                    <input type="text"  name="first_name" defaultValue={orderData.first_name}  onChange={e => onChange(e)} required minLength="2"/>
                    <p>Last Name</p>
                    <input type="text"  name="last_name" defaultValue={orderData.last_name}  onChange={e => onChange(e)} required minLength="2"/>
                    <p>Email * for order receipt *</p>
                    <input type="email"  name="email" defaultValue={orderData.email}  onChange={e => onChange(e)} required minLength="2"/>
                    <br/>
                    <button>Next <IoIosArrowForward className="icon_move"/></button>
                </form>
                }
                </div>
            </div>
            : "" }

            {method === "delivery" ? 
            <Fragment>
                <SaveAddress setOrderData={setOrderData} orderData={orderData} addressDone={addressDone} />
            
                <div className="shipping-container">
                    <h2>Shipping Address</h2>
                    {addressDone ? <button className="check-address-btn" onClick={() => checkAddress()}>Check Address <GoCheck className="icon"/></button> :
                    <form onSubmit={e => onSubmit(e, "delivery")}>
                        <p>First Name</p>
                        <input type="text"   name="first_name" defaultValue={orderData.first_name}  onChange={e => onChange(e)} required minLength="2"/>
                        <p>Last Name</p>
                        <input type="text"   name="last_name" defaultValue={orderData.last_name}  onChange={e => onChange(e)} required minLength="2"/>
                        <p>Email * for order receipt *</p>
                        <input type="email"  name="email" defaultValue={orderData.email}  onChange={e => onChange(e)} required minLength="2"/>
                        <p>Address 1</p>
                        <input type="text"   name="address_1" defaultValue={orderData.address_1} onChange={e => onChange(e)} required minLength="2"/>
                        <p>Address 2 (optional)</p>
                        <input type="text"   name="address_2" defaultValue={orderData.address_2} onChange={e => onChange(e)} />
                        <p>City</p>
                        <input type="text"   name="city" defaultValue={orderData.city} onChange={e => onChange(e)} required minLength="2"/>
                        <p>Postcode</p>
                        <input type="text"   name="postcode" defaultValue={orderData.postcode}  onChange={e => onChange(e)} required minLength="3"/>
                        <br/>
                        <button>Next <IoIosArrowForward className="icon_move"/></button>
                    </form>
                    }
                </div>
            </Fragment>
            :  "" }

        </div>
    )
}


export default Address
