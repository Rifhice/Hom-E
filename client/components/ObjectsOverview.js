import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Divider, Text, Icon } from 'react-native-elements'
import Switch from '../components/Switch'
import Slider from '../components/Slider'
import Icons from '../constants/Icons.js'
import ActuatorServices from '../InternalServices/ActuatorServices'

export default class ObjectOverview extends React.Component {

    render() {
        object = this.props.object
        return (
            <View style={{ alignItems: "center", backgroundColor: object.isConnected ? "green" : "red" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 3, paddingTop: 10, alignContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{ flex: 3.5 }} onPress={this.props.onPress}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: .5, paddingLeft: 10, paddingRight: 10, alignItems: "center" }}>
                                <Icon
                                    name={Icons.lightbulb_off.name}
                                    type={Icons.lightbulb_off.type}
                                    color='#f50' />
                            </View>
                            <View style={{ flex: 3 }}>
                                <Text h4 >{object.name}</Text>
                                <Text style={{ color: "grey" }}>{object.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 2 }}>
                        {object.quick_command
                            ? <View style={{ alignItems: "center" }}>
                                {
                                    object.quick_command.type === "switch"
                                        ? <Switch
                                            style={{ flex: 1 }}
                                            onChange={(val) => ActuatorServices.executeOrder(this.props.deviceId, object.quick_command.key, val, object._id, object.quick_command._id)}
                                            isActive={object.quick_command.command_argument.current}
                                        ></Switch>
                                        : object.quick_command.type === "slider"
                                            ? <Slider
                                                style={{ flex: 1, width: "90%", height: "90%" }}
                                                onChange={(val) => console.log(val)}
                                                originalValue={object.quick_command.command_argument.current}
                                                minimumValue={object.quick_command.command_argument.min}
                                                maximumValue={object.quick_command.command_argument.max}
                                                step={object.quick_command.command_argument.precision}
                                                displayValueUnder={false}></Slider>
                                            : ""
                                }
                            </View>
                            : <Text>"Move to details"</Text>}
                    </View>
                </View>
                <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
            </View>
        );
    }
}
