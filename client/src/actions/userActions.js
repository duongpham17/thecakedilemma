import {
    USER_DATA,
    USER_ADDRESS,
} from './types';
import {setAlert} from './alertActions';
import Api from '../routing/Api';

//load user data on opening
export const loadUserData = () => async dispatch => {
    try{
        const res = await Api.get(`/users/data`);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
    } catch(err) {
        console.log('%c Failed to load user data', 'color: red')
    }
}

//update user information
export const updateUserInfo = (email, user, password, passwordCurrent) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {email, user, password, passwordCurrent}
        const res = await Api.patch(`/users/account`, body, config);
        dispatch({
            type: USER_DATA,
            payload: res.data.user
        })
        dispatch(setAlert('New information saved.', 'success'))
    } catch(err) {
        if(err.response.data.error.code === 11000){
            dispatch(setAlert(`${err.response.data.error.keyValue.user || err.response.data.error.keyValue.email} - has been taken` , 'danger'))
        } else {
            dispatch(setAlert(err.response.data.message, 'danger'))
        }
    }
}

//add address for quicker checkout
export const addAddress = (formData) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const res = await Api.put(`/users/address`, formData, config);
        dispatch({
            type: USER_ADDRESS,
            payload: res.data.user
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please try again.", "danger"))
    }
}

//remove address 
export const removeAddress = (id) => async dispatch => {
    try{
        const res = await Api.delete(`/users/address/${id}`);
        dispatch({
            type: USER_ADDRESS,
            payload: res.data.user
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong. Please try again.", "danger"))
    }
}

//add address for quicker checkout
export const contactMe = (formData) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        await Api.post(`/users/contact`, formData, config);
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert("Something went wrong. Please try again.", "danger"))
    }
}