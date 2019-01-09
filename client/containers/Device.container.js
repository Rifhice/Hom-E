import { connect } from 'react-redux';
import device from '../screens/DeviceScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import UserServices from '../InternalServices/UserServices'
import actions from '../redux/actions/user.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async getInformation() {
            return await UserServices.getInformation(dispatch)
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