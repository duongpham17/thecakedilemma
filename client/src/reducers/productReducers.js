/* eslint-disable import/no-anonymous-default-export */
import {
    VARIETY_BOX,
    PRODUCTS,
    ONE_PRODUCT,
    CLEAR_ONE_PRODUCT
} from '../actions/types'

const initialState = {
    products: null,
    product: null,
    variety: null,
    loading: true,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case VARIETY_BOX:
            return {
                ...state,
                variety: payload
            }
        case PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false
            }
            
        case ONE_PRODUCT:
            return{
                ...state,
                product: payload,
                loading: false
            }
        case CLEAR_ONE_PRODUCT:
            return{
                ...state,
                product: null,
                loading: false
            }

        default:
            return state;
        }
}