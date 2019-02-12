import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import InquireScreen from '../screens/InquireScreen';
import InquireCategories from '../screens/InquireCategoriesScreen';
import InquireAbout from '../screens/InquireAboutScreen';
import {THEME_COLOR} from "../lib/Constants";

export default createBottomTabNavigator(
    {
      Featured: {
        screen: InquireScreen,
        navigationOptions: {
          header: 'null'
        }
      },
      Categories: {
        screen: InquireCategories,
        navigationOptions: {
          header: null
        }
      },
      About: {
        screen: InquireAbout,
        navigationOptions: {
          header: null
        }
      },
    },
    {
      initialRouteName: 'Featured',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      },
      backBehavior: 'none'
    }
);
