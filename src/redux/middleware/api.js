import { setRate } from '../actions';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import { daySelector } from '../selectors';

const api = (store) => (next) => async (action) => {
  if (!action.CallAPI) return next(action);

  const { CallAPI, type, ...rest } = action;

  // Memoization 
  const day = daySelector(store.getState())
  
  if (store.getState().rates.entities.hasOwnProperty(day)) {
    const rate = store.getState().rates.entities[day].USD.Cur_OfficialRate;
    next(setRate(rate))
    return 
  }

  next({ ...rest, type: type + REQUEST });
  try {
    const data = await fetch(`${CallAPI}&ondate=${day}`).then((res) => res.json());
    next({ ...rest, type: type + SUCCESS, data });
    
    // Set new Rate
    next(setRate(data[5].Cur_OfficialRate))
  } catch (error) {
    next({ ...rest, type: type + FAILURE, error });
  }
};

export default api;