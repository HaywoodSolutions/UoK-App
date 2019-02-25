import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../../screens/Meetings/ListMeetingsScreen';
import CreateMeetingScreen from '../../screens/Meetings/CreateMeetingScreen';
import {THEME_COLOR} from "../../lib/Constants";
import BackButton from '../../components/BackButton';

import { TouchableOpacity, View } from 'react-native'
import {Entypo} from '@expo/vector-icons';

const NewButton = function(navigation) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ScheduleMeeting');
      }}>
      <View style={{marginRight: 20}}>
        <Entypo name="plus" size={23} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}

export default createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Meetings`,
          headerStyle: {
            backgroundColor: THEME_COLOR,
            borderBottomWidth: 0
          },
          headerTitleStyle: {
            color: '#fff'
          },
          headerTintColor: 'white',
          gesturesEnabled: true,
          headerLeft: BackButton(navigation),
          headerRight: NewButton(navigation)
        })
      },
      ScheduleMeeting: {
        screen: CreateMeetingScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Schedule Meeting`,
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
      initialRouteName: 'Home',
      animationEnabled: true,
      swipeEnabled: false
    }
);
