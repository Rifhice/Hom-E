import UserWebServices from '../WebServices/UserWebServices'
import SocketService from '../SocketService'
import actions from '../redux/actions/user.actions'

export default {
    async register(data, dispatch) {
        const token = await UserWebServices.register(data)
        dispatch({ type: actions.SAVE_TOKEN, payload: { token } })
        return false
    },
    async login(data, dispatch) {
        const token = await UserWebServices.login(data)
        dispatch({ type: actions.SAVE_TOKEN, payload: { token } })
        return token
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
        SocketService.subscribe(information.currentDevice)
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
    }
}