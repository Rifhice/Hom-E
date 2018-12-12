import React from 'react';
import { Icon } from 'react-native-elements'

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        type={this.props.type}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? this.props.theme.current.tabIconSelected : this.props.theme.current.tabIconDefault}
      />
    );
  }
}