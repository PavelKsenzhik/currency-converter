import { combineReducers } from 'redux';

import rates from './rates';
import day from './day';
import rate from './rate';

export default combineReducers({
    rates,
    day,
    rate,
})