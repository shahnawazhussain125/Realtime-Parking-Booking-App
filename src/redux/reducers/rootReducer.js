import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    adminReducer
});

export default rootReducer;