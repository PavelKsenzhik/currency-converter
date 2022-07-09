import { SET_CURR } from "../constants";

const initialState = {
    Cur_Abbreviation: 'USD',
    Cur_Scale: 1,
    Cur_OfficialRate: 1,
    Cur_Name: '',
}

const currency = (state = initialState, action) => {
    const { type, rate } = action;
    

    switch (type) {
        case SET_CURR:
            return ({
                ...state,
                Cur_Abbreviation: rate.Cur_Abbreviation,
                Cur_Scale: rate.Cur_Scale,
                Cur_OfficialRate: rate.Cur_OfficialRate / rate.Cur_Scale,
                Cur_Name: rate.Cur_Name,
            })
        default:
            return state
    }
}

export default currency;