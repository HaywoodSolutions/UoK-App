import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import TimetableScreen from '../screens/TimetableScreen';
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
  headerCenter: (<Button
                title="< Go Back"
                color="#fff"
                onPress={() => navigation.goBack(null)} />),
  headerLeft: (<Button
                title="< Go Back"
                color="#fff"
                onPress={() => navigation.goBack(null)} />),
})

export default createBottomTabNavigator(
    {
      Timetable: {
        screen: TimetableScreen,
        navigationOptions: navigationOptions
      }
    },
    {
      initialRouteName: 'Timetable',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: true,
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      },
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
);
