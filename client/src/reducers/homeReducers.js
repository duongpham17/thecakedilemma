/* eslint-disable import/no-anonymous-default-export */
import {
    GET_DATA,
    UPDATE_DATA,

    GET_FEED,
    DELETE_FEED,
    CREATE_FEED,

    BEST_PRODUCTS,

    GET_IMAGE,
    CREATE_IMAGE,
    DELETE_IMAGE,

    GET_FAQ,
    CREATE_FAQ, 
    DELETE_FAQ
} from '../actions/types'

const initialState = {
    data: null,
    feed: null,
    gallery: null,
    best: null,
    question: null,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case GET_DATA:
        case UPDATE_DATA:
            return{
                ...state,
                data: payload
            }
        case GET_FEED:
            return {
                ...state,
                feed: payload,
            }
        case CREATE_FEED:
            return {
                ...state,
                feed: [payload, ...state.feed],
            }
        case DELETE_FEED:
            return {
                ...state,
                feed: state.feed.filter(i => i._id !== action.id),
            }

        case BEST_PRODUCTS:
            return {
                ...state,
                best: payload
            }
        
        case GET_IMAGE:
            return {
                ...state,
                gallery: payload,
            }
        case CREATE_IMAGE:
            return{
                ...state, 
                gallery: [payload, ...state.gallery],
            }
        case DELETE_IMAGE:
            return{
                ...state, 
                gallery: state.gallery.filter(i => i._id !== action.id),
            }

        case GET_FAQ:
            return {
                ...state,
                question: payload,
            }
        case CREATE_FAQ:
            return{
                ...state, 
                question: [payload, ...state.question],
            }
        case DELETE_FAQ:
            return{
                ...state, 
                question: state.question.filter(i => i._id !== action.id),
            }
        

            default:
                return state;
        }
}