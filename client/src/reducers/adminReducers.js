/* eslint-disable import/no-anonymous-default-export */
import {
    ADMIN_PRODUCT,
    EDIT_PRODUCT,
    CREATE_PRODUCT,
    ACTIVATE_PRODUCT,
    DELETE_PRODUCT,
    CLEAR_PRODUCT,

    GET_GIFT_CARDS,

    FIND_ORDER,
    FIND_STATS,

    VARIETY,
    ACTIVATE_VARIETY,
    CREATE_VARIETY,
    EDIT_VARIETY,
    DELETE_VARIETY,
} from '../actions/types'

const initialState = {
    variety: null,
    products: null,
    edit: null,
    loading: true,
    order: null,
    stats: null,
    gift: null,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case ADMIN_PRODUCT:
            return{
                ...state, 
                products: payload,
                loading: false
            }
        case CREATE_PRODUCT:
            return{
                ...state,
                products: [payload, ...state.products],
                loading: false
            }
        case ACTIVATE_PRODUCT:
            return{
                ...state,
                products: state.products.map(el => el._id === action.id ? {...el, active: action.boolean} : el),
                loading: false
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter(i => i._id !== action.id),
                loading: false
            }
        case EDIT_PRODUCT: 
            return{
                ...state, 
                edit: payload,
                products: state.products.map(el => el._id === action.id ? payload : el),
                loading: false
            }
        case CLEAR_PRODUCT:
            return{
                ...state,
                edit: null,
            }

        case GET_GIFT_CARDS:
            return{
                ...state,
                gift: payload
            }

        case FIND_ORDER: 
            return{
                ...state,
                order: payload,
                loading: false
            }
        case FIND_STATS:
            return{
                ...state,
                stats: payload,
            }

            
        case VARIETY:
            return {
                ...state,
                variety: payload,
                loading: false
            }
        case ACTIVATE_VARIETY:
            return{
                ...state,
                variety: state.variety.map(el => el._id === action.id ? {...el, active: action.boolean} : el),
            }
        case CREATE_VARIETY:
            return{
                ...state,
                variety: [payload, ...state.variety],
                loading: false
            }
        case EDIT_VARIETY:
            return{
                ...state,
                variety: state.variety.map(el => el._id === action.id ? payload : el),
                loading: false
            }
        case DELETE_VARIETY:
            return{
                ...state,
                variety: state.variety.filter(i => i._id !== action.id),
                loading: false
            }

            default:
                return state;
        }
}