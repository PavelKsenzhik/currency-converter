import { SET_DAY } from "../constants"

export default (state = new Date(), action) => {
    const { type, day } = action;

    switch(type){
        case SET_DAY: 
            return day
        default:
            return state
    }
}