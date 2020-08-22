import { SET_PATIENT_SELECTED, SET_PATIENT_LIST } from '../constants';
const initialState = {
    patientsSelected: [],
    patientList: []
};
const patientSelectedReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PATIENT_SELECTED:
            return {
            ...state,
            patientsSelected:action.payload
            };
        case SET_PATIENT_LIST:
            return {
            ...state,
            patientList:action.payload
            };
        default:
            return state;
    }
}
export default patientSelectedReducer;