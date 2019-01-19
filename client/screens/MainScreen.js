import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import App from '../containers/App.container';
import SignIn from '../containers/SignInOrRegister.container';
import SocketService from '../SocketService';
import UserServices from '../WebServices/UserWebServices';

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fetched: false
        }
        //AsyncStorage.clear()
        AsyncStorage.getItem('userToken').then((tokenStored) => {
            if (tokenStored) {
                this.props.saveToken(tokenStored)
                UserServices.getInformation().then(information => SocketService.connectToSocket(information._id))
            }
            this.setState({ fetched: true })
        })
    }

    render() {
        return this.state.fetched
            ? <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle="light-content"
                />
                {
                    this.props.user.token
                        ? <App></App>
                        : <SignIn></SignIn>
                }
            </View>
            : <View style={{ flex: 1 }}>
                <ActivityIndicator></ActivityIndicator>
            </View>

    }
}