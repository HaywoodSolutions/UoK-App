import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import SocietiesScreen from '../../screens/Societies/HomeScreen';
import SocietiesCategoriesScreen from '../../screens/Societies/SocietiesCategoriesScreen';
import BackButton from '../../components/BackButton';
import {THEME_COLOR} from "../../lib/Constants";


export default createBottomTabNavigator(
    {
      MySocieties: {
        screen: SocietiesScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Societies`,
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
      Events: {
        screen: SocietiesScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Events`,
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
      AllSocieties: {
        screen: SocietiesCategoriesScreen,
        navigationOptions: ({ navigation }) => ({
          title: `All Societies`,
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
      }
    },
    {
      initialRouteName: 'AllSocieties',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: true,
      animationEnabled: true,
      backBehavior: 'none',
      tabBarOptions: {
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      }
    }
);