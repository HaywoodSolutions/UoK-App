import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InquireHome from './InquireHomeNavigation';
import InquireCategories from './InquireCategoriesNavigation';
import InquireViewArticle from '../screens/InquireViewArticleScreen';
import {THEME_COLOR} from "../lib/Constants";
import { Button, Image } from 'react-native';

const navigationOptions = ({ navigation }) => ({
  headerTitle: "InQuire Media",
  headerBackTitle: `InQuire`,
  headerStyle: {
    backgroundColor: THEME_COLOR,
    borderBottomWidth:0
  },
  headerTitle: (
    <Image source={require('../../assets/inquire-christmas-logo.png')} style={{width: 150, height: 30, resizeMode: 'contain' }}/>
  ),
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
      ViewArticle: {
        screen: InquireViewArticle,
        navigationOptions: navigationOptions
      },
    },
    {
      initialRouteName: 'Home',
      swipeEnabled: true,
      animationEnabled: true
    }
);
