import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { withNamespaces } from 'react-i18next'
import { withTheme, withChangeTheme } from '../ThemeProvider'
import TabBarIcon from '../components/TabBarIcon'
import PeopleScreen from '../containers/PeopleScreen.container';
import FastAccessScreen from '../screens/FastAccessScreen';
import AutomationScreen from '../screens/AutomationScreen';
import ObjectScreen from '../screens/ObjectScreen';
import SettingsScreen from '../containers/SettingsScreen.container';

class Component extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { t, theme } = this.props
    const PeopleStack = createStackNavigator({
      People: PeopleScreen,
    });

    PeopleStack.navigationOptions = {
      tabBarLabel: t('peoples'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          theme={theme}
          name={
            Platform.OS === 'ios'
              ? `ios-people`
              : 'md-people'
          }
        />
      ),
      tabBarOptions: {
        activeTintColor: theme.current['tintColor'],
      },
    };

    const ObjectStack = createStackNavigator({
      Object: ObjectScreen,
    });

    ObjectStack.navigationOptions = {
      tabBarLabel: t('objects'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          theme={theme}
          name={
            Platform.OS === 'ios'
              ? `ios-bulb`
              : 'md-bulb'
          }
        />
      ),
      tabBarOptions: {
        activeTintColor: theme.current['tintColor'],
      },
    };

    const FastAccessStack = createStackNavigator({
      FastAcess: FastAccessScreen,
    });

    FastAccessStack.navigationOptions = {
      tabBarLabel: t('favourites'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          theme={theme}
          name={Platform.OS === 'ios' ? 'ios-star-outline' : 'md-star-outline'}
        />
      ),
      tabBarOptions: {
        activeTintColor: theme.current['tintColor'],
      },
    };

    const AutomationStack = createStackNavigator({
      Automation: AutomationScreen,
    });

    AutomationStack.navigationOptions = {
      tabBarLabel: t('automations'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          theme={theme}
          name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'}
        />
      ),
      tabBarOptions: {
        activeTintColor: theme.current['tintColor'],
      },
    };

    const SettingsStack = createStackNavigator({
      Settings: SettingsScreen,
    });

    SettingsStack.navigationOptions = {
      tabBarLabel: t('settings'),
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          theme={theme}
          name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
      ),
      tabBarOptions: {
        activeTintColor: theme.current['tintColor'],
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

export default withTheme(withNamespaces()(Component))