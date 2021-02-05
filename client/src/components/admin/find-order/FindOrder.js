import './FindOrder.scss';
import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {date} from '../../../functions/functions';
import {findOrder} from '../../../actions/adminActions';
import {BsSearch} from 'react-icons/bs';

export const FindOrder = ({admin:{order, loading}, findOrder}) => {

    const [id, setId] = useState("")

    const findById = (e) => {
        e.preventDefault()
        if(id.includes("@")) return findOrder(id, "email")
        findOrder(id, "id") 
    } 

    return (
        <div className="find-order-container">

            <div className="find-bar">
                <input type="text" placeholder="Order ID or Email" onChange={(e) => setId(e.target.value)}/>
                <br/>
                <button onClick={(e) => findById(e)}><BsSearch/></button>
            </div>

            {!order ? "" :
                <Fragment>
                    {loading ? <div className="loading" /> : 
                    <div className="order-content">
                        <p>Date: {date(order.createdAt)}</p>
                        <p>Email: {order.email}</p>
                        <p>Full Name: {order.first_name} {order.last_name}</p>
                        <br/>
                        <p>Method: {order.method}</p>
                        <p>Address_1: {order.address_1}</p>
                        <p>Address_2: {order.address_2}</p>
                        <p>City: {order.city}</p>
                        <p>Postcode: {order.postcode}</p>
                        <br/>
                        {order.order.map((el, index) => 
                            <div key={index}>
                                <p>- {el.title} - Qty {el.quantity} - Price £{el.price} - total £{el.total}</p>
                            </div>
                        )}
                        <br/>
                        <pre>
                        <p>Total:&nbsp;               £{order.original_total}</p>
                        <p>Postage:&nbsp;         £{order.postage}</p>
                        <p>Discount:&nbsp;       £{order.discount_value}</p>
                        <p>Gift Card:&nbsp;       £{order.gift_card_value || 0}</p>
                        <p>Grand Total:&nbsp; £{order.grand_total}</p>
                        </pre>
                    </div>
                    }
                </Fragment>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    admin: state.adminReducers
})

export default connect(mapStateToProps, {findOrder})(FindOrder)
