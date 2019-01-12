import { connect } from 'react-redux';
import device from '../screens/DeviceScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import UserServices from '../InternalServices/UserServices'
import actions from '../redux/actions/user.actions'
import NotificationBuilder from '../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async getInformation() {
            try {
                return await UserServices.getInformation(dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        removeToken() {
            return dispatch({ type: actions.REMOVE_TOKEN, payload: {} })
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(device)))))


export default component;