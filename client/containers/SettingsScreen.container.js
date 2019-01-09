import { connect } from 'react-redux';
import settings from '../screens/SettingsScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import actions from '../redux/actions/user.actions'
import UserService from '../InternalServices/UserServices'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeToken() {
            dispatch({ type: actions.REMOVE_TOKEN, payload: {} })
            dispatch({ type: actions.LOGOUT, payload: {} })
        },
        async updateTheme(theme) {
            return await UserService.updateTheme(theme, dispatch)
        },
        async updateLanguage(language) {
            return await UserService.updateLanguage(language, dispatch)
        },
        async updateCurrentDevice(oldDeviceId, newDeviceId) {
            return await UserService.updateCurrentDevice(oldDeviceId, newDeviceId, dispatch)
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