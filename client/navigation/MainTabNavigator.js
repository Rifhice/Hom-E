import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { withNamespaces } from 'react-i18next'
import { withColors, withThemeChanger } from '../colorTheme'
import TabBarIcon from '../components/TabBarIcon'
import PeopleScreen from '../containers/PeopleScreen.container';
import FastAccessScreen from '../screens/FastAccessScreen';
import AutomationScreen from '../screens/AutomationScreen';
import ObjectScreen from '../screens/ObjectScreen';
import SettingsScreen from '../containers/SettingsScreen.container';
import Colors from '../constants/Colors';

class Component extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { t } = this.props
    const PeopleStack = createStackNavigator({
      People: PeopleScreen,
    });

    PeopleStack.navigationOptions = {
      tabBarLabel: this.props.t('people'),
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
        activeTintColor: Colors.c('tintColor'),
      },
    };

    const ObjectStack = createStackNavigator({
      Object: ObjectScreen,
    });

    ObjectStack.navigationOptions = {
      tabBarLabel: 'Objects',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
              ? `ios-bulb`
              : 'md-bulb'
          }
        />
      ),
      tabBarOptions: {
        activeTintColor: Colors.tintColor,
      },
    };

    const FastAccessStack = createStackNavigator({
      FastAcess: FastAccessScreen,
    });

    FastAccessStack.navigationOptions = {
      tabBarLabel: 'Favourites',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-star-outline' : 'md-star-outline'}
        />
      ),
      tabBarOptions: {
        activeTintColor: Colors.tintColor,
      },
    };

    const AutomationStack = createStackNavigator({
      Automation: AutomationScreen,
    });

    AutomationStack.navigationOptions = {
      tabBarLabel: 'Automations',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'}
        />
      ),
      tabBarOptions: {
        activeTintColor: Colors.tintColor,
      },
    };

    const SettingsStack = createStackNavigator({
      Settings: SettingsScreen,
    });

    SettingsStack.navigationOptions = {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
      ),
      tabBarOptions: {
        activeTintColor: Colors.tintColor,
      },
    };
    const Navigator = createSwitchNavigator({
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Main: createBottomTabNavigator({
        PeopleStack,
        ObjectStack,
        FastAccessStack,
        AutomationStack,
        SettingsStack
      },
        {
          initialRouteName: 'FastAccessStack',
        }),
    })
    return <Navigator></Navigator>
  }
}

export default withColors(withNamespaces()(Component))