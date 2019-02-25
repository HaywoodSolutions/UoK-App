import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CoursesScreen from '../screens/Moodle/CoursesScreen';
import CourseScreen from '../screens/Moodle/CourseScreen';
import ViewLectureScreen from '../screens/Moodle/ViewLectureScreen';
import {THEME_COLOR} from "../lib/Constants";
import BackButton from '../components/BackButton';

export default createStackNavigator(
    {
      Courses: {
        screen: CoursesScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Moodle Courses`,
          headerStyle: {
            backgroundColor: 'rgba(9, 0, 10, 0.95)',
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
      Course: {
        screen: CourseScreen,
        navigationOptions: ({ navigation }) => ({
          title: `Moodle Course`,
          headerStyle: {
            backgroundColor: 'rgba(9, 0, 10, 0.95)',
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
      ViewLecture: {
        screen: ViewLectureScreen,
        navigationOptions: ({ navigation }) => ({
          title: `View Lecture`,
          headerStyle: {
            backgroundColor: 'rgba(9, 0, 10, 0.95)',
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
      initialRouteName: 'Courses',
      animationEnabled: true,
      swipeEnabled: false
    }
);
