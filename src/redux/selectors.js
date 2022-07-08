
export const ratesSelector = (state) => state.rates.entities;
export const rateSelector = (state) => state.currency.rate;
export const daySelector = (state) => state.day;

export const ratesLoadingSelector = (state) => state.rates.loading;
export const ratesLoadedSelector = (state) => state.rates.loaded;
export const activeRatesSelector = (state) => Object.values(ratesSelector(state)[state.day] || 0);