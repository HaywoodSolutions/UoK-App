import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SocietiesScreen from '../screens/Societies/HomeScreen';
import {THEME_COLOR} from "../lib/Constants";
import CustomHeader from "../components/CustomHeader";

export default createStackNavigator(
    {
      Home: {
        screen: SocietiesScreen,
        navigationOptions: () => ({
          header: null
        }),
      }
    },
    {
      initialRouteName: 'Home',
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
