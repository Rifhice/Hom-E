import React from 'react';
import { Dimensions, RefreshControl, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, CheckBox, Divider, Icon, Overlay, SearchBar } from 'react-native-elements';
import Loader from '../components/Loader';
import Text from '../components/StyledText';
import Icons from '../constants/Icons.js';

export default class PeopleScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            theme: {
                current: {}
            },
            fetched: false,
            refreshing: false,
            addUser: false,
            updateRestrictions: false,
            resultFromSearch: [],
            selectedUser: {},
            possibleRestrictions: {}
        }
    }

    async componentDidMount() {
        await this.props.getDeviceUsers(this.props.currentDevice._id)
        this.setState({ fetched: true })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, async () => {
            await this.props.getDeviceUsers(this.props.currentDevice._id)
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
        const currentUser = this.props.deviceUsers.users.find(user => user.user._id === this.props.userId)
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
                                        return <TouchableHighlight
                                            key={current.user._id}
                                            onPress={async () => {
                                                if (!currentUser.restrictions.some(restriction => restriction.action === "update" &&
                                                    restriction.entity === "restriction" &&
                                                    restriction.target === "")) {
                                                    const restrictions = await this.props.getAllPossibleRestrictions(this.props.currentDevice._id);
                                                    this.setState({ updateRestrictions: true, possibleRestrictions: restrictions, selectedUser: current })
                                                }
                                            }
                                            }>
                                            <View
                                                style={{ flex: 1 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                                    <Text h4 style={{ alignSelf: "center" }}>{current.user.username}</Text>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {currentUser.restrictions.some(restriction => restriction.action === "update" &&
                                                            restriction.entity === "rank" &&
                                                            restriction.target === "")
                                                            ? null
                                                            : <Icon
                                                                onPress={() => this.props.updateUserRank(this.props.currentDevice._id, current.user._id, "Member")}
                                                                size={40}
                                                                name={Icons.arrowDown.name}
                                                                type={Icons.arrowDown.type}
                                                                color={this.props.theme.current['red']} />}
                                                        {currentUser.restrictions.some(restriction => restriction.action === "remove" &&
                                                            restriction.entity === "user" &&
                                                            restriction.target === "")
                                                            ? null
                                                            :
                                                            <Icon
                                                                onPress={() => this.props.removeUser(this.props.currentDevice._id, current.user._id)}
                                                                size={40}
                                                                name={Icons.removeUser.name}
                                                                type={Icons.removeUser.type}
                                                                color={this.props.theme.current['red']} />}
                                                    </View>
                                                </View>
                                                <Divider style={{ backgroundColor: 'lightgrey', width: "75%", alignSelf: "center" }}></Divider>
                                            </View>
                                        </TouchableHighlight>
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
                                    return <TouchableHighlight key={current.user._id}
                                        onPress={async () => {
                                            if (!currentUser.restrictions.some(restriction => restriction.action === "update" &&
                                                restriction.entity === "restriction" &&
                                                restriction.target === "")) {
                                                const restrictions = await this.props.getAllPossibleRestrictions(this.props.currentDevice._id);
                                                this.setState({ updateRestrictions: true, possibleRestrictions: restrictions, selectedUser: current })
                                            }
                                        }}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                                <Text h4 style={{ alignSelf: "center" }}>{current.user.username}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {currentUser.restrictions.some(restriction => restriction.action === "update" &&
                                                        restriction.entity === "rank" &&
                                                        restriction.target === "")
                                                        ? null
                                                        : <Icon
                                                            onPress={() => this.props.updateUserRank(this.props.currentDevice._id, current.user._id, "Admin")}
                                                            size={40}
                                                            name={Icons.arrowUp.name}
                                                            type={Icons.arrowUp.type}
                                                            color={this.props.theme.current['green']} />}
                                                    {currentUser.restrictions.some(restriction => restriction.action === "remove" &&
                                                        restriction.entity === "user" &&
                                                        restriction.target === "")
                                                        ? null
                                                        :
                                                        <Icon
                                                            onPress={() => this.props.removeUser(this.props.currentDevice._id, current.user._id)}
                                                            size={40}
                                                            name={Icons.removeUser.name}
                                                            type={Icons.removeUser.type}
                                                            color={this.props.theme.current['red']} />}
                                                </View>
                                            </View>
                                            <Divider style={{ backgroundColor: 'lightgrey', width: "75%", alignSelf: "center" }}></Divider>
                                        </View>
                                    </TouchableHighlight>
                                }
                            })
                            : <View style={{ alignItems: "center" }}>
                                <Text style={{ color: theme.current["grey"] }}>{t('NoMembers')}</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
                {currentUser.restrictions.some(restriction => restriction.action === "add" &&
                    restriction.entity === "user" &&
                    restriction.target === "")
                    ? null
                    :
                    <Button
                        title={t('AddUser')}
                        onPress={() => {
                            this.setState({ addUser: true })
                        }}
                        buttonStyle={{
                            backgroundColor: theme.current["green"]
                        }}
                    />}
                <Overlay
                    isVisible={this.state.updateRestrictions}
                    height={Dimensions.get('screen').height / 2}
                    windowBackgroundColor={theme.current['windowBackgroundColor']}
                    overlayBackgroundColor={theme.current['overlayBackgroundColor']}
                    transform={[
                        { translateY: - Dimensions.get('screen').height * 0.125 },
                    ]}
                    overlayStyle={{
                        borderWidth: .5,
                        borderColor: "black",
                        alignItems: "stretch"
                    }}
                    onBackdropPress={() => this.setState({ updateRestrictions: false })}
                >
                    <View style={{ alignItems: "stretch", flex: 1 }}>
                        <Text h2 style={{ alignSelf: "center" }}>Restrictions</Text>
                        <ScrollView style={{ marginTop: 10 }}>
                            <View>
                                <Text h3 style={{ alignSelf: "center" }}>General</Text>
                                {this.state.possibleRestrictions && this.state.possibleRestrictions.general && this.state.possibleRestrictions.general.map((restriction, i) =>
                                    <View key={restriction.target + restriction.entity + i} style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text>{restriction.action}</Text>
                                            <Text>{restriction.entity}</Text>
                                        </View>
                                        <View>
                                            <CheckBox
                                                center
                                                onPress={async () => {
                                                    const us = this.props.deviceUsers.users.find(user => user.user._id === this.state.selectedUser.user._id)
                                                    us.restrictions.some(rest => restriction.target === rest.target
                                                        && restriction.action === rest.action
                                                        && restriction.entity === rest.entity)
                                                        ? await this.props.removeRestriction(this.props.currentDevice._id, us.user._id, us.restrictions.find(rest => restriction.target === rest.target
                                                            && restriction.action === rest.action
                                                            && restriction.entity === rest.entity)._id)
                                                        : await this.props.addRestriction(this.props.currentDevice._id, us.user._id, restriction)
                                                }}
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checked={this.props.deviceUsers.users.find(user => user.user._id === this.state.selectedUser.user._id).restrictions.some(rest => restriction.target === rest.target
                                                    && restriction.action === rest.action
                                                    && restriction.entity === rest.entity)}
                                            />
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View>
                                <Text h3 style={{ alignSelf: "center" }}>Actuators</Text>
                                {this.state.possibleRestrictions && this.state.possibleRestrictions.actuators && this.state.possibleRestrictions.actuators.map((current, i) =>
                                    <View key={current.restriction.target + current.restriction.entity + i} style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text>{current.name}</Text>
                                        </View>
                                        <View>
                                            <CheckBox
                                                center
                                                onPress={async () => {
                                                    const us = this.props.deviceUsers.users.find(user => user.user._id === this.state.selectedUser.user._id)
                                                    us.restrictions.some(rest => current.restriction.target === rest.target
                                                        && current.restriction.action === rest.action
                                                        && current.restriction.entity === rest.entity)
                                                        ? await this.props.removeRestriction(this.props.currentDevice._id, us.user._id, us.restrictions.find(rest => current.restriction.target === rest.target
                                                            && current.restriction.action === rest.action
                                                            && current.restriction.entity === rest.entity)._id)
                                                        : await this.props.addRestriction(this.props.currentDevice._id, us.user._id, current.restriction)
                                                }}
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checked={this.props.deviceUsers.users.find(user => user.user._id === this.state.selectedUser.user._id).restrictions.some(rest => current.restriction.target === rest.target
                                                    && current.restriction.action === rest.action
                                                    && current.restriction.entity === rest.entity)}
                                            />
                                        </View>
                                    </View>
                                )}
                            </View>
                            <View>
                                <Text h3 style={{ alignSelf: "center" }}>Sensors</Text>
                                {this.state.possibleRestrictions && this.state.possibleRestrictions.sensors && this.state.possibleRestrictions.sensors.map((current, i) =>
                                    <View key={current.restriction.target + current.restriction.entity + i} style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ justifyContent: "center" }}>
                                            <Text>{current.name}</Text>
                                        </View>
                                        <View>
                                            <CheckBox
                                                center
                                                onPress={async () => {
                                                    const us = this.props.deviceUsers.users.find(user => user.user._id === this.state.selectedUser.user._id)
                                                    us.restrictions.some(rest => current.restriction.target === rest.target
                                                        && current.restriction.action === rest.action
                                                        && current.restriction.entity === rest.entity)
                                                        ? await this.props.removeRestriction(this.props.currentDevice._id, us.user._id, us.restrictions.find(rest => current.restriction.target === rest.target
                                                            && current.restriction.action === rest.action
                                                            && current.restriction.entity === rest.entity)._id)
                                                        : await this.props.addRestriction(this.props.currentDevice._id, us.user._id, current.restriction)
                                                }}
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checked={this.props.deviceUsers.users.find(user => user.user._id === this.state.selectedUser.user._id).restrictions.some(rest => current.restriction.target === rest.target
                                                    && current.restriction.action === rest.action
                                                    && current.restriction.entity === rest.entity)}
                                            />
                                        </View>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </Overlay>
                <Overlay
                    isVisible={this.state.addUser}
                    height={Dimensions.get('screen').height / 2}
                    windowBackgroundColor={theme.current['windowBackgroundColor']}
                    overlayBackgroundColor={theme.current['overlayBackgroundColor']}
                    transform={[
                        { translateY: - Dimensions.get('screen').height * 0.125 },
                    ]}
                    overlayStyle={{
                        borderWidth: .5,
                        borderColor: "black",
                        alignItems: "stretch"
                    }}
                    onBackdropPress={() => this.setState({ addUser: false, resultFromSearch: [] })}
                >
                    <View>
                        <SearchBar
                            round
                            containerStyle={{ backgroundColor: "transparent", borderTopWidth: 0 }}
                            lightTheme
                            onChangeText={async query => {
                                if (query.length !== 0) {
                                    const result = await this.props.getUserByUsername(query)
                                    this.setState({ resultFromSearch: result })
                                }
                            }}
                            onClear={() => this.setState({ resultFromSearch: [] })}
                            placeholder='Username' />
                    </View>
                    <ScrollView style={{ marginTop: 10 }}>
                        {this.state.resultFromSearch.map(user =>
                            <View key={user._id} style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flex: 5 }}>
                                    <Text>{user.username}</Text>
                                    <Text>{user.email}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Icon
                                        onPress={() => this.props.addUser(this.props.currentDevice._id, user._id)}
                                        size={40}
                                        name={Icons.add.name}
                                        type={Icons.add.type}
                                        color={this.props.theme.current['green']} />
                                </View>
                                <View style={{ alignItems: "center" }} >
                                    <Divider style={{ backgroundColor: 'lightgrey', width: "75%" }}></Divider>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </Overlay>
            </View>
            : <Loader></Loader>
    }
}
