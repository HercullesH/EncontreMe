import { START_LOADING, STOP_LOADING } from '../constants';
const initialState = {
loading: false
};
const loadingReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_LOADING:
            return {
            ...state,
            loading: action.payload
            };
        case STOP_LOADING:
            return {
            ...state,
            loading: action.payload
            };
        default:
            return state;
    }
}
export default loadingReducer;