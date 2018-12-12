import actuators from './actuator.reducer'
import favourites from './favourites.reducer'
import { combineReducers } from 'redux';

export default combineReducers({
    actuators,
    favourites
});