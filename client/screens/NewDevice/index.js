import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import InitialScreen from './Home';
import WifiCredentials from './WifiCredentials';

export default class NewDevice extends React.Component {

    render() {
        const Navigator = createStackNavigator({
            Home: {
                screen: InitialScreen,
                navigationOptions: ({ navigation }) => ({
                    title: 'No devices',
                    headerRight: (
                        <Icon
                            style={{}}
                            onPress={() => this.props.removeToken(this.props.userId)}
                            name='logout'
                            color='red'
                            type='material-community' />
                    ),
                })
            },
            WifiCredentials: {
                screen: WifiCredentials,
                navigationOptions: ({ navigation }) => ({
                    title: 'Wifi Credentials',
                    headerRight: (
                        <Icon
                            style={{}}
                            onPress={() => this.props.removeToken(this.props.userId)}
                            name='logout'
                            color='red'
                            type='material-community' />
                    ),
                })
            },
        }, {
                initialRouteName: "Home"
            });
        return <Navigator></Navigator>
    }
}