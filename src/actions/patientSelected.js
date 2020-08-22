import { SET_PATIENT_SELECTED, SET_PATIENT_LIST } from '../constants';

export function setPatientSelected(patientsSelected) {
    return {
    type: SET_PATIENT_SELECTED,
    payload: patientsSelected
    }
}

export function setPatientsList(patientsList) {
    return {
    type: SET_PATIENT_LIST,
    payload: patientsList
    }
}