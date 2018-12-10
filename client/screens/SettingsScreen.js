import React from 'react';
import {
  TouchableHighlight,
  View,
  Text
} from 'react-native';

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
        title: nextProps.t('settings'),
        backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
        headerTintColor: nextProps.theme.current['headerTextBackground']
      })
    }
    return { theme: nextProps.theme }
  }

  render() {
    const { t, i18n, theme, changeTheme } = this.props;
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.props.showNotification({
              title: 'You pressed it!',
              message: 'The notification has been triggered',
              onPress: () => console.log("che")
            })
            i18n.changeLanguage('fr')
          }}
        >
          <Text>{'yo'}</Text>
        </TouchableHighlight>
      </View>)
  }
}
