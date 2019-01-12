import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import ActuatorOverview from '../../components/ActuatorOverview';
import SensorOverview from '../../components/SensorOverview';
import Loader from '../../components/Loader'

export default class LinksScreen extends React.Component {

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
    await this.props.fetchActuators(this.props.currentDevice)
    await this.props.fetchSensors(this.props.currentDevice)
    this.setState({ fetched: true })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }, async () => {
      await this.props.fetchActuators(this.props.currentDevice)
      await this.props.fetchSensors(this.props.currentDevice)
      this.setState({ refreshing: false })
    })
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
    return this.state.fetched
      ? <ScrollView style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }}>
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />

        {this.props.actuators.map(actuator =>
          <ActuatorOverview
            key={actuator._id}
            theme={this.props.theme}
            deviceId={this.props.currentDevice}
            actuator={actuator}
            executeOrder={this.props.executeOrder}
            onPress={() => navigate('DetailActuator', { actuator: actuator._id, deviceId: this.props.currentDevice })}
          ></ActuatorOverview>
        )}
        {this.props.sensors.map(sensor =>
          <SensorOverview
            key={sensor._id}
            theme={this.props.theme}
            deviceId={this.props.currentDevice}
            sensor={sensor}
            onPress={() => navigate('DetailSensor', { sensor: sensor._id, deviceId: this.props.currentDevice })}
          />)
        }
      </ScrollView>
      : <Loader></Loader>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
