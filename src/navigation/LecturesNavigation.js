import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import SessionScreen from '../screens/NoteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LecturesScreen from '../screens/LecturesScreen';
import {THEME_COLOR} from "../lib/Constants";

export default createBottomTabNavigator(
    {
      Lectures: {
        screen: LecturesScreen,
      },
      Session: {
        screen: SessionScreen,
      },
      Profile: {
        screen: ProfileScreen,
      },
    },
    {
      initialRouteName: 'Lectures',
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
