import {
    CHECKOUT_STATUS,
    RESET_STATUS,
    ORDERS,
    COMPLETE,
    LOAD_BASKET,
    DELETE_BASKET,
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
        dispatch(setAlert("Something went wrong. Please try again.", "danger"))
    }
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
        dispatch(setAlert("Something went wrong. Please try again.", "danger"))
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

//get orders
export const completeOrder = (id, type) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.patch(`/orders/complete/${id}/${type}`, {}, config);
        dispatch({
            type: COMPLETE,
            payload: res.data.order,
            id
        })
        dispatch(setAlert("Order Completed", "success"))
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//reset checkout success to null after checking out
export const resetBuyStatus = () => async dispatch => {
    dispatch({
        type: RESET_STATUS
    })
}
