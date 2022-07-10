import { LOAD_RATES, SET_CURR, SET_DAY } from "./constants";


export const loadRates = () => ({
    type: LOAD_RATES,
    CallAPI: 'https://www.nbrb.by/api/exrates/rates?periodicity=0',
});

export const setPrevData = (day, prevBynAmount, prevCurrAmount) => ({
    type: SET_DAY,
    day: day,
    prevBynAmount: prevBynAmount,
    prevCurrAmount:  prevCurrAmount,
})

export const setCurr = (rate) => ({
    type: SET_CURR,
    rate: rate,
})