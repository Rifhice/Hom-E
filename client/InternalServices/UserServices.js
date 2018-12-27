import UserWebServices from '../WebServices/UserWebServices'
import SocketService from '../SocketService'
import actions from '../redux/actions/user.actions'

export default {
    async register(data, dispatch) {
        try {
            const token = await UserWebServices.register(data)
            dispatch({ type: actions.SAVE_TOKEN, payload: { token } })
        }
        catch (error) {
            console.log(error)
        }
    },
    async login(data, dispatch) {
        try {
            const token = await UserWebServices.login(data)
            dispatch({ type: actions.SAVE_TOKEN, payload: { token } })
            return token
        }
        catch (error) {
            console.log(error)
            return false
        }
    },
    async getInformation(dispatch) {
        try {
            const information = await UserWebServices.getInformation()
            dispatch({ type: actions.USER_INFORMATION, payload: information })
            return information
        }
        catch (error) {
            console.log(error)
            return false
        }
    },
    async updateCurrentDevice(oldDeviceId, newDeviceId, dispatch) {
        try {
            SocketService.unsubscribe(oldDeviceId)
            const information = await UserWebServices.updateCurrentDevice(newDeviceId)
            dispatch({ type: actions.USER_INFORMATION, payload: information })
            SocketService.subscribe(information.currentDevice)
            return information
        }
        catch (error) {
            console.log(error)
            return false
        }
    },
    async updateLanguage(language, changeLanguage, dispatch) {
        try {
            const information = await UserWebServices.updateLanguage(language)
            dispatch({ type: actions.USER_INFORMATION, payload: information })
            changeLanguage(information.language)
            return information
        }
        catch (error) {
            console.log(error)
            return false
        }
    },
    async updateTheme(theme, changeTheme, dispatch) {
        try {
            const information = await UserWebServices.updateTheme(theme)
            dispatch({ type: actions.USER_INFORMATION, payload: information })
            changeTheme(information.language)
            return information
        }
        catch (error) {
            console.log(error)
            return false
        }
    }
}