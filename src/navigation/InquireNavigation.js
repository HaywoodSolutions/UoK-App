import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InquireHome from './InquireHomeNavigation';
import InquireCategories from './InquireCategoriesNavigation';
import {THEME_COLOR} from "../lib/Constants";
import { Button } from 'react-native';

const navigationOptions = ({ navigation }) => ({
  headerTitle: "InQuire Media",
  headerBackTitle: `InQuire`,
  headerStyle: {
    backgroundColor: THEME_COLOR,
    borderBottomWidth:0
  },
  headerTitleStyle: {
    color: '#fff',
    fontSize: 20
  },
  headerTintColor: 'white',
  gesturesEnabled: true,
  headerLeft: (<Button
                title="< Home"
                color="#fff"
                onPress={() => navigation.goBack(null)} />),
})

export default createStackNavigator(
    {
      Home: {
        screen: InquireHome,
        navigationOptions: navigationOptions
      },
      ViewCategories: {
        screen: InquireCategories,
        navigationOptions: {
          header: null
        }
      },
    },
    {
      initialRouteName: 'Home',
      swipeEnabled: true,
      animationEnabled: true
    }
);
