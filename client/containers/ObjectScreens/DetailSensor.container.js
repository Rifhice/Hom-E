import { connect } from 'react-redux';
import DetailObject from '../../screens/ObjectScreens/DetailSensorScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../../ThemeProvider'
import UserServices from '../../InternalServices/UserServices'
import NotificationBuilder from '../../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        sensors: state.sensors.all,
        favourites: state.favourites
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async favouriteSensor(deviceId, sensorId) {
            try {
                await UserServices.favouriteSensor(deviceId, sensorId, dispatch)
                return true
            } catch (error) {
                ownProps.showNotification(NotificationBuilder(error))
                return false
            }
        },
        async unFavourite(deviceId, sensorId) {
            try {
                await UserServices.unFavourite(deviceId, sensorId, dispatch)
                return true
            } catch (error) {
                ownProps.showNotification(NotificationBuilder(error))
                return false
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