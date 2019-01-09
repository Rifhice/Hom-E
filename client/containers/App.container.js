import { connect } from 'react-redux';
import app from '../screens/AppScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withTheme, withChangeTheme } from '../ThemeProvider'
import UserServices from '../InternalServices/UserServices'

const mapStateToProps = (state, ownProps) => {
    return {
        currentDevice: state.user.currentDevice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async getInformation() {
            return await UserServices.getInformation(dispatch)
        }
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(app)))))


export default component;