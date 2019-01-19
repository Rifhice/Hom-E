import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppState from '../AppState';
import Device from '../containers/Device.container';
import NewDevice from '../containers/NewDevice.container';

export default class AppScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fetched: false
        }
    }

    async componentDidMount() {
        await this.props.getInformation()
        this.setState({ fetched: true })
    }

    render() {
        return this.state.fetched
            ? <View style={{ flex: 1 }}>
                {
                    !this.props.currentDevice._id
                        ? <View style={{ flex: 1 }}>
                            <AppState
                                personalRegistering={true}
                                userId={this.props.userId} />
                            <NewDevice />
                        </View>
                        : <View style={{ flex: 1 }}>
                            <AppState
                                deviceRegistering={true}
                                deviceId={this.props.currentDevice._id} />
                            <Device />
                        </View>
                }
            </View>
            : <View style={{ flex: 1 }}>
                <ActivityIndicator></ActivityIndicator>
            </View>

    }
}