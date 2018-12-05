import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Favourites',
        headerStyle: {
            backgroundColor: Colors.headerBackgroundDefault,
        },
        headerTintColor: Colors.headerTextBackground,
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    render() {
        return <Text>Fast access</Text>;
    }
}
