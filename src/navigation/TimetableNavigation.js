import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import TimetableScreen from '../screens/TimetableScreen';
import {THEME_COLOR} from "../lib/Constants";

export default createBottomTabNavigator(
    {
      Timetable: {
        screen: TimetableScreen,
      }
    },
    {
      initialRouteName: 'Timetable',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: true,
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      },
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
);
