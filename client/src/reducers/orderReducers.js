/* eslint-disable import/no-anonymous-default-export */
import {
    CHECKOUT_STATUS,
    ORDERS,
    RESET_STATUS,
    COMPLETE,
    LOAD_BASKET,
    DELETE_BASKET,
} from '../actions/types'

const initialState = {
    basket: null,
    total: 0,

    status: null,
    order: null,
    length: 0,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case LOAD_BASKET:
            return{
                ...state,
                basket: payload,
                total: payload.length === 0 ? 0 : payload.map((el) => el.total).reduce((a, c) => a + c),
            }
        case DELETE_BASKET:
            return{
                ...state,
                basket: null,
                total: 0
            }
        case CHECKOUT_STATUS:
            return{
                ...state,
                status: action.status,
            }
        case RESET_STATUS:
            return{
                ...state,
                status: null,
            }
        case ORDERS:
            return{
                ...state,
                order: payload,
                length: action.length,
            }
        case COMPLETE:
            return{
                ...state,
                order: state.order.map(el => el._id === action.id ? {...el, status: "Completed"} : el),
            }
        default:
            return state;
        }
}