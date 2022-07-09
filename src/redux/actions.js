import { LOAD_RATES, SET_CURR, SET_DAY, SET_RATE } from "./constants";


export const loadRates = () => ({
    type: LOAD_RATES,
    CallAPI: 'https://www.nbrb.by/api/exrates/rates?periodicity=0',
});

export const setDay = (day) => ({
    type: SET_DAY,
    day: day,
})

export const setCurr = (rate) => ({
    type: SET_CURR,
    rate: rate,
})