/* eslint-disable import/no-anonymous-default-export */
import {
    VARIETY_BOX,
    PRODUCTS,
    ONE_PRODUCT,
    CLEAR_ONE_PRODUCT,
    REVIEW,
    DELETE_REVIEW,
    CREATE_REVIEW
} from '../actions/types'

const initialState = {
    products: null,
    product: null,
    variety: null,
    loading: true,

    review: null,
    reviewed: false,
    reviewLength: 0,
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
        
        case REVIEW:
            return{
                ...state,
                review: payload,
                loading: false,
                reviewed: action.res.data.reviewed,
                reviewLength: action.res.data.reviewLength

            }
        case CREATE_REVIEW:
            return{
                ...state,
                review: [payload, ...state.review],
                loading: false,
                reviewed: true
            }
        case DELETE_REVIEW:
            return{
                ...state,
                review: state.review.filter(i => i._id !== action.id),
                loading: false
            }

        default:
            return state;
        }
}