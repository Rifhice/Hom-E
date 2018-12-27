import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors';

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
                title: nextProps.t('peoples'),
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    render() {
        const { t, i18n, theme, changeTheme } = this.props;
        return <TouchableHighlight onPress={() => i18n.changeLanguage('en')} style={{ backgroundColor: theme.current['tintColor'] }}><Text>{t('title')}</Text></TouchableHighlight>;
    }
}
