import { connect } from 'react-redux';
import favourites from '../screens/FastAccessScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import UserServices from '../InternalServices/UserServices'
import NotificationBuilder from '../helper/NotificationBuilder'
import ActuatorServices from '../InternalServices/ActuatorServices'
import SensorServices from '../InternalServices/SensorServices'

const mapStateToProps = (state, ownProps) => {
    return {
        favourites: state.favourites,
        currentDevice: state.user.currentDevice,
        user: state.user
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
        },
        async getFavourites(deviceId) {
            try {
                return await UserServices.fetchFavourites(deviceId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(favourites)))))

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