import './OrderSuccess.scss';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {deleteBasket, resetStatus} from '../../actions/orderActions';

const Guest = ({order:{status}, resetStatus}) => {
    //listen for if the payment has been successful

    useEffect(() => {
        if(status === "success"){
            resetStatus()
        }
    }, [status, resetStatus])

    return (
        <div className="guest-order-container">
            <h1>Thank you for your order. <br/><br/> Please check your email for order information.</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.orderReducers
})

export default connect(mapStateToProps, {resetStatus, deleteBasket})(Guest)
