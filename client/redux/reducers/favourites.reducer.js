import actions from '../actions/user.actions'
import actuatorAction from '../actions/actuator.actions'
import sensorAction from '../actions/sensor.actions'
const defaultState = {
    actuators: [],
    sensors: []
};

export default (state = defaultState, action = { type: null, payload: null }) => {
    console.log(action)
    switch (action.type) {
        case actions.FETCHED_FAVOURITE:
            return action.payload
        case actions.FAVOURITE_ACTUATOR:
            return {
                ...state,
                actuators: [...state.actuators, action.payload]
            }
        case actions.FAVOURITE_SENSOR:
            return {
                ...state,
                sensors: [...state.sensors, action.payload]
            }
        case actions.UNFAVOURITE:
            return {
                ...state,
                actuators: state.actuators.filter(actuator => actuator._id !== action.payload._id),
                sensors: state.sensors.filter(sensor => sensor._id !== action.payload._id)
            }
        case actuatorAction.UPDATE_COMMAND_VALUE:
            return {
                ...state,
                actuators: state.actuators.map(actuator => actuator !== null ? ({ ...actuator, quick_command: actuator.quick_command._id === action.payload._id ? { ...actuator.quick_command, command_argument: { ...actuator.quick_command.command_argument, current: action.payload.newValue } } : actuator.quick_command, commands: actuator.commands.map(command => command._id === action.payload._id ? { ...command, command_argument: { ...command.command_argument, current: action.payload.newValue } } : command) }) : actuator)
            }
        case sensorAction.UPDATE_ENVIRONMENT_VARIABLE_VALUE:
            return {
                ...state,
                sensors: state.sensors.map(sensor => sensor !== null ? ({ ...sensor, environment_variables: sensor.environment_variables.map(env_var => console.log(env_var._id) || env_var._id === action.payload._id ? { ...env_var, value: { ...env_var.value, current: action.payload.newValue } } : env_var) }) : sensor)
            }
        case actuatorAction.UPDATE_ACTUATOR_ISCONNECTED:
            return {
                ...state,
                actuators: state.actuators.map(actuator => actuator._id === action.payload._id ? { ...actuator, isConnected: action.payload.isConnected } : actuator)
            }
        case sensorAction.UPDATE_SENSOR_ISCONNECTED:
            return {
                ...state,
                sensors: state.sensors.map(sensor => sensor._id === action.payload._id ? { ...sensor, isConnected: action.payload.isConnected } : sensor)
            }
        default:
            return state
    }
}