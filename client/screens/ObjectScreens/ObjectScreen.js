import React from 'react';
import { Platform } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Divider, Text, Icon } from 'react-native-elements'
import Switch from '../../components/Switch'
import Slider from '../../components/Slider'
import ObjectOverview from '../../components/ObjectsOverview';

export default class LinksScreen extends React.Component {

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
        title: nextProps.t('objects'),
        backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
        headerTintColor: nextProps.theme.current['headerTextBackground'],
      })
    }
    return { theme: nextProps.theme }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        {this.props.actuators.map(actuator =>
          <ObjectOverview
            key={actuator._id}
            object={actuator}
            onPress={() => console.log("press") || navigate('DetailObject', { object: actuator })}
          ></ObjectOverview>
        )}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
