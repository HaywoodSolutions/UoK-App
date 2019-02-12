import React from 'react';
import { createStackNavigator } from 'react-navigation';

import ViewArticleListScreen from '../../screens/Articles/ViewArticleListScreen';
import EditArticleScreen from '../../screens/Articles/EditArticleScreen';
import CreateArticleScreen from '../../screens/Articles/CreateArticleScreen';
import ViewArticleScreen from '../../screens/Articles/ViewArticleScreen';

import BackButton from '../../components/BackButton';

import { THEME_COLOR } from "../../lib/Constants";

export default createStackNavigator(
    {
      ViewArticleList: {
        screen: ViewArticleListScreen,
        navigationOptions: () => ({
          header: null
        }),
      },
      ViewArticle: {
        screen: ViewArticleScreen,
        navigationOptions: () => ({
          header: null
        }),
      },
      CreateArticle: {
        screen: CreateArticleScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Create Article`,
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
      EditArticle: {
        screen: EditArticleScreen,
        navigationOptions: () => ({
          header: null
        }),
      },
    },
    {
      initialRouteName: 'CreateArticle',
      animationEnabled: true,
      swipeEnabled: true,
      animationEnabled: true,
      backBehavior: 'none'
    }
);
