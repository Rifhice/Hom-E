import { connect } from 'react-redux';
import object from '../../screens/ObjectScreens/ObjectScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../../ThemeProvider'
import ActuatorServices from '../../InternalServices/ActuatorServices'
import SensorServices from '../../InternalServices/SensorServices'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice,
        actuators: state.actuators.all,
        sensors: state.sensors.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async fetchActuators(deviceId) {
            return ActuatorServices.getActuators(deviceId, dispatch)
        },
        async fetchSensors(deviceId) {
            return SensorServices.getSensors(deviceId, dispatch)
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