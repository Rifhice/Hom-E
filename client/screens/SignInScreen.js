import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';

export default class SignInScreen extends React.Component {

    render() {
        const { i18n, changeTheme } = this.props;
        return <View style={{ flex: 1 }}>
            <Button title="Log in!" onPress={async () => {
                const token = await this.props.login({ 'username': 'k', 'password': 'g' })
                if (!token) {
                    //Error login
                }
            }} />
        </View>
    }
}