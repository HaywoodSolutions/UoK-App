import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import BackButton from '../components/BackButton';
import {THEME_COLOR} from "../lib/Constants";

export default createStackNavigator(
    {
      NewsFeed: {
        screen: NewsFeedScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Newsfeed`,
          headerBackTitle: `Newsfeed`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: '#fff'
          },
          headerTintColor: 'white',
          gesturesEnabled: true,
          headerLeft: BackButton(navigation)
        })
      },
    },
    {
      initialRouteName: 'NewsFeed',
      animationEnabled: true
    }
);
