import SensorWebServices from '../WebServices/SensorWebServices'
import actions from '../redux/actions/sensor.actions'

export default {
    async getSensors(deviceId, dispatch) {
        try {
            const result = await SensorWebServices.getSensors(deviceId)
            dispatch({ type: actions.FETCHED_SENSOR, payload: result })
        }
        catch (error) {
            console.log(error)
        }
    }
}