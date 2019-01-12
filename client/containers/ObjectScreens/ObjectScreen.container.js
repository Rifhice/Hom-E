import { connect } from 'react-redux';
import object from '../../screens/ObjectScreens/ObjectScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../../ThemeProvider'
import ActuatorServices from '../../InternalServices/ActuatorServices'
import SensorServices from '../../InternalServices/SensorServices'
import NotificationBuilder from '../../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice,
        actuators: state.actuators.all,
        sensors: state.sensors.all
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async fetchActuators(deviceId) {
            try {
                return await ActuatorServices.getActuators(deviceId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async fetchSensors(deviceId) {
            try {
                return await SensorServices.getSensors(deviceId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async executeOrder(deviceId, key, argument, actuatorId, commandId) {
            try {
                return await ActuatorServices.executeOrder(deviceId, key, argument, actuatorId, commandId)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(object)))))

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