import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LecturesNavigation from './LecturesNavigation';
import TimetableNavigation from './TimetableNavigation';

export default createStackNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      Lectures: {
        screen: LecturesNavigation,
        navigationOptions: {
          gesturesEnabled: true
        }
      },
      Timetable: {
        screen: TimetableNavigation,
        navigationOptions: {
          gesturesEnabled: true
        }
      }
    },
    {
      mode: "modal",
      initialRouteName: "Home",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }
    }
);

/*
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
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: false,
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray'
      }
    }
);
*/