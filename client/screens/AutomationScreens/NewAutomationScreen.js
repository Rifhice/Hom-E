import React from 'react';
import { RefreshControl, ScrollView, View, Picker } from 'react-native';
import Text from '../../components/StyledText';
import { Button } from 'react-native-elements';
import { evaluableToSentence, commandToSentence } from "../../helper/BehaviorHelper"
import MySlider from '../../components/Slider';

export default class NewAutomationScreen extends React.Component {

    constructor(props) {
        super(props)
        this.commands = [].concat(...this.props.actuators.map(actuator => actuator.commands.map(command => { return { ...command, actuator: actuator } })))
        this.environment_variables = [].concat(...this.props.sensors.map(sensor => sensor.environment_variables.map(env_var => { return { ...env_var, sensor: sensor } })))
        this.state = {
            theme: {
                current: {}
            },
            command: this.commands[0]._id,
            finalOrder: {
                actuator: this.commands[0].actuator,
                actuatorId: this.commands[0].actuator._id,
                commandId: this.commands[0]._id,
                iscomplex: false,
                key: this.commands[0].key,
                argument: this.commands[0].type === "switch" ? true : Math.floor((this.commands[0].command_argument.min + this.commands[0].command_argument.max) / 2)
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
            nextProps.navigation.setParams({
                title: nextProps.t('thenSelecting'),
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    render() {
        const { t } = this.props
        return <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }} >
            <View style={{ flex: 1 }}>
                <Text h4 style={{ alignSelf: "center", marginTop: 5, textAlign: "center" }}>{t('thenExplanationText')}</Text>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 15, marginBottom: 15 }}>
                        <Picker
                            selectedValue={this.state.command}
                            itemStyle={{ height: 75 }}
                            onValueChange={(itemValue, itemIndex) => {
                                const command = this.commands.find(command => command._id === itemValue)
                                this.setState({
                                    command: itemValue,
                                    finalOrder: {
                                        actuator: command.actuator,
                                        actuatorId: command.actuator._id,
                                        commandId: command._id,
                                        iscomplex: false,
                                        key: command.key,
                                        argument: command.type === "switch" ? true : Math.floor((command.command_argument.min + command.command_argument.max) / 2)
                                    }
                                })
                            }}>
                            {this.commands.map(command =>
                                <Picker.Item key={command._id} label={command.name} value={command._id} />)}
                        </Picker>
                    </View>
                    <View style={{ flex: 2 }}>
                        {this.state.command
                            ? (() => {
                                const command = this.commands.find(command => command._id === this.state.command)
                                if (command.type === "switch") {
                                    return <View>
                                        <Button
                                            title={this.state.finalOrder.argument ? t('On') : t('Off')}
                                            onPress={() => this.setState({
                                                finalOrder: {
                                                    ...this.state.finalOrder,
                                                    argument: !this.state.finalOrder.argument
                                                }
                                            })}
                                        />
                                    </View>
                                }
                                else if (command.type === "slider") {
                                    return <View style={{ width: "90%", alignSelf: "center" }}>
                                        <MySlider
                                            originalValue={this.state.finalOrder.argument}
                                            minimumValue={command.command_argument.min}
                                            maximumValue={command.command_argument.max}
                                            step={command.command_argument.step}
                                            onChange={val => this.setState({
                                                finalOrder: {
                                                    ...this.state.finalOrder,
                                                    argument: Math.floor(val)
                                                }
                                            })}
                                        />
                                    </View>
                                }
                            })()
                            : null
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text h3 style={{ textAlign: "center" }}>{this.state.finalOrder && commandToSentence(this.state.finalOrder, t)}</Text>
                    </View>
                </View>
                <Button
                    title={t("Validate")}
                    onPress={() => this.props.navigation.navigate('WhenSelecting', { environment_variables: this.environment_variables, order: this.state.finalOrder })}
                />
            </View>
        </View>
    }
}