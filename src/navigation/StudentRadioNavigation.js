import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StudentRadioHomeNavigation from './StudentRadioHomeNavigation';
import StudentRadioPlayerScreen from '../screens/StudentRadioPlayerScreen';
import BackButton from '../components/BackButton';
import {THEME_COLOR} from "../lib/Constants";

export default createStackNavigator(
    {
      Home: {
        screen: StudentRadioHomeNavigation,
        navigationOptions: ({ navigation }) => ({
          title: `Canterbury Student Radio`,
          headerStyle: {
            backgroundColor: '#CB2228',
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
      initialRouteName: 'Home',
      animationEnabled: true,
      swipeEnabled: true,
      animationEnabled: true
    },
);
