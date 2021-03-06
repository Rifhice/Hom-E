import UserWebServices from '../WebServices/UserWebServices'
import SocketService from '../SocketService'
import actions from '../redux/actions/user.actions'

export default {
    async register(data, dispatch) {
        const token = await UserWebServices.register(data)
        dispatch({ type: actions.SAVE_TOKEN, payload: { token } })
        const information = await UserWebServices.getInformation()
        SocketService.connectToSocket(information._id)
        return false
    },
    async login(data, dispatch) {
        const token = await UserWebServices.login(data)
        dispatch({ type: actions.SAVE_TOKEN, payload: { token } })
        const information = await UserWebServices.getInformation()
        SocketService.connectToSocket(information._id)
        return token
    },
    async logout(userId, dispatch) {
        SocketService.disconnectToSocket(userId)
        dispatch({ type: actions.REMOVE_TOKEN, payload: {} })
        dispatch({ type: actions.LOGOUT, payload: {} })
    },
    async getInformation(dispatch) {
        const information = await UserWebServices.getInformation()
        dispatch({ type: actions.USER_INFORMATION, payload: information })
        return information
    },
    async updateCurrentDevice(oldDeviceId, newDeviceId, dispatch) {
        SocketService.unsubscribe(oldDeviceId)
        const information = await UserWebServices.updateCurrentDevice(newDeviceId)
        dispatch({ type: actions.USER_INFORMATION, payload: information })
        SocketService.subscribe(information.currentDevice._id)
        return information
    },
    async updateLanguage(language, dispatch) {
        const information = await UserWebServices.updateLanguage(language)
        dispatch({ type: actions.USER_INFORMATION, payload: information })
        return information
    },
    async updateTheme(theme, dispatch) {
        const information = await UserWebServices.updateTheme(theme)
        dispatch({ type: actions.USER_INFORMATION, payload: information })
        return information
    },
    async fetchFavourites(deviceId, dispatch) {
        const information = await UserWebServices.fetchFavourites(deviceId)
        dispatch({ type: actions.FETCHED_FAVOURITE, payload: information })
        return information
    },
    async favouriteActuator(deviceId, actuatorId, dispatch) {
        const information = await UserWebServices.favouriteActuator(deviceId, actuatorId)
        dispatch({ type: actions.FAVOURITE_ACTUATOR, payload: information })
        return information
    },
    async favouriteSensor(deviceId, sensorId, dispatch) {
        const information = await UserWebServices.favouriteSensor(deviceId, sensorId)
        dispatch({ type: actions.FAVOURITE_SENSOR, payload: information })
        return information
    },
    async unFavourite(deviceId, objectId, dispatch) {
        const information = await UserWebServices.unFavourite(deviceId, objectId)
        dispatch({ type: actions.UNFAVOURITE, payload: { _id: objectId, deviceId } })
        return information
    }
}