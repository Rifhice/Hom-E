import React from 'react';
import { View } from 'react-native';
import Text from '../components/StyledText'
import NewDevice from '../containers/NewDevice.container'
import Device from '../containers/Device.container'

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
                    !this.props.currentDevice
                        ? <NewDevice></NewDevice>
                        : <Device></Device>
                }
            </View>
            : <View style={{ flex: 1 }}>

            </View>

    }
}