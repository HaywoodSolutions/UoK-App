import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import ContentScreen from '../../screens/Societies/ManagePage/ContentScreen';
import RearrangeScreen from '../../screens/Societies/ManagePage/RearrangeScreen';
import BackButton from '../../components/BackButton';
import {THEME_COLOR} from "../../lib/Constants";


export default createBottomTabNavigator(
    {
      PageContent: {
        screen: ContentScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Society Page Content`,
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
      RearrangePage: {
        screen: RearrangeScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Rearrange Society Page`,
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
      initialRouteName: 'PageContent',
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