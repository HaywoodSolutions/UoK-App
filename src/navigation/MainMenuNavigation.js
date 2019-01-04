import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import {THEME_COLOR} from "../lib/Constants";

export default createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
          headerTitle: "KentFlix",
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
      initialRouteName: 'Home',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: true,
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      }
    }
);
