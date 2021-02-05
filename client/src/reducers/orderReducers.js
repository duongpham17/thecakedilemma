/* eslint-disable import/no-anonymous-default-export */
import {
    CHECKOUT_STATUS,
    ORDERS,

    COMPLETE_ORDER,
    DELETE_ORDER,

    LOAD_BASKET,
    DELETE_BASKET,

    ZERO_CHECKOUT,
    APPLY_GIFT_CARD_BALANCE,

    CREATE_GIFT_CARD_SESSION,
    CHECK_GIFT_CARD_BALANCE,
} from '../actions/types'

const initialState = {
    basket: null,   
    containCollect: 0,
    total: 0,

    status: null,
    order: null,
    length: 0,

    gift_card_session:null,
    gift_session_id: null,
    gift_card_balance: 0,
    gift_card_balance_checkout: 0,
    loading: true
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case LOAD_BASKET:
            return{
                ...state,
                basket: payload,
                total: payload.length === 0 ? 0 : payload.map((el) => el.total).reduce((a, c) => a + c),
                containCollect: payload.length === 0 ? 0 : payload.map((el) => el.method).reduce((a, c) => a * c)
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
        case ORDERS:
            return{
                ...state,
                order: payload,
                length: action.length,
            }
        case COMPLETE_ORDER:
            return{
                ...state,
                order: state.order.map(el => el._id === action.id ? {...el, status: "Completed"} : el),
            }
        case DELETE_ORDER:
            return{
                ...state,
                order: state.order.filter(i => i._id !== action.id),
            }
        case ZERO_CHECKOUT:
            return{
                ...state,
                status: "message"
            }
        case CREATE_GIFT_CARD_SESSION:
            return{
                ...state,
                gift_card_session: payload
            }
        case CHECK_GIFT_CARD_BALANCE:
            return{
                ...state,
                gift_card_balance: payload
            }
        case APPLY_GIFT_CARD_BALANCE:
            return{
                ...state,
                gift_card_balance_checkout: payload
            }

        default:
            return state;
        }
}