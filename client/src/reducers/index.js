import {combineReducers} from 'redux';
import alertReducers from './alertReducers';
import authReducers from './authReducers';
import userReducers from './userReducers';
import adminReducers from './adminReducers';
import productReducers from './productReducers';
import orderReducers from './orderReducers';
import homeReducers from './homeReducers';

export default combineReducers({
    alertReducers,
    authReducers,
    userReducers,
    adminReducers,
    productReducers,
    orderReducers,
    homeReducers,
});
