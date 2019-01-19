import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class MySwitch extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{ ...this.props.style }}>
            <Icon
                name='power'
                type='feather'
                onPress={() => this.props.onChange(!this.props.isActive)}
                color={this.props.isActive ? this.props.onSwitchColor : this.props.offSwitchColor}
            />
        </View>
    }

}
