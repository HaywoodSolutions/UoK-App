import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StageCoachScreen from '../screens/StageCoachScreen';
import StageCoachSelectLocationScreen from '../screens/StageCoachSelectLocationScreen.js';
import StageCoachViewRouteScreen from '../screens/StageCoachViewRouteScreen.js';
import BackButton from '../components/BackButton';
import {THEME_COLOR} from "../lib/Constants";

import { TouchableOpacity, View } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';

const CloseButton = function(navigation) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <View style={{marginRight: 10}}>
        <EvilIcons name="close" size={28} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}


export default createStackNavigator(
    {
      StageCoach: {
        screen: StageCoachScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Buses`,
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
      SelectLocation: {
        screen: StageCoachSelectLocationScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Select a Location`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: '#fff'
          },
          headerTintColor: 'white',
          gesturesEnabled: true,
          headerLeft: null,
          headerRight: CloseButton(navigation)
        })
      },
      ViewRoute: {
        screen: StageCoachViewRouteScreen,
        navigationOptions: ({ navigation }) => ({
          title: `View Route`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: '#fff'
          },
          headerTintColor: 'white',
          gesturesEnabled: true,
          headerLeft: null,
          headerRight: CloseButton(navigation)
        })
      }
    },
    {
      initialRouteName: 'StageCoach',
      animationEnabled: true,
      swipeEnabled: false,
      mode: 'modal',
      cardStyle:{
          backgroundColor:"transparent",
          opacity:0.99
      }
    }
);
