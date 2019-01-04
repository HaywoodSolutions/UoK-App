import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import SessionScreen from '../screens/NoteScreen';
import LecturesScreen from '../screens/LecturesScreen';
import LecturesSelectModuleScreen from '../screens/LecturesSelectModuleScreen';
import {THEME_COLOR} from "../lib/Constants";

export default createBottomTabNavigator(
    {
      LecturesSelectModule: {
        screen: LecturesSelectModuleScreen
      },
      Lectures: {
        screen: LecturesScreen,
      },
      Session: {
        screen: SessionScreen,
      }
    },
    {
      initialRouteName: 'LecturesSelectModule',
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
