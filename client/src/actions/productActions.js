import {
    PRODUCTS,
    VARIETY_BOX,
    ONE_PRODUCT,
    CLEAR_ONE_PRODUCT,
} from './types';
import Api from '../routing/Api';
import {setAlert} from './alertActions';

//get all variety box
export const getVarietyBox = () => async dispatch => {
    try{
        const res = await Api.get(`/products/varieties`);
        dispatch({
            type: VARIETY_BOX,
            payload: res.data.variety
        })
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}

//get product set to active
export const getProducts = (sort, limit, type) => async dispatch => {
    try{
        const res = await Api.get(`/products?sort=${sort}&limit=${limit}&type=${type}`);
        dispatch({
            type: PRODUCTS,
            payload: res.data.product
        })
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}

//get product set to active
export const getProduct = (title) => async dispatch => {
    dispatch({
        type: CLEAR_ONE_PRODUCT
    })
    try{
        const res = await Api.get(`/products/${title}`);
        dispatch({
            type: ONE_PRODUCT,
            payload: res.data.product
        })
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}

//update product quanatity
export const updateQuantity = (id, quantity, sign) => async dispatch => {
    try{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        const body = {quantity}
        const res = await Api.patch(`/products/basket/${id}/${sign}`, body, config);
        dispatch({
            type: ONE_PRODUCT,
            payload: res.data.product
        })
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}
