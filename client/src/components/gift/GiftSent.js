import React, {Fragment} from 'react';
import {connect} from 'react-redux';

const GiftSent = ({order:{loading}, }) => {
    
    return (
        <Fragment>
            {loading ? <div className="loading"/> :<div className="_center_"> <h1>Thank you. Please check your email for the gift card receipt</h1></div>} 
        </Fragment>
    )
}
const mapStateToProps = state => ({
    order: state.orderReducers
})

export default connect(mapStateToProps, {})(GiftSent)
