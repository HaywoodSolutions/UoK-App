import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SessionScreen from '../screens/NoteScreen';
import LecturesScreen from '../screens/LecturesScreen';
import LecturesSelectModuleScreen from '../screens/LecturesSelectModuleScreen';
import LecturesViewModuleScreen from '../screens/LecturesViewModuleScreen';
import {THEME_COLOR} from "../lib/Constants";
import BackButton from '../components/BackButton';

export default createStackNavigator(
    {
      SelectModule: {
        screen: LecturesSelectModuleScreen,
        navigationOptions: ({ navigation }) => ({
          headerTransparent: true,
          title: `Lecture View`,
          headerStyle: {
            backgroundColor: 'rgba(9, 0, 10, 0.95)',
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
      ViewModule: {
        screen: LecturesViewModuleScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Lecture View`,
          headerStyle: {
            backgroundColor: 'rgba(9, 0, 10, 0.95)',
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
    },
    {
      initialRouteName: 'SelectModule',
      animationEnabled: true,
      swipeEnabled: false
    }
);
