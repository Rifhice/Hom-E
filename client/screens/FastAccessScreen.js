import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import Text from '../components/StyledText'
import Switch from '../components/Switch'
import Slider from '../components/Slider'
import Loader from '../components/Loader'

export default class FastAccessScreen extends React.Component {

    constructor(props) {
        super(props)
        console.log(props.favourites)
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
        this.setState({ fetched: true })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, async () => {
            await this.props.getFavourites(this.props.currentDevice._id)
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
                <View>
                    <Text h2 style={{ alignSelf: "center" }}>{t('Actuators')}</Text>
                    {
                        this.props.favourites.actuators.map(actuator =>
                            <Card title={actuator.name} key={actuator._id} containerStyle={{ borderColor: actuator.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"] }}>
                                {actuator.commands.map(command =>
                                    <View key={command._id} style={{ flexDirection: "row", flex: 1, alignContent: "center", alignItems: "center" }}>
                                        <View style={{ flex: 3 }}>
                                            <Text h4>{command.name}</Text>
                                            <Text style={{ color: this.props.theme.current['grey'] }}>{command.description}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ alignItems: "center" }}>
                                                {command.type === "switch"
                                                    ? <Switch
                                                        style={{ flex: 1 }}
                                                        onSwitchColor={this.props.theme.current["onSwitch"]}
                                                        offSwitchColor={this.props.theme.current["offSwitch"]}
                                                        onChange={(val) => actuator.isConnected ? this.props.executeOrder(this.props.currentDevice._id, command.key, val, actuator._id, command._id) : 0}
                                                        isActive={command.command_argument.current}
                                                    ></Switch>
                                                    : command.type === "slider"
                                                        ? <Slider
                                                            style={{ flex: 1, width: "90%", height: "90%" }}
                                                            onChange={(val) => console.log(val)}
                                                            originalValue={0}
                                                            minimumValue={0}
                                                            maximumValue={100}
                                                            step={1}
                                                            displayValueUnder={false}></Slider>
                                                        : ""
                                                }
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </Card>)
                    }
                </View>
                <View>
                    <Text h2 style={{ alignSelf: "center" }}>{t('Sensors')}</Text>
                    {
                        this.props.favourites.sensors.map(sensor =>
                            <Card title={sensor.name} key={sensor._id} containerStyle={{ borderColor: sensor.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"] }} >

                            </Card>
                        )
                    }
                </View>
            </ScrollView>
            : <Loader></Loader>
    }
}
