import { connect } from 'react-redux';
import app from '../screens/AppScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import UserServices from '../InternalServices/UserServices'
import NotificationBuilder from '../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice,
        userId: state.user._id
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
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(app)))))


export default component;