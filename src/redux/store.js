import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import api from './middleware/api'

import reducer from './reducer';

const enhancer = applyMiddleware(
    thunk,
    api,
)

export default createStore(reducer, composeWithDevTools(enhancer));
