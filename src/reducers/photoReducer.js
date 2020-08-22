import { SET_PHOTO } from '../constants';
const initialState = {
photo: null
};
const photoReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PHOTO:
            return {
            ...state,
            photo: action.payload
            };
        default:
            return state;
    }
}
export default photoReducer;