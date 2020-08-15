import { SET_USER } from '../constants';


export function setUser(user, signed) {
    return {
    type: SET_USER,
    payload: {user, signed}
    }
}
