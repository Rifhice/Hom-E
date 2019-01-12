import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements'

export default class InitialScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
    }

    _onRefresh = () => {
        console.log("TODO")
        this.setState({ refreshing: true }, async () => {
            this.setState({ refreshing: false })
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text h2 style={{ alignSelf: "center", marginBottom: 10 }}>No devices</Text>
                    <Text style={{ alignSelf: "center", textAlign: "center", marginBottom: 5 }}>
                        It seems this account isn't linked to any hub. To link to a hub as master user please go to settings and connect
                        to the hub's WiFi access point.
                        Otherwise ask a master user to add your account to a device</Text>
                    <Button
                        title="Link new hub"
                        onPress={() => {
                            this.props.navigation.navigate('WifiCredentials')
                        }}
                    ></Button>
                </View>
            </View>)
    }
}