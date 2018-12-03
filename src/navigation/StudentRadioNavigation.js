import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StudentRadioScreen from '../screens/StudentRadioScreen';
import {THEME_COLOR} from "../lib/Constants";
import CustomHeader from "../components/CustomHeader";

export default createStackNavigator(
    {
      Home: {
        screen: StudentRadioScreen,
        navigationOptions: () => ({
          header: null
        }),
      },
    },
    {
      initialRouteName: 'Home',
       navigationOptions: {
        header: null
      }
    }
);
