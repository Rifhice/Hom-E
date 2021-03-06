import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { connect } from 'react-redux';
import NotificationBuilder from '../helper/NotificationBuilder';
import UserService from '../InternalServices/UserServices';
import settings from '../screens/SettingsScreen';
import { withChangeTheme, withTheme } from '../ThemeProvider';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        userId: state.user._id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async removeToken(userId) {
            try {
                return await UserService.logout(userId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
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