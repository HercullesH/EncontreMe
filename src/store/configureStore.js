import { createStore, combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
import loadingReducer from '../reducers/loadingReducer';
import userReducer from '../reducers/userReducer';
import patientSelectedReducer from '../reducers/patientSelectedReducer';
import photoReducer from  '../reducers/photoReducer'

const rootReducer = combineReducers({ 
    count: countReducer,
    loading: loadingReducer,
    user: userReducer,
    patientsSelected: patientSelectedReducer,
    photo: photoReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;