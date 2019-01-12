import { connect } from 'react-redux';
import DetailObject from '../../screens/ObjectScreens/DetailActuatorScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../../ThemeProvider'
import ActuatorServices from '../../InternalServices/ActuatorServices'
import NotificationBuilder from '../../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        actuators: state.actuators.all
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async executeOrder(deviceId, key, argument, actuatorId, commandId) {
            try {
                return await ActuatorServices.executeOrder(deviceId, key, argument, actuatorId, commandId)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailObject)))))

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