import produce from 'immer';
import { arrToMap } from '../utils';
import { FAILURE, LOAD_RATES, REQUEST, SUCCESS } from '../constants';

const initialState = {
    entities: {},
    rate: 0,
    loading: false,
    loaded: false,
    error: null,
}

export default produce((draft = initialState, action) => {
    const { type, data, error } = action;
    switch(type){
        case LOAD_RATES + REQUEST: {
            draft.error = null;
            draft.loading = true;
            break;
        }
        case LOAD_RATES + SUCCESS: {
            draft.loading = false;
            draft.loaded = true;
            draft.entities[data[0].Date] = arrToMap(data);
            draft.rate = draft.entities[data[0].Date].USD.Cur_OfficialRate;
            break;
        }
        case LOAD_RATES + FAILURE: {
            draft.loading = false;
            draft.loaded = false;
            draft.error = error;
            break;
        }    
        default:
            return draft
    }
})