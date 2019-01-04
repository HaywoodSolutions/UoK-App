import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import StudentRadioScreen from '../screens/StudentRadioScreen';
import StudentRadioPlayerScreen from '../screens/StudentRadioPlayerScreen';
import {THEME_COLOR} from "../lib/Constants";
import CustomHeader from "../components/CustomHeader";

export default createBottomTabNavigator(
    {
      Home: {
        screen: StudentRadioScreen,
        navigationOptions: () => ({
          header: null
        }),
      },
      Player: {
        screen: StudentRadioPlayerScreen,
        navigationOptions: () => ({
          header: null
        }),
      },
    },
    {
      initialRouteName: 'Home',
      navigationOptions: {
        header: null
      },
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'lightgray',
        inactiveTintColor: 'grey',
        style: {
			backgroundColor: '#CB2228'
		}
      },
      backBehavior: 'none'
    }
);
