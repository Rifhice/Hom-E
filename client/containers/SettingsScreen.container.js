import { connect } from 'react-redux';
import settings from '../screens/SettingsScreen';
import { withNamespaces } from 'react-i18next';
import { withInAppNotification } from 'react-native-in-app-notification';
import { withColors, withThemeChanger } from '../colorTheme'
import Colors from '../constants/Colors';

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const component = withColors(withNamespaces()(withInAppNotification(connect(
    mapStateToProps,
    mapDispatchToProps
)(settings))))

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