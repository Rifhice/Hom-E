import actions from '../actions/user.actions'
import { AsyncStorage } from 'react-native';

const defaultState = {
    _id: null,
    token: null,
    language: null,
    theme: null,
    devices: null,
    currentDevice: null
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.SAVE_TOKEN:
            AsyncStorage.setItem('userToken', action.payload.token)
            return {
                ...state,
                token: action.payload.token
            }
        case actions.REMOVE_TOKEN:
            AsyncStorage.removeItem('userToken')
            return {
                ...state,
                token: null
            }
        case actions.USER_INFORMATION:
            return {
                ...state,
                ...action.payload
            }
        case actions.NEW_DEVICE_PAIRED:
            return {
                ...state,
                devices: [...state.devices, action.payload.deviceId],
                currentDevice: state.currentDevice === null ? action.payload.deviceId : state.currentDevice
            }
        case actions.LOGOUT:
            return defaultState
        default:
            return state
    }
}