import React from 'react';
import { View, AsyncStorage } from 'react-native';
import SignIn from '../containers/SignIn.container'
import AppNavigator from '../containers/AppNavigator.container'

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fetched: false
        }
        //AsyncStorage.clear()
        AsyncStorage.getItem('userToken').then((tokenStored) => {
            if (tokenStored)
                this.props.saveToken(tokenStored)
            this.setState({ fetched: true })
        })
    }

    render() {
        return this.state.fetched
            ? <View style={{ flex: 1 }}>
                {
                    this.props.user.token
                        ? <AppNavigator></AppNavigator>
                        : <SignIn></SignIn>
                }
            </View>
            : <View style={{ flex: 1 }}>

            </View>

    }
}