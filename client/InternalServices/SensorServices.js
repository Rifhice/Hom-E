import SensorWebServices from '../WebServices/SensorWebServices'
import actions from '../redux/actions/sensor.actions'

export default {
    async getSensors(deviceId, dispatch) {
        const result = await SensorWebServices.getSensors(deviceId)
        dispatch({ type: actions.FETCHED_SENSOR, payload: result })
        return result
    }
}