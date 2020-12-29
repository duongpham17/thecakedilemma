import {
    GET_FEED,
    CREATE_FEED,
    DELETE_FEED,

    BEST_PRODUCTS,

    GET_IMAGE,
    CREATE_IMAGE,
    DELETE_IMAGE,
} from './types';
import Api from '../routing/Api';
import {setAlert} from './alertActions';

//get feed
export const getFeed = () => async dispatch => {
    try{
        const res = await Api.get(`/home`);
        dispatch({
            type: GET_FEED,
            payload: res.data.home
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please refresh", "danger"))
    }
}

//create feed
export const createFeed = (data) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/home`, data, config);
        dispatch({
            type: CREATE_FEED,
            payload: res.data.home
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please refresh", "danger"))
    }
}

//delete feed
export const deleteFeed = (id) => async dispatch => {
    try{
        await Api.delete(`/home/${id}`);
        dispatch({
            type: DELETE_FEED,
            id
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please refresh", "danger"))
    }
}

//get Images
export const getImages = () => async dispatch => {
    try{
        const res = await Api.get(`/home/images`);
        dispatch({
            type: GET_IMAGE,
            payload: res.data.image,
        })
    } catch(err) {
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}

//upload image to firebase database
export const uploadImage = (url) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/home/images`, url, config);
        dispatch({
            type: CREATE_IMAGE,
            payload: res.data.image,
        })
        dispatch(setAlert("Uploaded Image", 'success'))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}

//delete image from firebase database
export const deleteImage = (id) => async dispatch => {
    try{
    const res = await Api.delete(`/home/images/${id}`);
    dispatch({
        type: DELETE_IMAGE,
        payload: res.data.image,
        id
    })
    }catch(err){
        dispatch(setAlert("Image already deleted", "primary"))
    }
}

export const getBestProducts = () => async dispatch => {
    try{
        const res = await Api.get('/home/best');
        dispatch({
            type: BEST_PRODUCTS,
            payload: res.data.product
        })
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}