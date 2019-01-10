import React from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { Divider, Icon, Button } from 'react-native-elements'
import Text from '../components/StyledText'
import Loader from '../components/Loader'
import Icons from '../constants/Icons.js'

export default class PeopleScreen extends React.Component {

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
        await this.props.getDeviceUsers(this.props.currentDevice)
        this.setState({ fetched: true })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, async () => {
            await this.props.getDeviceUsers(this.props.currentDevice)
            this.setState({ refreshing: false })
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
            nextProps.navigation.setParams({
                title: nextProps.t('peoples'),
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    render() {
        const { t, i18n, theme, changeTheme } = this.props;
        return this.state.fetched
            ? <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }}>
                <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <Text h2>{t('MainUser')}</Text>
                    <Text h4 style={{ marginTop: 5, marginBottom: 5 }}>{this.props.deviceUsers.masterUser.username}</Text>
                    <Divider style={{ backgroundColor: 'lightgrey', width: "95%" }}></Divider>
                </View>
                <ScrollView style={{ flex: 5 }}>
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ alignItems: "center", marginBottom: 5 }}>
                            <Text h2>{t('Admins')}</Text>
                        </View>
                        {
                            this.props.deviceUsers.users.some(current => current.user._id !== this.props.deviceUsers.masterUser._id && current.rank === "Admin")
                                ? this.props.deviceUsers.users.map(current => {
                                    if (current.user._id !== this.props.deviceUsers.masterUser._id && current.rank === "Admin") {
                                        return <View key={current.user._id} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text h4>{current.user.username}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Icon
                                                    size={40}
                                                    name={Icons.arrowDown.name}
                                                    type={Icons.arrowDown.type}
                                                    color={this.props.theme.current['red']} />
                                                <Icon
                                                    size={40}
                                                    name={Icons.removeUser.name}
                                                    type={Icons.removeUser.type}
                                                    color={this.props.theme.current['red']} />
                                            </View>
                                            <Divider style={{ backgroundColor: 'lightgrey', width: "75%" }}></Divider>
                                        </View>
                                    }
                                })
                                : <View style={{ alignItems: "center" }}>
                                    <Text style={{ color: this.props.theme.current['grey'] }}>{t('NoAdmins')}</Text>
                                </View>
                        }
                    </View>
                    <View>
                        <View style={{ alignItems: "center", marginBottom: 5 }}>
                            <Text h2>{t('Members')}</Text>
                        </View>
                        {this.props.deviceUsers.users.some(current => current.user._id !== this.props.deviceUsers.masterUser._id && current.rank === "Member")
                            ? this.props.deviceUsers.users.map(current => {
                                if (current.user._id !== this.props.deviceUsers.masterUser._id && current.rank === "Member") {
                                    return <View key={current.user._id} style={{ flex: 1 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                            <Text h4>{current.user.username}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Icon
                                                    size={40}
                                                    name={Icons.arrowUp.name}
                                                    type={Icons.arrowUp.type}
                                                    color={this.props.theme.current['green']} />
                                                <Icon
                                                    size={40}
                                                    name={Icons.removeUser.name}
                                                    type={Icons.removeUser.type}
                                                    color={this.props.theme.current['red']} />
                                            </View>
                                        </View>
                                        <Divider style={{ backgroundColor: 'lightgrey', width: "75%", alignSelf: "center" }}></Divider>
                                    </View>
                                }
                            })
                            : <View style={{ alignItems: "center" }}>
                                <Text style={{ color: theme.current["grey"] }}>{t('NoMembers')}</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
                <Button
                    title={t('AddUser')}
                    onPress={async () => {
                    }}
                    buttonStyle={{
                        backgroundColor: theme.current["green"]
                    }}
                />
            </View>
            : <Loader></Loader>
    }
}
