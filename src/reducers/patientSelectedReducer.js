import { SET_PATIENT_SELECTED } from '../constants';
const initialState = {
    patientsSelected: []
};
const patientSelectedReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PATIENT_SELECTED:
            return {
            ...state,
            patientsSelected:action.payload
            };
        default:
            return state;
    }
}
export default patientSelectedReducer;