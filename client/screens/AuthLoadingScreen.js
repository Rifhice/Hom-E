import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(false ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}