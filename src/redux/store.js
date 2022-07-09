import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import api from './middleware/api'

import appReducer from './reducer';

const enhancer = applyMiddleware(
    thunk,
    api,
)

export default createStore(appReducer, composeWithDevTools(enhancer));
