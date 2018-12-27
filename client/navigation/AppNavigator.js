import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import { withNamespaces } from 'react-i18next'
import { withTheme, withChangeTheme } from '../ThemeProvider'
import TabBarIcon from '../components/TabBarIcon'
import PeopleScreen from '../containers/PeopleScreen.container';
import FastAccessScreen from '../containers/FastAccessScreen.container';
import AutomationScreen from '../containers/AutomationScreen.container';
import ObjectScreen from '../containers/ObjectScreens/ObjectScreen.container';
import SettingsScreen from '../containers/SettingsScreen.container';
import DetailObjectScreen from '../containers/ObjectScreens/DetailObjectScreen.container'
import SocketService from '../SocketService'
import Icons from '../constants/Icons'

export default class Component extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fetched: false,
      languageSetup: false,
      themeSetup: false,
      informations: false
    }
  }

  componentDidMount() {
    this.props.getInformation().then((informations) => {
      this.setState({ fetched: true, informations })
      this.props.i18n.changeLanguage(informations.language, () => this.setState({ languageSetup: true }))
      this.props.changeTheme(informations.theme, () => this.setState({ themeSetup: true }))
      SocketService.subscribe(informations.currentDevice)
    }).catch(err => {
      this.props.removeToken()
    })
  }

  componentWillUnmount() {
    SocketService.unsubscribe(this.props.currentDevice)
  }

  render() {
    const { t, theme } = this.props
    if (this.state.languageSetup && this.state.themeSetup) {
      const PeopleStack = createStackNavigator({
        People: PeopleScreen,
      });

      PeopleStack.navigationOptions = {
        tabBarLabel: t('peoples'),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            theme={theme}
            name={Icons.peoples.name}
            type={Icons.peoples.type}
          />
        ),
        tabBarOptions: {
          activeTintColor: theme.current['tintColor'],
        },
      };

      const ObjectStack = createStackNavigator({
        Object: ObjectScreen,
        DetailObject: DetailObjectScreen
      });

      ObjectStack.navigationOptions = {
        tabBarLabel: t('objects'),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            theme={theme}
            name={Icons.lightbulb_off.name}
            type={Icons.lightbulb_off.type}
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
            name={Icons.star.name}
            type={Icons.star.type}
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
            name={Icons.cogs.name}
            type={Icons.cogs.type}
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
            name={Icons.settings.name}
            type={Icons.settings.type}
          />
        ),
        tabBarOptions: {
          activeTintColor: theme.current['tintColor'],
        },
      };

      const Navigator = createBottomTabNavigator({
        PeopleStack,
        ObjectStack,
        FastAccessStack,
        AutomationStack,
        SettingsStack
      },
        {
          initialRouteName: 'FastAccessStack',
        })
      return <Navigator></Navigator>
    }
    else {
      return <View><Text>Loading...</Text></View>
    }
  }

}