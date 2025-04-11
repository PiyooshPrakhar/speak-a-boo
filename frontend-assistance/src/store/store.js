import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
//import logger from 'redux-logger'
//import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, applyMiddleware(thunk));
//export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));