import { connect } from 'react-redux';
import peoples from '../screens/PeopleScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import DeviceService from '../InternalServices/DeviceServices'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice,
        deviceUsers: state.device
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async getDeviceUsers(deviceId) {
            return await DeviceService.getDeviceUsers(deviceId, dispatch)
        }
    }
}

const component = withChangeTheme(withNamespaces()(withTheme(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(peoples)))))


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