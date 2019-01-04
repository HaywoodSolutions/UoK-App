import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TimetableScreen from '../screens/TimetableScreen';
import TimetableViewEventScreen from '../screens/TimetableViewEventScreen';
import TimetableSettingsScreen from '../screens/TimetableSettingsScreen';
import TimetableSetiCalURLScreen from '../screens/TimetableSetiCalURLScreen';
import BackButton from '../components/BackButton';
import SettingsButton from '../components/SettingsButton';
import {THEME_COLOR} from "../lib/Constants";

export default createStackNavigator(
    {
      Timetable: {
        screen: TimetableScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Timetable`,
          headerBackTitle: `Timetable`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: '#fff'
          },
          headerTintColor: 'white',
          gesturesEnabled: true,
          headerLeft: BackButton(navigation),
          headerRight: SettingsButton(navigation)
        })
      },
      SetURL: {
        screen: TimetableSetiCalURLScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Set Timetable iCal`,
          headerBackTitle: `Set Timetable iCal`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: '#fff'
          },
          headerTintColor: 'white',
          gesturesEnabled: true,
          headerLeft: BackButton(navigation)
        })
      },
      ViewEvent: {
        screen: TimetableViewEventScreen
      },
      Settings: {
        screen: TimetableSettingsScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Timetable Settings`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: '#fff'
          },
          headerTintColor: 'white',
          gesturesEnabled: true,
          headerLeft: BackButton(navigation)
        })
      }
    },
    {
      mode: 'modal',
      initialRouteName: 'Timetable',
      animationEnabled: true,
      swipeEnabled: false
    }
);
