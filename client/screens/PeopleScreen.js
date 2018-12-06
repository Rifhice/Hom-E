import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            theme: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.theme.current !== prevState.theme) {
            nextProps.navigation.setParams({
                title: "Peoples",
                backgroundColor: nextProps.c('headerBackgroundDefault'),
                headerTintColor: nextProps.c('headerTextBackground'),
                tabBarLabel: 'Peoples',
                tabBarIcon: ({ focused }) => (
                    <TabBarIcon
                        focused={focused}
                        name={
                            Platform.OS === 'ios'
                                ? `ios-people`
                                : 'md-people'
                        }
                    />
                ),
                tabBarOptions: {
                    activeTintColor: nextProps.c('tintColor'),
                },
            })
        }
        return { theme: nextProps.theme.current }
    }

    render() {
        const { t, i18n, c } = this.props;
        return <Text>{t('title')}</Text>;
    }
}
