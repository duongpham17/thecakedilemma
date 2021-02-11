import {
    LOAD_BASKET,
    DELETE_BASKET,
    
    CREATE_ORDER_CHECKOUT_SESSION,

    CHECKOUT_STATUS,
    RESET_STATUS,
    ORDERS,

    COMPLETE_ORDER,
    DELETE_ORDER,

    APPLY_GIFT_CARD_BALANCE,
    CREATE_GIFT_CARD_SESSION,
    CHECK_GIFT_CARD_BALANCE,
} from './types';
import Api from '../routing/Api';
import {setAlert} from './alertActions';

//load items from basket
export const loadBasket = (basket) => async dispatch => {
    dispatch({
        type: LOAD_BASKET,
        payload: basket,
    })
}

//delete all items from basket
export const deleteBasket = () => async dispatch => {
    dispatch({
        type: DELETE_BASKET,
    })
}

//checkout and pay
export const checkout = (token, orderData) => async dispatch => {
    try{
        const config = {
            headers:{
                "Content-Type" : "application/json",
            }
        }
        const res = await Api.post(`/orders/checkout`, {token, orderData}, config);
        dispatch({
            type: CHECKOUT_STATUS,
            status: res.data.status
        })
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert("Payment was declined. Please try another card.", "danger"))
    }
}

//delete all items from basket
export const resetStatus = () => async dispatch => {
    dispatch({
        type: RESET_STATUS,
    })
}


//create receipt
export const createOrder = (data) => async dispatch => {
    try{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        await Api.post(`/orders`, data, config);
    } catch(err) {
        console.log(err.response)
    }
}


//get orders for admin
export const getAdminOrders = (page, limit) => async dispatch => {
    try{
        const res = await Api.get(`/orders/admin?page=${page}&limit=${limit}`);
        dispatch({
            type: ORDERS,
            payload: res.data.order,
            length: res.data.length
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//get orders for user
export const getOrders = (page, limit) => async dispatch => {
    try{
    const res = await Api.get(`/orders?page=${page}&limit=${limit}`);
        dispatch({
            type: ORDERS,
            payload: res.data.order,
            length: res.data.length
        })
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//complete orders 
export const completeOrder = (id, type) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.patch(`/orders/complete/${id}/${type}`, {}, config);
        dispatch({
            type: COMPLETE_ORDER,
            payload: res.data.order,
            id
        })
        dispatch(setAlert("Order Completed", "success"))
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//delete orders 
export const deleteOrder = (id) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        await Api.patch(`/orders/delete/${id}`, {}, config);
        dispatch({
            type: DELETE_ORDER,
            id
        })
        dispatch(setAlert("Order deleted", "success"))
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}


//create zero grand total checkout order
export const createZeroGrandTotalOrder = (data) => async dispatch => {
    try{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        await Api.post(`/orders/zero-checkout`, data, config);
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

export const createOrderCheckoutSession = (orderData) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/orders/checkout-session`, {orderData}, config);
        dispatch({
            type: CREATE_ORDER_CHECKOUT_SESSION,
            payload: res.data.session,
        })
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//create gift card session
export const createGiftCardSession = (data) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/orders/gift-card-session`, {data}, config);
        dispatch({
            type: CREATE_GIFT_CARD_SESSION,
            payload: res.data.session,
        })
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//check gift card balance
export const checkGiftCardBalance = (id) => async dispatch => {
    try{
        const res = await Api.get(`/orders/gift-card-balance/${id}`);
        dispatch({
            type: CHECK_GIFT_CARD_BALANCE,
            payload: res.data.gift,
        })
    } catch(err){
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//check gift card balance
export const applyGiftCardBalance = (id) => async dispatch => {
    try{
        const res = await Api.get(`/orders/gift-card-checkout/${id}`);
        dispatch({
            type: APPLY_GIFT_CARD_BALANCE,
            payload: res.data.gift,
        })
    } catch(err){
        dispatch(setAlert("Something went wrong please reload", "danger"))
    }
}
