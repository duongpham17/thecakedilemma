/* eslint-disable import/no-anonymous-default-export */
import {
    GET_FEED,
    DELETE_FEED,
    CREATE_FEED
} from '../actions/types'

const initialState = {
    feed: null,
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

            default:
                return state;
        }
}