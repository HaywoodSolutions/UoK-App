import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InquireViewCategoryScreen from '../screens/InquireViewCategoryScreen';
import InquireCategories from '../screens/InquireCategoriesScreen';
import {THEME_COLOR} from "../lib/Constants";
import BackButton from '../components/BackButton';
import { Image } from 'react-native';

const navigationOptions = ({ navigation }) => ({
  title: `InQuire Media`,
  headerStyle: {
    backgroundColor: THEME_COLOR,
    borderBottomWidth: 0
  },
  headerTitle: (
    <Image source={require('../../assets/inquire-christmas-logo.png')} style={{width: 150, height: 30, resizeMode: 'contain' }}/>
  ),
  headerTintColor: 'white',
  gesturesEnabled: true,
  headerLeft: BackButton(navigation)
});

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
      swipeEnabled: true
    }
);
