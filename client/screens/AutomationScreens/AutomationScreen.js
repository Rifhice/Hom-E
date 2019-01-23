import React from 'react';
import { RefreshControl, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import Loader from '../../components/Loader';
import Text from '../../components/StyledText';
import { evaluableToSentence, commandToSentence } from "../../helper/BehaviorHelper"

export default class AutomationScreen extends React.Component {

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
        title: nextProps.t('automations'),
        backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
        headerTintColor: nextProps.theme.current['headerTextBackground'],
      })
    }
    return { theme: nextProps.theme }
  }

  render() {
    const { t } = this.props
    return this.state.fetched
      ? <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }} >
        <ScrollView style={{ flex: 1 }}>
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
          <View style={{ marginTop: 20, flex: 1 }}>
            {this.props.behaviors.map(behavior =>
              <View
                key={behavior._id}
                style={{
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  width: '90%',
                  alignSelf: "center",
                  backgroundColor: this.props.theme.current["secondaryScreenBackground"],
                  shadowColor: this.props.theme.current["textColor"],
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  marginBottom: 10
                }}>
                <TouchableHighlight
                  onPress={() => 0}>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{ marginBottom: 5, flex: 1 }}>
                      <Text style={{ alignSelf: "center", marginBottom: 2 }} h4>{t('When')}</Text>
                      <View>
                        <Divider style={{ alignSelf: "center", backgroundColor: 'lightgrey', width: "90%", marginBottom: 4 }} />
                      </View>
                      <View style={{ width: "95%" }}>
                        <Text style={{ textAlign: "justify" }}>{console.log(behavior.evaluable) || evaluableToSentence(behavior.evaluable, t)}</Text>
                      </View>
                    </View>
                    <View
                      style={{ flex: 1, marginBottom: 3 }}>
                      <Text style={{ alignSelf: "center", marginBottom: 2 }} h4>{t('Then')}</Text>
                      <View>
                        <Divider style={{ alignSelf: "center", backgroundColor: 'lightgrey', width: "90%", marginBottom: 4 }} />
                      </View>
                      <View style={{ width: "95%" }}>
                        <Text >{commandToSentence(behavior.command, t)}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
                <Button
                  title="Delete"
                  buttonStyle={{ backgroundColor: 'red' }}
                  onPress={() => this.props.deleteBehavior(this.props.currentDevice._id, behavior._id)}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <Button
          title="Add behavior"
          onPress={() => this.props.navigation.navigate('NewAutomationScreen', { sensors: this.props.sensors, actuators: this.props.actuators })}
        />
      </View>
      : <Loader></Loader>
  }
}