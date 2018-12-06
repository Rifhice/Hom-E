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
      theme: ""
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.theme.current !== prevState.theme) {
      nextProps.navigation.setParams({
        title: "Settings",
        backgroundColor: nextProps.c('headerBackgroundDefault'),
        headerTintColor: nextProps.c('headerTextBackground')
      })
    }
    return { theme: nextProps.theme.current }
  }

  render() {
    const { t, i18n, c } = this.props;
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
          <Text>{t('title')}{c('headerTextBackground')}</Text>
        </TouchableHighlight>
      </View>)
  }
}
