import actions from '../actions/sensor.actions'

const defaultState = {
    all: []
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    switch (action.type) {
        case actions.FETCHED_SENSOR:
            return {
                all: action.payload
            }
        case actions.REGISTERED_SENSOR:
            return {
                all: [...state.all, action.payload.sensor]
            }
        case actions.UPDATE_SENSOR_ISCONNECTED:
            return {
                all: state.all.map(sensor => sensor._id === action.payload._id ? { ...sensor, isConnected: action.payload.isConnected } : sensor)
            }
        case actions.UPDATE_ENVIRONMENT_VARIABLE_VALUE:
            return {
                all: state.all.map(sensor => ({ ...sensor, environment_variables: sensor.environment_variables.map(env_var => console.log(env_var._id) || env_var._id === action.payload._id ? { ...env_var, value: { ...env_var.value, current: action.payload.newValue } } : env_var) }))
            }
        default:
            return state
    }
}