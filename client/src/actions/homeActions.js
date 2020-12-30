import {
    GET_FEED,
    CREATE_FEED,
    DELETE_FEED,

    BEST_PRODUCTS,

    GET_IMAGE,
    CREATE_IMAGE,
    DELETE_IMAGE,

    GET_FAQ,
    CREATE_FAQ,
    DELETE_FAQ
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

//delete gallery
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

//get best products
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

//get FAQs
export const getQuestions = () => async dispatch => {
    try{
        const res = await Api.get('/home/questions');
        dispatch({
            type: GET_FAQ,
            payload: res.data.question
        })
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//Create FAQs
export const createQuestion = (data) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post('/home/questions', data, config);
        dispatch({
            type: CREATE_FAQ,
            payload: res.data.question,
        })
    } catch(err){
        dispatch(setAlert("Something went wrong. Please refresh.", "danger"))
    }
}

//delete FAQs
export const deleteQuestion = (id) => async dispatch => {
    try{
    const res = await Api.delete(`/home/questions/${id}`);
    dispatch({
        type: DELETE_FAQ,
        payload: res.data.question,
        id
    })
    }catch(err){
        dispatch(setAlert("Image already deleted", "primary"))
    }
}