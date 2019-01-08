import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PCAvailablilityScreen from '../screens/PCAvailablilityScreen';
import {THEME_COLOR} from "../lib/Constants";
import BackButton from '../components/BackButton';

export default createStackNavigator(
    {
      Home: {
        screen: PCAvailablilityScreen,
        navigationOptions: ({ navigation }) => ({
          title: `PC Availability`,
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
      initialRouteName: 'Home',
      animationEnabled: true,
      swipeEnabled: false
    }
);
