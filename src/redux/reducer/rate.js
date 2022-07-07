import { SET_RATE } from "../constants";

const rate = (state = 1, action) => {
    const { type, rate } = action;
    switch (type) {
        case SET_RATE:
            return rate;
        default:
            return state;
    }
}

export default rate;