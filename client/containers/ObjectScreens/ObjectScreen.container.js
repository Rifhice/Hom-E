import { connect } from 'react-redux';
import object from '../../screens/ObjectScreens/ObjectScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../../ThemeProvider'
import ActuatorServices from '../../InternalServices/ActuatorServices'

const mapStateToProps = (state, ownProps) => {
    return {
        actuators: state.actuators.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async fetchActuators(deviceId) {
            ActuatorServices.getActuators(deviceId, dispatch)
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