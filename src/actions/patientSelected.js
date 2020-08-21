import { SET_PATIENT_SELECTED } from '../constants';
export function setPatientSelected(patientsSelected) {
return {
type: SET_PATIENT_SELECTED,
payload: patientsSelected
}
}