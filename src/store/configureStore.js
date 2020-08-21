import { createStore, combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
import loadingReducer from '../reducers/loadingReducer';
import userReducer from '../reducers/userReducer';
import patientSelectedReducer from '../reducers/patientSelectedReducer';

const rootReducer = combineReducers({ 
    count: countReducer,
    loading: loadingReducer,
    user: userReducer,
    patientsSelected: patientSelectedReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;