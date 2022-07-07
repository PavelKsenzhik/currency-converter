import { setDay, setRate } from '../actions';
import { FAILURE, REQUEST, SUCCESS } from '../constants';
import { daySelector } from '../selectors';

export default (store) => (next) => async (action) => {
  if (!action.CallAPI) return next(action);

  const { CallAPI, type, ...rest } = action;

  // Format date for API request
  const date = daySelector(store.getState());
  const month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1 }`;
  const fullDay = date.getDate().toString().length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
  const day = `${date.getFullYear()}-${month}-${fullDay}T00:00:00`;
  
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
