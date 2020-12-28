import {
    GET_FEED,
    CREATE_FEED,
    DELETE_FEED,

} from './types';
import Api from '../routing/Api';
import {setAlert} from './alertActions';

export const getFeed = () => async dispatch => {
    try{
        const res = await Api.get(`/home`);
        dispatch({
            type: GET_FEED,
            payload: res.data.home
        })
        console.log(res.data)
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}

export const createFeed = (data) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/home`, data, config);
        dispatch({
            type: CREATE_FEED,
            payload: res.data.home
        })
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}

export const deleteFeed = (id) => async dispatch => {
    try{
        await Api.delete(`/home/${id}`);
        dispatch({
            type: DELETE_FEED,
            id
        })
    } catch(err) {
        dispatch(setAlert("something went wrong. Please refresh", "danger"))
    }
}