import DeviceWebServices from '../WebServices/DeviceWebService'
import actions from '../redux/actions/device.actions'

export default {
    async getDeviceUsers(deviceId, dispatch) {
        const result = await DeviceWebServices.getDeviceUsers(deviceId)
        dispatch({ type: actions.FETCHED_DEVICE_USERS, payload: result })
        return result
    },
    async updateUserRank(deviceId, userId, newRank, dispatch) {
        return await DeviceWebServices.updateUserRank(deviceId, userId, newRank)
    },
    async addUser(deviceId, userId) {
        return await DeviceWebServices.addUser(deviceId, userId)
    },
    async removeUser(deviceId, userId) {
        return await DeviceWebServices.removeUser(deviceId, userId)
    },
    async getAllPossibleRestrictions(deviceId) {
        return await DeviceWebServices.getAllPossibleRestrictions(deviceId)
    },
    async addRestriction(deviceId, userId, restriction) {
        return await DeviceWebServices.addRestriction(deviceId, userId, restriction)
    },
    async removeRestriction(deviceId, userId, restrictionId) {
        return await DeviceWebServices.removeRestriction(deviceId, userId, restrictionId)
    }
}