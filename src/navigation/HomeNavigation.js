import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LecturesNavigation from './LecturesNavigation';
import TimetableNavigation from './TimetableNavigation';
import NewsFeedNavigation from './NewsFeedNavigation';
import StudentRadioNavigation from './StudentRadioNavigation';
import InquireNavigation from './InquireNavigation';
//import CustomHeader from "../components/CustomHeader";
import {THEME_COLOR} from "../lib/Constants";

export default createStackNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
          headerTitle: "KentFlix",
          headerBackTitle: `Home`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth:0
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20
          },
          headerTintColor: 'white',
          gesturesEnabled: true
        }),
      },
      Lectures: {
        screen: LecturesNavigation,
        navigationOptions: () => ({
          title: `Lectures`,
          headerBackTitle: `Lectures`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth:0
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: 'white',
          gesturesEnabled: true
        }),
      },
      Timetable: {
        screen: TimetableNavigation,
        navigationOptions: () => ({
          title: `Timetable`,
          headerBackTitle: `Timetable`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth:0
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: 'white',
          gesturesEnabled: true
        }),
      },
      NewsFeed: {
        screen: NewsFeedNavigation,
        navigationOptions: () => ({
          title: `Newsfeed`,
          headerBackTitle: `Newsfeed`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth:0
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: 'white',
          gesturesEnabled: true
        }),
      },
      StudentRadio: {
        screen: StudentRadioNavigation,
        navigationOptions: () => ({
          title: `SU Radio`,
          headerBackTitle: `SU Radio`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth:0
          },
          headerTitleStyle: {
            color: '#fff',
          },
          headerTintColor: 'white',
          gesturesEnabled: true
        }),
      },
      Inquire: {
        screen: InquireNavigation,
        navigationOptions: () => ({
          header: null
        }),
      }
    },
    {
      mode: "card",
      initialRouteName: "Home",
      defaultNavigationOptions: {
        title: `Lectures1`,
        headerBackTitle: `Lectures2`,
        headerStyle: {
          backgroundColor: THEME_COLOR,
        },
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: 'white'
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