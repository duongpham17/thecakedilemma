import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUserData} from '../actions/userActions';
import {loadBasket, deleteBasket} from '../actions/orderActions';

const LoadUserData = ({auth:{loggedOn}, user:{user}, loadUserData, loadBasket, deleteBasket}) => {

    useEffect(() => {
        if(loggedOn && !user){
            loadUserData()
        }
    })

    useEffect(() => {
        if(localStorage.getItem("basket")){
            loadBasket(JSON.parse(localStorage.getItem("basket")))
        }
    }, [loadBasket])

    useEffect(() => {
        if(localStorage.getItem("basket-expires") <= Date.now()){
            localStorage.removeItem("basket-expires")
            localStorage.removeItem("basket")
            deleteBasket()
        }
    }, [deleteBasket])

    return <></>
}

const mapStateToProp = state => ({
    user: state.userReducers,
    auth: state.authReducers
})

export default connect(mapStateToProp, {loadUserData, deleteBasket, loadBasket})(LoadUserData)
