import { connect } from 'react-redux';
import peoples from '../screens/PeopleScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import DeviceService from '../InternalServices/DeviceServices'
import GeneralServices from '../InternalServices/GeneralServices'
import NotificationBuilder from '../helper/NotificationBuilder'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice,
        deviceUsers: state.device,
        userId: state.user._id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async getDeviceUsers(deviceId) {
            try {
                return await DeviceService.getDeviceUsers(deviceId, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async updateUserRank(deviceId, userId, rank) {
            try {
                return await DeviceService.updateUserRank(deviceId, userId, rank, dispatch)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async getUserByUsername(query) {
            try {
                return await GeneralServices.getUserByUsername(query)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async addUser(deviceId, userId) {
            try {
                return await DeviceService.addUser(deviceId, userId)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async removeUser(deviceId, userId) {
            try {
                return await DeviceService.removeUser(deviceId, userId)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async getAllPossibleRestrictions(deviceId) {
            try {
                return await DeviceService.getAllPossibleRestrictions(deviceId)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async addRestriction(deviceId, userId, restriction) {
            try {
                return await DeviceService.addRestriction(deviceId, userId, restriction)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
        async removeRestriction(deviceId, userId, restrictionId) {
            try {
                return await DeviceService.removeRestriction(deviceId, userId, restrictionId)
            } catch (error) {
                return ownProps.showNotification(NotificationBuilder(error))
            }
        },
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