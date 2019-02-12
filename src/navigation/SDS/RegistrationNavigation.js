import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../../screens/SDS/Registration/HomeScreen';
import ReturningRegistrationScreen from '../../screens/SDS/Registration/ReturningRegistrationScreen';
import ModuleRegistrationScreen from '../../screens/SDS/Registration/ModuleRegistrationScreen';


import {THEME_COLOR} from "../../lib/Constants";
import BackButton from '../../components/BackButton';

export default createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          title: `SDS`,
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
      ReturningRegistration: {
        screen: ReturningRegistrationScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Returning Registration`,
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
      ModuleRegistration: {
        screen: ModuleRegistrationScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Module Registration`,
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
