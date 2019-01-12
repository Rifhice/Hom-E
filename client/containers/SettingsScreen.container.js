import { connect } from 'react-redux';
import settings from '../screens/SettingsScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import actions from '../redux/actions/user.actions'
import UserService from '../InternalServices/UserServices'
import NotificationBuilder from '../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeToken() {
            dispatch({ type: actions.REMOVE_TOKEN, payload: {} })
            dispatch({ type: actions.LOGOUT, payload: {} })
        },
        async updateTheme(theme) {
            try {
                return await UserService.updateTheme(theme, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async updateLanguage(language) {
            try {
                return await UserService.updateLanguage(language, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async updateCurrentDevice(oldDeviceId, newDeviceId) {
            try {
                return await UserService.updateCurrentDevice(oldDeviceId, newDeviceId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(settings)))))

component.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.state.params ? navigation.state.params.title : "",
        headerStyle: {
            backgroundColor: navigation.state.params ? navigation.state.params.backgroundColor : "",
        },
        headerTintColor: navigation.state.params ? navigation.state.params.headerTintColor : "",
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }
};


export default component;