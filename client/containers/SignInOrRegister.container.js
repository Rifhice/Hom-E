import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { connect } from 'react-redux';
import UserServices from '../InternalServices/UserServices';
import signin from '../screens/SignInOrRegisterScreen';
import { withChangeTheme, withTheme } from '../ThemeProvider';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async register(data) {
            return await UserServices.register(data, dispatch)
        },
        async login(data) {
            return await UserServices.login(data, dispatch)
        },
        async getInformation() {
            return await UserServices.getInformation(dispatch)
        },
    }
}

const component = withChangeTheme(withTheme(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(signin)))))


export default component;