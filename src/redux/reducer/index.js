import { combineReducers } from 'redux';

import rates from './rates';
import day from './day';
import rate from './rate';

const appReducer = combineReducers({
    rates,
    day,
    rate,
})

export default appReducer;