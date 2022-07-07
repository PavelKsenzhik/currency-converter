import { SET_DAY } from "../constants";

import formatDate from "../../hooks/formatDate";

const day = (state = formatDate(new Date()), action) => {
    const { type, day } = action;
    const date = formatDate(day)

    switch(type){
        case SET_DAY: 
            return date
        default:
            return state
    }
}

export default day;