import {
    UPDATE_DATA,
    VARIETY,
    CREATE_VARIETY,
    EDIT_VARIETY,
    ACTIVATE_VARIETY,
    DELETE_VARIETY,

    FIND_ORDER,
    FIND_STATS,

    ADMIN_PRODUCT,
    EDIT_PRODUCT,
    CREATE_PRODUCT,
    ACTIVATE_PRODUCT,
    DELETE_PRODUCT,
    CLEAR_PRODUCT,
} from './types';
import {setAlert} from './alertActions';
import Api from '../routing/Api';


/* Settings ***********************************************************************************/
export const updateData = (data, id) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.patch(`/admins/data/${id}`, data, config);
        dispatch({
            type: UPDATE_DATA,
            payload: res.data.data
        })
        dispatch(setAlert("updated", 'success'))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

/*Admin Products **********************************************************************************/

//get products
export const getAdminProducts = () => async dispatch => {
    try{
        const res = await Api.get(`/admins/products`);
        dispatch({
            type: ADMIN_PRODUCT,
            payload: res.data.product
        })
    } catch(err) {
        console.log(err.response)
    }
}

//create product
export const createProduct = (formData) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/admins/products`, formData, config);
        dispatch({
            type: CREATE_PRODUCT,
            payload: res.data.product
        })
        dispatch(setAlert("Product Created", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//activate product when ready for users to see
export const activateProduct = (id, boolean) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.patch(`/admins/products/${id}/${boolean}`, config);
        dispatch({
            type: ACTIVATE_PRODUCT,
            payload: res.data.product,
            id, 
            boolean
        })
        if(boolean === true){
             dispatch(setAlert("Product activated", "success"))
        } else {
            dispatch(setAlert("Product deactivated", "danger"))
        }
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//delete product
export const deleteProduct = (id) => async dispatch => {
    try{
        const res = await Api.delete(`/admins/products/${id}`);
        dispatch({
            type: DELETE_PRODUCT,
            payload: res.data.product,
            id
        })
        dispatch(setAlert("Product deleted", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//get one product to edit
export const getProductToEdit = (id) => async dispatch => {
    dispatch({
        type: CLEAR_PRODUCT
    })
    try{
        const res = await Api.get(`/admins/edit/${id}`);
        dispatch({
            type: EDIT_PRODUCT,
            payload: res.data.product,
            id
        })
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//update product information
export const updateProduct = (id, formData) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const res = await Api.patch(`/admins/edit/${id}`, formData, config);
        dispatch({
            type: EDIT_PRODUCT,
            payload: res.data.product,
            id
        })
        dispatch(setAlert("Product updated", 'success'))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}


//upload image to firebase database
export const uploadImage = (url, id) => async dispatch => {
    const config = { 
        headers:{
            "Content-Type" : "application/json"
        }
    }
    try{
        const body = {url}
        const res = await Api.put(`/admins/edit/images/${id}`, body, config);
        dispatch({
            type: EDIT_PRODUCT,
            payload: res.data.product,
            id
        })
        dispatch(setAlert("Image uploaded", 'success'))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, 'danger'))
    }
}

//delete image from firebase database
export const deleteImage = (image_id, id) => async dispatch => {
    try{
    const res = await Api.delete(`/admins/edit/images/${id}/${image_id}`);
    dispatch({
        type: EDIT_PRODUCT,
        payload: res.data.product,
        id
    })
        dispatch(setAlert("Image deleted", 'success'))
    }catch(err){
        dispatch(setAlert("Image already deleted", "primary"))
    }
}

/*Admin Controls **********************************************************************************/

//Find Order
export const findOrder = (id, type) => async dispatch => {
    try{
        const res = await Api.get(`/admins/find/${type}/${id}`);
        dispatch({
            type: FIND_ORDER,
            payload: res.data.order,
        })
    } catch(err) {
        dispatch(setAlert("Order ID does not exist", "danger"))
    }
}

export const findStats = () => async dispatch => {
    try{
        const res = await Api.get(`/admins/find/stats`);
        dispatch({
            type: FIND_STATS,
            payload: res.data.stats,
        })
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

/* Gift Cards **********************************************************************************/

//create gift cards
export const createGiftCard = (data) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        await Api.post(`/admins/gift`, {data}, config);
        dispatch(setAlert("Gift card was sent successfully.", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//delete expired gift cards
export const deleteExpiredGiftCards = () => async dispatch => {
    try{
        await Api.delete(`/admins/gift`);
        dispatch(setAlert("Gift cards deleted successfully.", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}








































/*VARIETIES**********************************************************************************/
//get all variety box
export const getVariety = () => async dispatch => {
    try{
        const res = await Api.get(`/admins/varieties`);
        dispatch({
            type: VARIETY,
            payload: res.data.variety
        })
    } catch(err) {
        dispatch(setAlert("Something went wrong", "danger"))
    }
}

//set variety to active
export const setVarietyToActive = (id, boolean) => async dispatch => {
    try{
        const res = await Api.patch(`/admins/varieties/active/${id}/${boolean}`);
        dispatch({
            type: ACTIVATE_VARIETY,
            payload: res.data.variety,
            id,
            boolean
        })
        if(boolean === true){
            dispatch(setAlert("Activated", "success"))
        } else {
            dispatch(setAlert("Deactivated", "danger"))
        }
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//create variety box
export const createVarietyBox = (formData) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.post(`/admins/varieties`, formData, config);
        dispatch({
            type: CREATE_VARIETY,
            payload: res.data.variety
        })
        dispatch(setAlert("Variety box created", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//add item to variety box
export const addItemToVarietyBox = (id, formData) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const res = await Api.put(`/admins/varieties/${id}`, formData, config);
        dispatch({
            type: EDIT_VARIETY,
            payload: res.data.variety,
            id,
        })
        dispatch(setAlert("Added item to box", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//update item inside variety box 
export const updateItemInVarietyBox = (id, name, price, array) => async dispatch => {
    try{
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }
        const body = {name:name, price:price, array: array}
        const res = await Api.patch(`/admins/varieties/${id}`, body, config);
        dispatch({
            type: EDIT_VARIETY,
            payload: res.data.variety,
            id
        })
        dispatch(setAlert("Saved Changes", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//delete item in variety box 
export const deleteItemInVarietyBox = (id, itemId) => async dispatch => {
    try{
        const res = await Api.delete(`/admins/varieties/${id}/${itemId}`);
        dispatch({
            type: EDIT_VARIETY,
            payload: res.data.variety,
            id
        })
        dispatch(setAlert("Item Deleted", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}

//delete variety box
export const deleteVarietyBox = (id) => async dispatch => {
    try{
        const res = await Api.delete(`/admins/varieties/${id}`);
        dispatch({
            type: DELETE_VARIETY,
            payload: res.data.variety,
            id
        })
        dispatch(setAlert("Variety box created", "success"))
    } catch(err) {
        dispatch(setAlert(err.response.data.message, "danger"))
    }
}