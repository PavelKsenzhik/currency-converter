import { SET_RATE } from "../constants";

export default (state = 1, action) => {
    const { type, rate } = action;
    switch (type) {
        case SET_RATE:
            return rate;
        default:
            return state;
    }
}