import { SET_DAY } from "../constants";

import formatDate from "../../hooks/formatDate";

const initialState = {
    day: formatDate(new Date()),
    prevBynAmount: 1,
    prevCurrAmount: 1,
}

const prevData = (state = initialState, action) => {
    const { type, day, prevBynAmount, prevCurrAmount } = action;
    const date = formatDate(day)

    switch(type){
        case SET_DAY: 
        return {
            ...state,
            day: date,
            prevBynAmount: prevBynAmount,
            prevCurrAmount: prevCurrAmount,
        }
        default:
            return state
    }
}

export default prevData;