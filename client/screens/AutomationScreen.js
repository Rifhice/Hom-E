import React from 'react';
import {
  View
} from 'react-native';


export default class AutomationScreen extends React.Component {

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
        title: nextProps.t('automations'),
        backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
        headerTintColor: nextProps.theme.current['headerTextBackground'],
      })
    }
    return { theme: nextProps.theme }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }}>

      </View>
    );
  }
}