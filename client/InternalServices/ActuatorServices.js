import ActuatorWebServices from '../WebServices/ActuatorWebServices'
import actions from '../redux/actions/actuator.actions'

export default {
    async getActuators(deviceId, dispatch) {
        try {
            const result = await ActuatorWebServices.getActuators(deviceId)
            dispatch({ type: actions.FETCHED_ACTUATORS, payload: result })
        }
        catch (error) {
            console.log(error)
        }
    },
    async executeOrder(deviceId, key, argument, actuatorId, commandId, dispatch) {
        try {
            const result = await ActuatorWebServices.executeOrder(deviceId, key, argument, actuatorId, commandId)
        }
        catch (error) {
            console.log(error)
        }
    }
}