import React from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  TouchableHighlight
} from 'react-native';
import Loader from '../components/Loader'
import Text from '../components/StyledText'
import { Divider, Button } from 'react-native-elements';

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

  evaluableToSentence(evaluable) {
    const operatorToString = {
      ">=": "superior or equal",
      "<=": "inferior or equal",
      ">": "superior",
      "<": "inferior",
      "==": "equal",
      "!=": "not equal",
      "&&": "and",
      "||": "or"
    }
    if (evaluable.type === "block") {
      if (evaluable.valueType === "Boolean")
        return `${evaluable.variable.name} is ${evaluable.value ? evaluable.operator === "==" ? "detected" : "not detected" : evaluable.operator === "==" ? "not detected" : "detected"}`
      return `${evaluable.variable.name}'s value is ${operatorToString[evaluable.operator]} to ${evaluable.value}`
    }
    else if (evaluable.type === "expression") {
      if (evaluable.evaluable[0].type === "expression" && evaluable.evaluable[1].type === "block")
        return `${this.evaluableToSentence(evaluable.evaluable[1])} ${operatorToString[evaluable.operator]} ${evaluable.operator === "&&" && evaluable.evaluable[0].type === "expression" && evaluable.evaluable[0].operator === "||" ? "either, " : ""}${this.evaluableToSentence(evaluable.evaluable[0])}`
      else
        return `${this.evaluableToSentence(evaluable.evaluable[0])} ${operatorToString[evaluable.operator]} ${evaluable.operator === "&&" && evaluable.evaluable[1].type === "expression" && evaluable.evaluable[1].operator === "||" ? "either, " : ""}${this.evaluableToSentence(evaluable.evaluable[1])}`
    }
  }

  commandToSentence(command) {
    let commandObject = null
    command.actuator.commands.forEach(com => {
      if (com._id === command.commandId) commandObject = com
    })
    if (commandObject !== null) {
      if (commandObject.type === "switch") {
        return `Turn ${command.argument === "on" ? "on" : "off"} the ${commandObject.name} of the ${command.actuator.name}.`
      }
      else if (commandObject.type === "slider") {
        return `Set the ${commandObject} of the ${command.actuator.name} to ${command.argument}.`
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
    return this.state.fetched
      ? <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }} >
        <ScrollView>
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
          <View style={{ marginTop: 20 }}>
            {this.props.behaviors.map(behavior =>
              <TouchableHighlight
                onPress={() => 0}
                key={behavior._id}
                style={{
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  alignItems: "center",
                  flex: 1,
                  width: '90%',
                  alignSelf: "center",
                  backgroundColor: this.props.theme.current["secondaryScreenBackground"],
                  shadowColor: this.props.theme.current["textColor"],
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                  marginBottom: 10
                }}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <View
                    style={{ marginBottom: 5, flex: 1 }}>
                    <Text style={{ alignSelf: "center", marginBottom: 2 }} h4>When</Text>
                    <View>
                      <Divider style={{ alignSelf: "center", backgroundColor: 'lightgrey', width: "90%", marginBottom: 4 }} />
                    </View>
                    <View style={{ width: "95%" }}>
                      <Text style={{ textAlign: "justify" }}>{this.evaluableToSentence(behavior.evaluable)}</Text>
                    </View>
                  </View>
                  <View
                    style={{ flex: 1, marginBottom: 3 }}>
                    <Text style={{ alignSelf: "center", marginBottom: 2 }} h4>Then</Text>
                    <View>
                      <Divider style={{ alignSelf: "center", backgroundColor: 'lightgrey', width: "90%", marginBottom: 4 }} />
                    </View>
                    <View style={{ width: "95%" }}>
                      <Text style={{ textAlign: "justify" }}>{this.commandToSentence(behavior.command)}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          </View>
        </ScrollView>
        <Button
          title="Add behavior"
        />
      </View>
      : <Loader></Loader>
  }
}