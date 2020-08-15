import { START_LOADING } from '../constants';
import { STOP_LOADING } from '../constants';


export function startLoading() {
    return {
    type: START_LOADING,
    payload: true
    }
}

export function stopLoading() {
    return {
    type: STOP_LOADING,
    payload: false
    }
}