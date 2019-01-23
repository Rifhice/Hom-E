import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Divider, Icon } from 'react-native-elements';
import Command from '../../components/Command';
import Text from '../../components/StyledText';
import Icons from '../../constants/Icons.js';

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
        const actuator = nextProps.actuators.find(actuator => actuator ? actuator._id === nextProps.navigation.state.params.actuator : false)
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
        const actuator = this.props.actuators.find(actuator => actuator ? actuator._id === this.props.navigation.state.params.actuator : false)
        return (
            <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }}>
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
                                        <Command
                                            command={command}
                                            actuator={actuator}
                                            deviceId={this.props.navigation.state.params.deviceId}
                                            executeOrder={this.props.executeOrder}
                                        />
                                    </View>
                                </View>
                                <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }} />
                            </View>)
                        }
                    </ScrollView>
                    <View style={{ flexDirection: "row", marginBottom: 2 }}>
                        <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                            {!this.props.favourites.actuators.some(actuator => actuator ? actuator._id === this.props.navigation.state.params.actuator : false)
                                ? <Button
                                    buttonStyle={{ backgroundColor: 'yellow' }}
                                    title="Favourite"
                                    onPress={async () => {
                                        const res = await this.props.favouriteActuator(this.props.navigation.state.params.deviceId, this.props.navigation.state.params.actuator)
                                        if (res) this.setState({ isFavourite: true })
                                    }} />
                                : <Button
                                    buttonStyle={{ backgroundColor: 'grey' }}
                                    title="UnFavourite"
                                    onPress={async () => {
                                        const res = await this.props.unFavourite(this.props.navigation.state.params.deviceId, this.props.navigation.state.params.actuator)
                                        if (res) this.setState({ isFavourite: false })
                                    }} />}
                        </View>
                        <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                            <Button
                                buttonStyle={{ backgroundColor: 'red' }}
                                title="Forget"
                            />
                        </View>
                    </View>
                </View>
            </View>)
    }
}
