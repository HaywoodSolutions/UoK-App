import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StudentRadioScreen from '../screens/StudentRadioScreen';
import {THEME_COLOR} from "../lib/Constants";
import CustomHeader from "../components/CustomHeader";

export default createStackNavigator(
    {
      Home: {
        screen: StudentRadioScreen
      },
    },
    {
      initialRouteName: 'Home',
       navigationOptions: {
        headerStyle: {
          backgroundColor: THEME_COLOR
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff",
          zIndex: 1,
          fontSize: 18,
          lineHeight: 23
        },
        headerTintColor: "#fff",
        animationEnabled: true
      }
    }
);
