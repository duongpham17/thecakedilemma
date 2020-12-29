/* eslint-disable import/no-anonymous-default-export */
import {
    GET_FEED,
    DELETE_FEED,
    CREATE_FEED,

    BEST_PRODUCTS,

    GET_IMAGE,
    CREATE_IMAGE,
    DELETE_IMAGE,
} from '../actions/types'

const initialState = {
    feed: null,
    gallery: null,
    best: null,
}

export default function(state = initialState, action){
    const {type, payload} = action;
    
    switch(type){
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

            default:
                return state;
        }
}