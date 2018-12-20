import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import React from 'react';

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
                color={this.props.isActive ? "yellow" : "red"}
            />
        </View>
    }

}
