import { connect } from 'react-redux';
import whenSelecting from '../../screens/AutomationScreens/WhenSelectingScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../../ThemeProvider'
import BehaviorServices from "../../InternalServices/BehaviorServices"
import NotificationBuilder from '../../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async addBehavior(deviceId, behavior) {
            try {
                return await BehaviorServices.addBehavior(deviceId, behavior, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(whenSelecting)))))

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