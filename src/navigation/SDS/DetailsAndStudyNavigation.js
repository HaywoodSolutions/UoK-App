import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../../screens/SDS/DetailsAndStudy/HomeScreen';
import AttendanceScreen from '../../screens/SDS/DetailsAndStudy/AttendanceScreen';
import DeadlinesScreen from '../../screens/SDS/DetailsAndStudy/MyDeadlinesScreen';
import MyDetailsScreen from '../../screens/SDS/DetailsAndStudy/MyDetailsScreen';
import MyLettersScreen from '../../screens/SDS/DetailsAndStudy/MyLettersScreen';
import MyMarksScreen from '../../screens/SDS/DetailsAndStudy/MyMarksScreen';
import MyModulesScreen from '../../screens/SDS/DetailsAndStudy/MyModulesScreen';
import MyProgressScreen from '../../screens/SDS/DetailsAndStudy/MyProgressScreen';
import MyAcademicAdviserScreen from '../../screens/SDS/DetailsAndStudy/MyAcademicAdviserScreen';
import MyTranscriptScreen from '../../screens/SDS/DetailsAndStudy/MyTranscriptScreen';
import SMSTextFacilityScreen from '../../screens/SDS/DetailsAndStudy/SMSTextFacilityScreen';


import {THEME_COLOR} from "../../lib/Constants";
import BackButton from '../../components/BackButton';

export default createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          title: `SDS`,
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
      MyAttendance: {
        screen: AttendanceScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Attendance`,
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
      MyDeadlines: {
        screen: DeadlinesScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Deadlines`,
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
      MyDetails: {
        screen: MyDetailsScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Details`,
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
      MyLetters: {
        screen: MyLettersScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Letters`,
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
      MyMarks: {
        screen: MyMarksScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Marks`,
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
      MyModules: {
        screen: MyModulesScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Modules`,
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
      MyProgress: {
        screen: MyProgressScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Progress`,
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
      MyAcademicAdviser: {
        screen: MyAcademicAdviserScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Academic Adviser`,
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
      MyTranscript: {
        screen: MyTranscriptScreen,
        navigationOptions: ({ navigation }) => ({
          title: `My Transcript`,
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
      SMSTextFacility: {
        screen: SMSTextFacilityScreen,
        navigationOptions: ({ navigation }) => ({
          title: `SMS Text Facility`,
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
      animationEnabled: true,
      swipeEnabled: false
    }
);
