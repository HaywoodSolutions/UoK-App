import React from 'react';
import { createStackNavigator } from 'react-navigation';

import ViewArticleListScreen from '../../screens/Articles/ViewArticleListScreen';
import EditArticleScreen from '../../screens/Articles/EditArticleScreen';
import CreateArticleScreen from '../../screens/Articles/CreateArticleScreen';
import ViewArticleScreen from '../../screens/Articles/ViewArticleScreen';

import {THEME_COLOR} from "../../lib/Constants";
import CustomHeader from "../../components/CustomHeader";

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
        navigationOptions: () => ({
          header: null
        }),
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
      navigationOptions: {
        header: null
      },
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: 'lightgray',
        inactiveTintColor: 'grey',
        style: {
			backgroundColor: '#CB2228'
		}
      },
      backBehavior: 'none'
    }
);
