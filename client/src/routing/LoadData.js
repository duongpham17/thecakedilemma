import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUserData} from '../actions/userActions';
import {getData} from '../actions/homeActions';
import {loadBasket, deleteBasket} from '../actions/orderActions';

const LoadUserData = ({auth:{loggedOn}, user:{user}, home:{data}, getData, loadUserData, loadBasket, deleteBasket}) => {

    useEffect(() => {
        if(loggedOn && !user){
            loadUserData()
        }
        if(!data){
            getData()
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
    auth: state.authReducers,
    home: state.homeReducers
})

export default connect(mapStateToProp, {getData, loadUserData, deleteBasket, loadBasket})(LoadUserData)
