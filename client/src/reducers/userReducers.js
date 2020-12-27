/* eslint-disable import/no-anonymous-default-export */
import {
    USER_DATA,
    USER_ADDRESS,
    LOGOUT,
} from '../actions/types'

const initialState = {
    user: null,
    loading: true,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){  
        case USER_DATA:
        case USER_ADDRESS:
            return {
                ...state,
                user: payload,
                loading: false
            }

        case LOGOUT: 
            return {
                initialState
        }

        default:
            return state;
        }
}