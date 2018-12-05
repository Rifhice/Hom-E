import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Peoples',
        headerStyle: {
            backgroundColor: Colors.headerBackgroundDefault,
        },
        headerTintColor: Colors.headerTextBackground,
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    render() {
        return <Text>People</Text>;
    }
}
