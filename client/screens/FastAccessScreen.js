import React from 'react';
import { ScrollView, View, RefreshControl, TouchableHighlight } from 'react-native';
import { Card, Divider } from 'react-native-elements'
import Text from '../components/StyledText'
import Loader from '../components/Loader'
import Command from '../components/Command'
import EnvironmenVariable from '../components/EnvironmenVariable'
import Icons from '../constants/Icons'

export default class FastAccessScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            theme: {
                current: {}
            },
            fetched: false,
            refreshing: false
        }
    }

    async componentDidMount() {
        await this.props.getFavourites(this.props.currentDevice._id)
        await this.props.fetchActuators(this.props.currentDevice._id)
        await this.props.fetchSensors(this.props.currentDevice._id)
        this.setState({ fetched: true })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, async () => {
            await this.props.getFavourites(this.props.currentDevice._id)
            await this.props.fetchActuators(this.props.currentDevice._id)
            await this.props.fetchSensors(this.props.currentDevice._id)
            this.setState({ refreshing: false })
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
            nextProps.navigation.setParams({
                title: nextProps.t('favourites'),
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    render() {
        const { t } = this.props
        return this.state.fetched
            ? <ScrollView style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }}>
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
                <View style={{ marginBottom: 5 }}>
                    <Text h2 style={{ alignSelf: "center" }}>{t('Actuators')}</Text>
                    {
                        this.props.favourites.actuators.map(actuator =>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('DetailActuator', { actuator: actuator._id, deviceId: this.props.currentDevice._id })}
                                key={actuator._id}
                                style={{
                                    borderWidth: 1,
                                    borderColor: actuator.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"],
                                    alignItems: "center",
                                    flex: 1,
                                    width: '90%',
                                    alignSelf: "center",
                                    backgroundColor: this.props.theme.current["secondaryScreenBackground"],
                                    shadowColor: actuator.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"],
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 7, marginBottom: 7, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontWeight: "bold" }}>{actuator.name}</Text>
                                    </View>
                                    <View style={{ marginTop: 7, marginBottom: 7, justifyContent: "center", alignItems: "center" }}>
                                        <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
                                    </View>
                                    {actuator.commands.map(command =>
                                        <View key={command._id} style={{ flexDirection: "row", flex: 1, alignContent: "center", alignItems: "center", width: "90%", marginBottom: 5 }}>
                                            <View style={{ flex: 3 }}>
                                                <Text h4>{command.name}</Text>
                                                <Text style={{ color: this.props.theme.current['grey'] }}>{command.description}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ alignItems: "center" }}>
                                                    <Command
                                                        command={command}
                                                        actuator={actuator}
                                                        deviceId={this.props.currentDevice._id}
                                                        executeOrder={this.props.executeOrder}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </TouchableHighlight>)
                    }
                </View>
                <View>
                    <Text h2 style={{ alignSelf: "center" }}>{t('Sensors')}</Text>
                    {
                        this.props.favourites.sensors.map(sensor =>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('DetailSensor', { sensor: sensor._id, deviceId: this.props.currentDevice._id })}
                                key={sensor._id}
                                style={{
                                    borderWidth: 1,
                                    borderColor: sensor.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"],
                                    alignItems: "center",
                                    flex: 1,
                                    width: '90%',
                                    alignSelf: "center",
                                    backgroundColor: this.props.theme.current["secondaryScreenBackground"],
                                    shadowColor: sensor.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"],
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginTop: 7, marginBottom: 7, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontWeight: "bold" }}>{sensor.name}</Text>
                                    </View>
                                    <View style={{ marginTop: 7, marginBottom: 7, justifyContent: "center", alignItems: "center" }}>
                                        <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
                                    </View>
                                    {sensor.environment_variables.map(env_var =>
                                        <View
                                            key={env_var._id}
                                            style={{ marginBottom: 5, alignItems: "center", width: "90%" }} >
                                            <EnvironmenVariable
                                                env_var={env_var}
                                            />
                                            <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
                                        </View>)
                                    }
                                </View>
                            </TouchableHighlight>
                        )
                    }
                </View>
            </ScrollView>
            : <Loader></Loader>
    }
}
