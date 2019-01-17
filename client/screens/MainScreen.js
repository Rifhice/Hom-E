import React from 'react';
import { View, AsyncStorage, ActivityIndicator, StatusBar } from 'react-native';
import SignIn from '../containers/SignInOrRegister.container'
import App from '../containers/App.container'
import UserServices from '../WebServices/UserWebServices'
import SocketService from '../SocketService'
import Text from '../components/StyledText'

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