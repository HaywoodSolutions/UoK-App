import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ElectionsHomeScreen from '../../screens/Elections/HomeScreen';
import NominationScreen from '../../screens/Elections/NominationScreen';
import SignInScreen from '../../screens/Elections/SignInScreen';

import {THEME_COLOR} from "../../lib/Constants";
import BackButton from '../../components/BackButton';

export default createStackNavigator(
    {
      Home: {
        screen: ElectionsHomeScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Elections`,
          headerStyle: {
            backgroundColor: '#CA2928',
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
      Nomination: {
        screen: NominationScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Nominate Yourself`,
          headerStyle: {
            backgroundColor: '#CA2928',
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
      SignIn: {
        screen: SignInScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Elections Sign In`,
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
      swipeEnabled: true,
      animationEnabled: true
    }
);
