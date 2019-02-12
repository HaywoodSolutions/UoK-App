import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import DetailsAndStudy from './DetailsAndStudyNavigation';
import Registration from './RegistrationNavigation';
import WorkshopsScreen from '../../screens/SDS/WorkshopsScreen';

import {THEME_COLOR} from "../../lib/Constants";

export default createBottomTabNavigator(
    {
      DetailsAndStudy: {
        screen: DetailsAndStudy,
        navigationOptions: {
          header: 'null'
        }
      },
      Registration: {
        screen: Registration,
        navigationOptions: {
          header: null
        }
      },
      Workshops: {
        screen: WorkshopsScreen,
        navigationOptions: {
          header: null
        }
      }
    },
    {
      initialRouteName: 'DetailsAndStudy',
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: THEME_COLOR,
        inactiveTintColor: 'lightgray',
      },
      backBehavior: 'none'
    }
);
