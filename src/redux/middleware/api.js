import { setCurr, setRate } from '../actions';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import { daySelector } from '../selectors';

const api = (store) => (next) => async (action) => {
  if (!action.CallAPI) return next(action);

  const { CallAPI, type, ...rest } = action;

  // Memoization 
  const day = daySelector(store.getState());
  const rates = store.getState().rates.entities;
  if (rates.hasOwnProperty(day)) {
    const rate = rates[day].USD.Cur_OfficialRate;
    next(setRate(rate));
    return 
  }

  next({ ...rest, type: type + REQUEST });
  try {
    const data = await fetch(`${CallAPI}&ondate=${day}`).then((res) => res.json());
    next({ ...rest, type: type + SUCCESS, data });
    
    const activeCurr = data.find(item => item.Cur_Abbreviation === store.getState().currency.abbr)
    console.log(activeCurr, 'api');
    // Set new Rate
    next(setCurr(activeCurr.Cur_Abbreviation, activeCurr.Cur_Scale, activeCurr.Cur_OfficialRate))
  } catch (error) {
    next({ ...rest, type: type + FAILURE, error });
  }
};

export default api;