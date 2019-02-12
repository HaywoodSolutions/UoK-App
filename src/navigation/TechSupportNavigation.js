import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TechSupportScreen from '../screens/TechSupport/HomeScreen';
import {THEME_COLOR} from "../lib/Constants";
import BackButton from '../components/BackButton';
import { Image } from 'react-native';

const navigationOptions = ({ navigation }) => ({
  title: `Tech Support`,
  headerStyle: {
    backgroundColor: THEME_COLOR,
    borderBottomWidth: 0
  },
  headerTintColor: 'white',
  gesturesEnabled: true,
  headerLeft: BackButton(navigation)
});

export default createStackNavigator(
    {
      Home: {
        screen: TechSupportScreen,
        navigationOptions: navigationOptions
      }
    },
    {
      initialRouteName: 'Home',
      animationEnabled: true,
      swipeEnabled: true
    }
);
