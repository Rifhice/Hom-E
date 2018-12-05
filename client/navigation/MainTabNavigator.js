import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon'
import PeopleScreen from '../screens/PeopleScreen';
import FastAccessScreen from '../screens/FastAccessScreen';
import AutomationScreen from '../screens/AutomationScreen';
import ObjectScreen from '../screens/ObjectScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';

const PeopleStack = createStackNavigator({
  People: PeopleScreen,
});

PeopleStack.navigationOptions = {
  tabBarLabel: 'Peoples',
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
    activeTintColor: Colors.tintColor,
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

export default createBottomTabNavigator({
  PeopleStack,
  ObjectStack,
  FastAccessStack,
  AutomationStack,
  SettingsStack
},
  {
    initialRouteName: 'FastAccessStack',
  });
