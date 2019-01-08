import { createStackNavigator } from 'react-navigation';


import React from 'react';

import { Button, TouchableOpacity, View, Text } from 'react-native';
import MainMenu from './MainMenuNavigation';
import LecturesNavigation from './LecturesNavigation';
import TimetableNavigation from './TimetableNavigation';
import NewsFeedNavigation from './NewsFeedNavigation';
import StudentRadioNavigation from './StudentRadioNavigation';
import InquireNavigation from './InquireNavigation';
import StageCoachNavigation from './StageCoachNavigation';
import SettingsScreen from '../screens/SettingsScreen';
import PCAvailabilityNavigation from './PCAvailabilityNavigation';
import SDSNavigation from './SDSNavigation';
import TechSupportNavigation from './TechSupportNavigation';
import ArticleNavigation from './Articles/ArticleNavigation';

import SocietiesNavigation from './SocietiesNavigation';
import Title from '../components/Title';
import {THEME_COLOR} from "../lib/Constants";

export default createStackNavigator({
    Home: {
      screen: MainMenu,
      navigationOptions: () => ({
        header: null
      })
    },
    Lectures: {
      screen: LecturesNavigation,
      navigationOptions: () => ({
        header: null
      })
    },
    PCAvailability: {
      screen: PCAvailabilityNavigation,
      navigationOptions: () => ({
        header: null
      })
    },
    Timetable: {
      screen: TimetableNavigation,
      navigationOptions: () => ({
        header: null
      })
    },
    NewsFeed: {
      screen: NewsFeedNavigation,
      navigationOptions: () => ({
        header: null
      })
    },
    StudentRadio: {
      screen: StudentRadioNavigation,
      navigationOptions: () => ({
        header: null
      })
    },
    Inquire: {
      screen: InquireNavigation,
      navigationOptions: () => ({
        header: null
      }),
    },
    StageCoach: {
      screen: StageCoachNavigation,
      navigationOptions: () => ({
        header: null
      }),
    },
    Societies: {
      screen: SocietiesNavigation,
      navigationOptions: () => ({
        header: null
      }),
    },
    TechSupport: {
      screen: TechSupportNavigation,
      navigationOptions: () => ({
        header: null
      }),
    },
    SDS: {
      screen: SDSNavigation,
      navigationOptions: () => ({
        header: null
      }),
    },
    Articles: {
      screen: ArticleNavigation,
      navigationOptions: () => ({
        header: null
      }),
    },
    Settings: {
      screen: SettingsScreen,
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