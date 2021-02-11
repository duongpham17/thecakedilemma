import {
    LOAD_USER,
    SIGNUP,
    SIGNUP_CONFIRM,
    LOGIN,
    LOGOUT,
    DELETE_ACCOUNT,

    FORGOT_PASSWORD,
    RESET_PASSWORD
} from './types';
import {setAlert} from './alertActions';
import Api from '../routing/Api';

//get users information to persist login when refreshing browser
export const loadUser = () => async dispatch => {
    try{
        const res = await Api.get(`/users`);
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
        console.log('User Logged in. Welcome and Enjoy :D')
    } catch(err) {
        console.log('%c Login to get access :(', 'color: #4fd680')
    }
}

//signup
export const signup = (formData) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const res = await Api.post(`/users/signup`, formData, config);
        dispatch({
            type: SIGNUP,
            payload: res.data.user
        })
    } catch(err) {
        dispatch(setAlert(`${err.response.data.message}`, 'danger'))
    }
}

//signup confirm
export const signupConfirm = (formData) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const res = await Api.post(`/users/confirm`, formData, config);
        dispatch({
            type: SIGNUP_CONFIRM,
            payload: res.data.user
        })
        dispatch(setAlert('Thank you for joining The Cake Dilemma.', 'success'))
    } catch(err) {
        dispatch(setAlert(`${err.response.data.message}`, 'danger'))
    }
}

//login with username or email
export const login = (formData, choice) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const res = await Api.post(`/users/login`, formData, config);
        dispatch({
            type: LOGIN,
            payload: res.data.user
        })
        dispatch(setAlert('Welcome to TheCakeDilemma', 'success'))
    } catch(err) {
        console.log(err.response)
        dispatch(setAlert(err.response.data.message || err.response.data, 'danger'))
    }
}

//logout
export const logout = () => async dispatch => {
    try {
        await Api.get(`/users/logout`)
        dispatch({
            type: LOGOUT
        })
        dispatch(setAlert('Logged Out ', 'success'))
    } catch (err) {
        dispatch(setAlert('Something went wrong... Try again', 'danger'))
    }
}

//delete account
export const deleteAccount = () => async dispatch => {
    try {
        await Api.delete(`/users/account`)
        dispatch({
            type: DELETE_ACCOUNT
        })
        dispatch(setAlert('Account Deleted', 'success'))
    } catch (err) {
        dispatch(setAlert('Something went wrong... Try again', 'danger'))
    }
}

//Send forgotten password
export const forgottenPassword = (email) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {email};
        await Api.post(`/users/forgotpassword`, body, config)
        dispatch({
            type: FORGOT_PASSWORD
        })
        dispatch(setAlert(`Email Sent. Check your Junk aswell.`, 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.message || err.response.data, 'danger'))
    }
}

//reset url
export const resetPassword = (id, password) => async dispatch => {
    try{
        const config = { 
            headers:{
                "Content-Type" : "application/json"
            }
        };
        const body = {password};
        const res = await Api.patch(`/users/resetpassword/${id}`, body, config)
        dispatch({
            type: RESET_PASSWORD,
            payload: res.data.user
        })
        dispatch(setAlert(`Password Updated`, 'success'))
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}
