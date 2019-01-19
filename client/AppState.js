import { Component } from 'react';
import { AppState } from 'react-native';
import SocketServices from './SocketService';

export default class AppStateExample extends Component {

    state = {
        appState: AppState.currentState
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (this.props.deviceRegistering) {
                SocketServices.subscribe(this.props.deviceId)
            }
            else if (this.props.personalRegistering) {
                SocketServices.connectToSocket(this.props.userId)
            }
            console.log('App has come to the foreground!')
        }
        else if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
            if (this.props.deviceRegistering) {
                SocketServices.unsubscribe(this.props.deviceId)
            }
            else if (this.props.personalRegistering) {
                SocketServices.disconnectToSocket(this.props.userId)
            }
            console.log("App is going background or inactive!")
        }
        this.setState({ appState: nextAppState });
    }

    render() {
        return (
            null
        );
    }

}