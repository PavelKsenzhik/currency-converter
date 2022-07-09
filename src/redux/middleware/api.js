import { setCurr } from '../actions';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import { daySelector } from '../selectors';

const api = (store) => (next) => async (action) => {
  if (!action.CallAPI) return next(action);

  const { CallAPI, type, ...rest } = action;
  const day = daySelector(store.getState());
  const rates = store.getState().rates.entities;
  const abbr = store.getState().currency.Cur_Abbreviation;
  
  // Memoization 
  if (rates.hasOwnProperty(day)) {
    const curr = rates[day][abbr]
    next(setCurr(curr))
    return
  }

  next({ ...rest, type: type + REQUEST });
  try {
    const data = await fetch(`${CallAPI}&ondate=${day}`).then((res) => res.json());
    next({ ...rest, type: type + SUCCESS, data });

    const activeCurr = data.find(item => item.Cur_Abbreviation === store.getState().currency.Cur_Abbreviation)

    // Set new Rate
    next(setCurr(activeCurr))
  } catch (error) {

    next({ ...rest, type: type + FAILURE, error});
  }
};

export default api;