
export const ratesSelector = (state) => state.rates.entities;
export const rateSelector = (state) => state.currency.Cur_OfficialRate;
export const daySelector = (state) => state.day;

export const ratesLoadingSelector = (state) => state.rates.loading;
export const ratesLoadedSelector = (state) => state.rates.loaded;
export const ratesErrorSelector= (state) => state.rates.error;
export const activeRatesSelector = (state) => Object.values(ratesSelector(state)[state.day] || 0);

export const activeAbbrSelector = (state) => state.currency.Cur_Abbreviation;
export const activeNameSelector = (state) => state.currency.Cur_Name;