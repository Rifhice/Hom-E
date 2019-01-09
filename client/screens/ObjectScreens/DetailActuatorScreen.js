import React from 'react';
import { View, ScrollView } from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import Text from '../../components/StyledText'
import Switch from '../../components/Switch'
import Slider from '../../components/Slider'
import Icons from '../../constants/Icons.js'
import ActuatorServices from '../../InternalServices/ActuatorServices'

export default class DetailActuatorScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            theme: {
                current: {}
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const actuator = nextProps.actuators.find(actuator => actuator._id === nextProps.navigation.state.params.actuator)
        if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
            nextProps.navigation.setParams({
                title: actuator.name,
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    render() {
        const actuator = this.props.actuators.find(actuator => actuator._id === this.props.navigation.state.params.actuator)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 10 }}>
                        <Icon
                            name={actuator.category && actuator.category.name ? Icons[`${actuator.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${actuator.category.name.toUpperCase()}_CATEGORY`].name : Icons.UNKNOWN.name : Icons.UNKNOWN.name}
                            type={actuator.category && actuator.category.name ? Icons[`${actuator.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${actuator.category.name.toUpperCase()}_CATEGORY`].type : Icons.UNKNOWN.type : Icons.UNKNOWN.type}
                            color={this.props.theme.current['objectCategory']}
                            size={50} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }}>
                            <Icon
                                name={Icons.STATUS.name}
                                type={Icons.STATUS.type}
                                color={actuator.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"]} />
                        </View>
                        <Text h1>
                            {actuator.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={{ color: this.props.theme.current["grey"] }}>
                            {actuator.description}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 15 }}>
                        <Divider style={{ backgroundColor: 'lightgrey', width: "75%" }} />
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                        <Text h3>{this.props.t("Commands")}</Text>
                    </View>
                    <ScrollView>
                        {actuator.commands.map(command =>
                            <View key={command._id} style={{ marginBottom: 5, alignItems: "center" }}>
                                <View style={{ flexDirection: "row", marginBottom: 5, marginLeft: 5 }}>
                                    <View style={{ flex: 2 }}>
                                        <Text h4>{command.name}</Text>
                                        <Text style={{ color: this.props.theme.current["grey"] }}>{command.description}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        {command.type === "switch"
                                            ? <Switch
                                                style={{ flex: 1 }}
                                                onSwitchColor={this.props.theme.current["onSwitch"]}
                                                offSwitchColor={this.props.theme.current["offSwitch"]}
                                                onChange={(val) => actuator.isConnected ? ActuatorServices.executeOrder(this.props.navigation.state.params.deviceId, command.key, val, actuator._id, command._id) : 0}
                                                isActive={command.command_argument.current}
                                            ></Switch>
                                            : command.type === "slider"
                                                ? <Slider
                                                    style={{ flex: 1, width: "90%", height: "90%" }}
                                                    theme={this.props.theme}
                                                    onChange={(val) => actuator.isConnected ? ActuatorServices.executeOrder(this.props.navigation.state.params.deviceId, command.key, val, actuator._id, command._id) : 0}
                                                    originalValue={command.command_argument.current}
                                                    minimumValue={command.command_argument.min}
                                                    maximumValue={command.command_argument.max}
                                                    step={command.command_argument.precision}
                                                    displayValueUnder={false}></Slider>
                                                : ""}
                                    </View>
                                </View>
                                <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
                            </View>)
                        }
                    </ScrollView>
                </View>
            </View>)
    }
}
