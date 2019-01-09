import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import Text from './StyledText'
import Icons from '../constants/Icons.js'

export default class SensorOverview extends React.Component {

    render() {
        console.log(this.props.theme.current)
        return (
            <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 3, paddingTop: 10, alignContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{ flex: 3.5 }} onPress={this.props.onPress}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: .5, paddingLeft: 10, justifyContent: "center" }}>
                                <Icon
                                    name={Icons.STATUS.name}
                                    type={Icons.STATUS.type}
                                    color={this.props.sensor.isConnected ? this.props.theme.current['green'] : this.props.theme.current['red']} />
                            </View>
                            <View style={{ flex: .5, paddingLeft: 10, paddingRight: 10, justifyContent: "center" }}>
                                <Icon
                                    name={this.props.sensor.category && this.props.sensor.category.name ? Icons[`${this.props.sensor.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${this.props.sensor.category.name.toUpperCase()}_CATEGORY`].name : Icons.UNKNOWN.name : Icons.UNKNOWN.name}
                                    type={this.props.sensor.category && this.props.sensor.category.name ? Icons[`${this.props.sensor.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${this.props.sensor.category.name.toUpperCase()}_CATEGORY`].type : Icons.UNKNOWN.type : Icons.UNKNOWN.type}
                                    color={this.props.theme.current['objectCategory']} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text h4 >{this.props.sensor.name}</Text>
                                <Text style={{ color: this.props.theme.current['grey'] }}>{this.props.sensor.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 2 }}>
                        <View style={{ alignItems: "center" }}>
                            {this.props.sensor.environment_variables.map(env_var =>
                                <Text
                                    key={env_var._id}
                                >
                                    {env_var.name} : {env_var.value.current}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
                <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
            </View>
        );
    }
}
