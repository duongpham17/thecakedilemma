import './Order.scss';
import React, { Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {copy, date} from '../../functions/functions';

import {AiOutlineCopy} from 'react-icons/ai';
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri';
import {GoPrimitiveDot} from 'react-icons/go';

import { getOrders, getAdminOrders, completeOrder, deleteOrder} from '../../actions/orderActions';

import Complete from './Complete';
import Delete from './Delete';
import Pagination from './Pagination';

const Order = ({order:{status, order, length}, auth:{user}, completeOrder, deleteOrder,  getOrders, getAdminOrders}) => {
    const [open, setOpen] = useState("")

    const limit = 100
    const [page, setPage] = useState(1)
    const array = !order || order.length === 0 ? "" : order.map(el => el?.grand_total )
    const Total = !array || order.length === 0 ? "" : array.reduce((a, c) => a + c)

    useEffect(() => {
        if(!user ? "" : user.role === "admin") {
            getAdminOrders(page, limit)
        } else {
            getOrders(page, limit)
        }
    }, [getOrders, getAdminOrders, user, page, limit])

    return (
        <div className="order-container">
            {status === "message" ?  <h2>Thank you for your order. Please check your email for order conformation.</h2> : ""}

            {!order ? "Empty" :
            <Fragment>

                {user.role === "admin" ?
                    <Delete deleteOrder={deleteOrder}/>
                : "" }
                
                <div className="header-content">
                    <li></li>
                    <li>Order ID</li>
                    <li>Date</li>
                    <li>Total</li>
                    <li>Status</li>
                </div>

                {order.map((el, index) => 
                <Fragment key={el._id}>
                    <div className="detail-content">
                        <li><button onClick={() => setOpen(open === index ? "" : index)}>{open === index ? <RiArrowUpSLine/> : <RiArrowDownSLine/>}</button></li>
                        <li><button onClick={() => {copy(el._id)}}><AiOutlineCopy className="icon"/> {el._id.slice(16, 100)}</button></li>
                        <li>{date(el.createdAt)}</li>
                        <li>£{el.grand_total}</li>
                        {user.role === "admin" ?
                            <Complete completeOrder={completeOrder} el={el} />
                        : 
                            <li><GoPrimitiveDot className={`icon ${el.status === "Processing" ? "processing-icon" : "completed-icon" }`}/> {el.status}</li>
                        }
                    </div>

                    {open === index ? 
                    <div className="more-content">
                        {el.order.map((e, i) => 
                            <div key={e.id+i} className="content">
                                <li className="title">- {e.title}</li>
                                <li className="quantity">Qty: {e.quantity}</li>
                                <li className="price">Price: £{Number(e.price).toFixed(2)}</li><br/>
                                <li>&nbsp;&nbsp;&nbsp;{e.size} {e.flavour}</li>
                            </div>
                        )}
                        
                        <div className="valuation">
                        <p>Total <span className="total">£{el.original_total.toFixed(2)}</span></p>
                        <p>Postage <span className="postage">£{Number(el.postage).toFixed(2)}</span></p>
                        <p>Discount <span className="discount">{el.discount ? `£${el.discount_value.toFixed(2)}` : "£0.00"}</span> </p>
                        <p>Gift Card <span className="discount">{el.gift_card ? `£${el.gift_card_value.toFixed(2)}` : "£0.00"}</span> </p>
                        <p>Grand Total <span className="final-total">£{Number(el.grand_total).toFixed(2)}</span></p>
                        </div> 

                        <div className="valuation">
                        <p>Method: <span>{el.method}</span></p>
                        <p>Full name: <span>{el.first_name} {el.last_name}</span></p>
                        <p>Email: <span>{el.email}</span></p>
                        {el.method === "Collect" ? "" : <p>Address: <span>{el.address_1}, {el.address_2}, {el.city}, {el.postcode}</span></p> }
                        </div>
                        
                        {!el.message ? "" : 
                            <div className="message">
                                <p>Message: {el.message}</p>
                            </div>
                        }
                    </div>
                    : "" }
                </Fragment>
                )}

                {user.role === "admin" ?
                <div className="total-content">
                    <p>Total: £{Number(Total).toFixed(2)}</p>
                </div>
                : "" }

                <Pagination length={length} limit={limit} orderLength={order.length} setPage={setPage} page={page} getOrders={getOrders} getAdminOrders={getAdminOrders} user={user} />
            </Fragment>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.authReducers,
    order: state.orderReducers,
})
const mapDispatchToProps = {
     
    getOrders, 
    getAdminOrders, 
    completeOrder, 
    deleteOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)

