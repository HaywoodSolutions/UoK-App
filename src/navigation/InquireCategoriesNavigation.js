import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InquireViewCategoryScreen from '../screens/InquireViewCategoryScreen';
import InquireCategories from '../screens/InquireCategoriesScreen';
import {THEME_COLOR} from "../lib/Constants";
import { Button } from 'react-native';

const navigationOptions = ({ navigation }) => ({
  headerTitle: "View Category",
  headerBackTitle: `Home`,
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
                title="< Go Back"
                color="#fff"
                onPress={() => navigation.goBack(null)} />),
})

export default createStackNavigator(
    {
      CategoryContent: {
        screen: InquireViewCategoryScreen,
        navigationOptions: navigationOptions
      }
    },
    {
      initialRouteName: 'CategoryContent',
      animationEnabled: true,
      swipeEnabled: true,
      defaultNavigationOptions: {
      }
    }
);
