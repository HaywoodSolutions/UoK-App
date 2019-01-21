import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabsNavigation from './DetailsAndStudyNavigation';
import SignInScreen from '../../screens/SDS/SignInScreen';


import {THEME_COLOR} from "../../lib/Constants";
import BackButton from '../../components/BackButton';

export default createStackNavigator(
    {
      SignIn: {
        screen: SignInScreen,
        navigationOptions: ({ navigation }) => ({
          title: `SDS Sign In`,
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
      Tabs: {
        screen: TabsNavigation,
        navigationOptions: ({ navigation }) => ({
          header: null
        })
      }
    },
    {
      initialRouteName: 'SignIn',
      animationEnabled: true,
      swipeEnabled: false,
      backBehavior: 'none'
    }
);
