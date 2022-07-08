import { SET_CURR } from "../constants";

const initialState = {
    abbr: 'USD',
    scale: 1,
    rate: 1,
}

const currency = (state = initialState, action) => {
    const { type, abbr, scale, rate } = action;
    console.log(rate, scale);
    switch (type) {
        case SET_CURR:
            return ({
                ...state,
                abbr: abbr,
                scale: scale,
                rate: rate / scale,
            })
        default:
            return state
    }
}

export default currency;