import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabsNavigation from './TabsNavigation';
import SocietiesViewCategory from '../../screens/Societies/SocietiesViewCategoryScreen';
import ViewSociety from '../../screens/Societies/ViewSocietyScreen';
import ManageSocietyPage from './ManageSocietyPageNavigation';

import {THEME_COLOR} from "../../lib/Constants";
import BackButton from '../../components/BackButton';

export default createStackNavigator(
    {
      Home: {
        screen: TabsNavigation,
        navigationOptions: ({ navigation }) => ({
          title: `Societies`,
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
      ViewSocietyCategory: {
        screen: SocietiesViewCategory,
        navigationOptions: ({ navigation }) => ({
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
      ViewSociety: {
        screen: ViewSociety,
        navigationOptions: ({ navigation }) => ({
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
      ManageSociety: {
        screen: ManageSocietyPage,
        navigationOptions: ({ navigation }) => ({
          title: "Edit Society Page",
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
      initialRouteName: 'Home',
      swipeEnabled: true,
      animationEnabled: true
    }
);
