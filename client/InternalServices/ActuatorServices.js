import ActuatorWebServices from '../WebServices/ActuatorWebServices'
import actions from '../redux/actions/actuator.actions'

export default {
    async getActuators(deviceId, dispatch) {
        const result = await ActuatorWebServices.getActuators(deviceId)
        dispatch({ type: actions.FETCHED_ACTUATORS, payload: result })
        return result
    },
    async executeOrder(deviceId, key, argument, actuatorId, commandId, dispatch) {
        return await ActuatorWebServices.executeOrder(deviceId, key, argument, actuatorId, commandId)
    }
}