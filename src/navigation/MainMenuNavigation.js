import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import {THEME_COLOR} from "../lib/Constants";
import {Entypo} from '@expo/vector-icons';
import { Button, TouchableOpacity, View } from 'react-native';


const DrawerButton = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => {props.navigation.openDrawer()}}>
        <Entypo name="chevron-thin-left" size={23} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};


export default createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: (navigation) => ({
          headerTitle: "KentFlix",
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth:0
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20
          },
          headerTintColor: 'white'
        })
      },
    },
    {
      initialRouteName: 'Home',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: false,
      tabBarOptions: {
        showLabel: true,
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      }
    }
);
