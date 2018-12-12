import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements'
import Switch from '../components/Switch'
import Slider from '../components/Slider'

export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            theme: {
                current: {}
            }
        }
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
        return <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            {
                this.props.favourites.map(favourite =>
                    <Card title={favourite.name} key={favourite._id}>
                        {favourite.commands.map(command => /*
                            "_id": "000003",
            "name": "Set light",
            "type": "switch",
            "key": "set",
            "description": "....",
            "command_arguments": [
                        {"type": "discrete", "possible_values": ["on", "off"] }
                    ]*/
                            <View key={command._id} style={{ flexDirection: "row", flex: 1, alignContent: "center", alignItems: "center" }}>
                                <View style={{ flex: 3 }}>
                                    <Text h4>{command.name}</Text>
                                    <Text style={{ color: "grey" }}>{command.description}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={{ alignItems: "center" }}>
                                        {command.type === "switch"
                                            ? <Switch
                                                style={{ flex: 1 }}
                                                onChange={(val) => console.log(val)}></Switch>
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
        </ScrollView>
    }
}
