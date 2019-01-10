import DeviceWebServices from '../WebServices/DeviceWebService'
import actions from '../redux/actions/device.actions'

export default {
    async getDeviceUsers(deviceId, dispatch) {
        try {
            const result = await DeviceWebServices.getDeviceUsers(deviceId)
            dispatch({ type: actions.FETCHED_DEVICE_USERS, payload: result })
        }
        catch (error) {
            console.log(error.response)
        }
    }
}