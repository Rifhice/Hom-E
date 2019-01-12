import React from 'react';
import { View, ScrollView } from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import Text from '../../components/StyledText'
import Icons from '../../constants/Icons.js'

export default class DetailSensorScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            theme: {
                current: {}
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const sensor = nextProps.sensors.find(sensor => sensor._id === nextProps.navigation.state.params.sensor)
        if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
            nextProps.navigation.setParams({
                title: sensor.name,
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    render() {
        const sensor = this.props.sensors.find(sensor => sensor._id === this.props.navigation.state.params.sensor)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 10 }}>
                        <Icon
                            name={sensor.category && sensor.category.name ? Icons[`${sensor.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${sensor.category.name.toUpperCase()}_CATEGORY`].name : Icons.UNKNOWN.name : Icons.UNKNOWN.name}
                            type={sensor.category && sensor.category.name ? Icons[`${sensor.category.name.toUpperCase()}_CATEGORY`] ? Icons[`${sensor.category.name.toUpperCase()}_CATEGORY`].type : Icons.UNKNOWN.type : Icons.UNKNOWN.type}
                            color='#f50'
                            size={50} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <View style={{ justifyContent: "center", marginRight: 10 }}>
                            <Icon
                                name={Icons.STATUS.name}
                                type={Icons.STATUS.type}
                                color={sensor.isConnected ? this.props.theme.current["green"] : this.props.theme.current["red"]} />
                        </View>
                        <Text h1>
                            {sensor.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <Text style={{ color: this.props.theme.current["grey"] }}>
                            {sensor.description}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 15 }}>
                        <Divider style={{ backgroundColor: 'lightgrey', width: "75%" }} />
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={{ alignItems: "center", marginBottom: 10 }}>
                        <Text h3>{this.props.t("environment_variables")}</Text>
                    </View>
                    <ScrollView>
                        {sensor.environment_variables.map(env_var =>
                            <View key={env_var._id} style={{ marginBottom: 5, alignItems: "center" }}>
                                <View style={{ flexDirection: "row", marginBottom: 5, marginLeft: 5 }}>
                                    <View style={{ flex: 2 }}>
                                        <Text h4>{env_var.name}</Text>
                                        <Text style={{ color: this.props.theme.current["grey"] }}>{env_var.description}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                        <Text>{env_var.value.current}</Text>
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