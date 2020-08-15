import { SET_USER } from '../constants';
const initialState = {
    user: null,
    signed: false

};
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
            ...state,
            user: action.payload.user,
            signed: action.payload.signed
            };
        default:
            return state;
    }
}
export default userReducer;