import { SET_PHOTO } from '../constants';

export function setPhoto(photo) {
    return {
    type: SET_PHOTO,
    payload: photo
    }
}