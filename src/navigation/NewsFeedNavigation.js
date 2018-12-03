import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import {THEME_COLOR} from "../lib/Constants";

export default createBottomTabNavigator(
    {
      NewsFeed: {
        screen: NewsFeedScreen,
      },
    },
    {
      initialRouteName: 'NewsFeed',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: true,
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      },
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
);
