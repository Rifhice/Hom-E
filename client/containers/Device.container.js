import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { connect } from 'react-redux';
import NotificationBuilder from '../helper/NotificationBuilder';
import UserServices from '../InternalServices/UserServices';
import device from '../screens/DeviceScreen';
import { withChangeTheme, withTheme } from '../ThemeProvider';

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
        async removeToken(userId) {
            try {
                return await UserServices.logout(userId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(device)))))


export default component;