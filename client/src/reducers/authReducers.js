/* eslint-disable import/no-anonymous-default-export */
import {
    LOAD_USER,
    SIGNUP,
    SIGNUP_CONFIRM,
    LOGIN,
    LOGOUT,
    DELETE_ACCOUNT,

    FORGOT_PASSWORD,
    RESET_PASSWORD
} from '../actions/types'

const initialState = {
    user: null,
    loggedOn: false,
    loading: true,
    sent: false,
    confirm: null,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case SIGNUP:
            return {
                ...state,
                confirm: payload
            }
            
        case SIGNUP_CONFIRM: 
        case LOAD_USER:
        case LOGIN:
        case RESET_PASSWORD:
            return {
                ...state,
                user: payload,
                loggedOn: true,
                loading: false
            }
        
        case FORGOT_PASSWORD:
            return{
                ...state,
                sent: true,
            }

        case LOGOUT: 
        case DELETE_ACCOUNT:
            return {
                initialState
        }

            default:
                return state;
        }
}