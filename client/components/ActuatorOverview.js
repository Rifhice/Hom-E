import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import Text from './StyledText'
import Switch from './Switch'
import Slider from './Slider'
import Icons from '../constants/Icons.js'
import ActuatorServices from '../InternalServices/ActuatorServices'

export default class ActuatorOverview extends React.Component {

    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 3, paddingTop: 10, alignContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{ flex: 3.5 }} onPress={this.props.onPress}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: .5, paddingLeft: 10, justifyContent: "center" }}>
                                <Icon
                                    name={Icons.STATUS.name}
                                    type={Icons.STATUS.type}
                                    color={this.props.actuator.isConnected ? this.props.theme.current['green'] : this.props.theme.current['red']} />
                            </View>
                            <View style={{ flex: .5, paddingLeft: 10, paddingRight: 10, justifyContent: "center" }}>
                                <Icon
                                    name={this.props.actuator.category && this.props.actuator.category.name ? Icons[`${this.props.actuator.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${this.props.actuator.category.name.toUpperCase()}_CATEGORY`].name : Icons.UNKNOWN.name : Icons.UNKNOWN.name}
                                    type={this.props.actuator.category && this.props.actuator.category.name ? Icons[`${this.props.actuator.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${this.props.actuator.category.name.toUpperCase()}_CATEGORY`].type : Icons.UNKNOWN.type : Icons.UNKNOWN.type}
                                    color={this.props.theme.current['objectCategory']} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text h4 >{this.props.actuator.name}</Text>
                                <Text style={{ color: this.props.theme.current['grey'] }}>{this.props.actuator.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 2 }}>
                        {this.props.actuator.quick_command
                            ? <View style={{ alignItems: "center" }}>
                                {
                                    this.props.actuator.quick_command.type === "switch"
                                        ? <Switch
                                            style={{ flex: 1 }}
                                            onSwitchColor={this.props.theme.current["onSwitch"]}
                                            offSwitchColor={this.props.theme.current["offSwitch"]}
                                            onChange={(val) => this.props.actuator.isConnected ? ActuatorServices.executeOrder(this.props.deviceId, this.props.actuator.quick_command.key, val, this.props.actuator._id, this.props.actuator.quick_command._id) : 0}
                                            isActive={this.props.actuator.quick_command.command_argument.current}
                                        ></Switch>
                                        : this.props.actuator.quick_command.type === "slider"
                                            ? <Slider
                                                style={{ flex: 1, width: "90%", height: "90%" }}
                                                theme={this.props.theme}
                                                onChange={(val) => this.props.actuator.isConnected ? ActuatorServices.executeOrder(this.props.deviceId, this.props.actuator.quick_command.key, val, this.props.actuator._id, this.props.actuator.quick_command._id) : 0}
                                                originalValue={this.props.actuator.quick_command.command_argument.current}
                                                minimumValue={this.props.actuator.quick_command.command_argument.min}
                                                maximumValue={this.props.actuator.quick_command.command_argument.max}
                                                step={this.props.actuator.quick_command.command_argument.precision}
                                                displayValueUnder={false}></Slider>
                                            : ""
                                }
                            </View>
                            : <Text>Move to details</Text>}
                    </View>
                </View>
                <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
            </View>
        );
    }
}
