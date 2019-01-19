import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Text from '../components/StyledText';
import TabBarIcon from '../components/TabBarIcon';
import Icons from '../constants/Icons';
import AutomationScreen from '../containers/AutomationScreen.container';
import FastAccessScreen from '../containers/FastAccessScreen.container';
import DetailActuator from '../containers/ObjectScreens/DetailActuator.container';
import DetailSensor from '../containers/ObjectScreens/DetailSensor.container';
import ObjectScreen from '../containers/ObjectScreens/ObjectScreen.container';
import PeopleScreen from '../containers/PeopleScreen.container';
import SettingsScreen from '../containers/SettingsScreen.container';
import SocketService from '../SocketService';

export default class DeviceScreen extends React.Component {

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
      SocketService.subscribe(informations.currentDevice._id)
    }).catch(err => {
      this.props.removeToken()
    })
  }

  componentWillUnmount() {
    SocketService.unsubscribe(this.props.currentDevice._id)
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
        DetailActuator: DetailActuator,
        DetailSensor: DetailSensor
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
        DetailActuator: DetailActuator,
        DetailSensor: DetailSensor
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
          initialRouteName: 'FastAccessStack'
        })
      return <Navigator></Navigator>
    }
    else {
      return <View><Text>Loading...</Text></View>
    }
  }

}