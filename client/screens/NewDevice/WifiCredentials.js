import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements'

export default class WifiCredentials extends React.Component {

    static navigationOptions = {
        title: 'Wifi Credentials',
        headerRight: (
            <Icon
                style={{}}
                onPress={() => console.log("lol")}
                name='logout'
                color='red'
                type='material-community' />
        ),
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}>
                <Text>Wesh</Text>
            </View>)
    }
}