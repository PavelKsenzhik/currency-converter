import { combineReducers } from 'redux';

import rates from './rates';
import day from './day';
import currency from './currency'

const appReducer = combineReducers({
    rates,
    day,
    currency,
})

export default appReducer;