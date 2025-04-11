import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { dialogReducer } from './dialogReducer';
import { chatReducer } from './chatReducer';
import { pageReducer } from './pageReducer';

export default combineReducers({
    userProfile: authReducer,
    dialog: dialogReducer,
    userChat: chatReducer,
    page: pageReducer
});
