import actuators from './actuator.reducer'
import favourites from './favourites.reducer'
import sensors from './sensor.reducer'
import user from './user.reducer'
import device from './device.reducer'
import { combineReducers } from 'redux';

export default combineReducers({
    actuators,
    favourites,
    sensors,
    user,
    device
});