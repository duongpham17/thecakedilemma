import {
    PRODUCTS,
    VARIETY_BOX,
    ONE_PRODUCT,
    CLEAR_ONE_PRODUCT,
    REVIEW,
    CREATE_REVIEW,
    DELETE_REVIEW,
    PRODUCT_RATING,
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
        const res = await Api.get(`/products/one/${title}`);
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

//update product quanatity
export const getReviews = (id, user, page, limit) => async dispatch => {
    try{
        const res = await Api.get(`/products/reviews/${id}/${user}?page=${page}&limit=${limit}`);
        dispatch({
            type: REVIEW,
            payload: res.data.review,
            res
        })
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}


//update product quanatity
export const createReview = (data) => async dispatch => {
    try{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/products/reviews`, data, config);
        dispatch({
            type: CREATE_REVIEW,
            payload: res.data.review
        })
        dispatch(setAlert("Thank you for the review.", "success"))
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}

//update product quanatity
export const deleteReview = (id) => async dispatch => {
    try{
        const res = await Api.delete(`/products/reviews/${id}`);
        dispatch({
            type: DELETE_REVIEW,
            payload: res.data.review,
            id
        })
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}

//update product best
export const bestSeller = (id, best) => async dispatch => {
    try{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.patch(`/products/best/${id}/${best}`, {}, config);
        dispatch({
            type: PRODUCT_RATING,
            payload: res.data.review,
            id,
            best,
        })
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}
