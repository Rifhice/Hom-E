import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import Loader from '../../components/Loader';

export default class NewAutomationScreen extends React.Component {

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
        await this.props.getBehaviors(this.props.currentDevice._id)
        this.setState({ fetched: true })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, async () => {
            await this.props.getBehaviors(this.props.currentDevice._id)
            this.setState({ refreshing: false })
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
            nextProps.navigation.setParams({
                title: nextProps.t('newAutomations'),
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    render() {
        return this.state.fetched
            ? <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }} >
                <ScrollView>
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                </ScrollView>
            </View>
            : <Loader></Loader>
    }
}