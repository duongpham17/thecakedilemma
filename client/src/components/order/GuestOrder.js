import './GuestOrder.scss';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {resetBuyStatus} from '../../actions/orderActions';

const Guest = ({resetBuyStatus, order:{status}}) => {

    useEffect(() => {
        if(status === "success"){
            resetBuyStatus()
        }
    }, [status, resetBuyStatus])

    return (
        <div className="guest-order-container">
            <h1>Thank you for your order. <br/><br/> Please check your email for order information.</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.orderReducers
})

export default connect(mapStateToProps, {resetBuyStatus})(Guest)
