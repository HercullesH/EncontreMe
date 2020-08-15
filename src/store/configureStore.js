import { createStore, combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
import loadingReducer from '../reducers/loadingReducer';
import userReducer from '../reducers/userReducer';

const rootReducer = combineReducers({ 
    count: countReducer,
    loading: loadingReducer,
    user: userReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;