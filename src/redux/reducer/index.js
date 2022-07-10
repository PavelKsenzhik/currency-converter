import { combineReducers } from 'redux';

import rates from './rates';
import prevData from './prevData';
import currency from './currency'

const appReducer = combineReducers({
    rates,
    prevData,
    currency,
})

export default appReducer;