import { combineReducers } from 'redux';
import loginReducer from './login-reducers';

export default combineReducers({
    usuario: loginReducer
});