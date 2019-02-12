import { createDrawerNavigator } from 'react-navigation';
import React from 'react';
import {THEME_COLOR} from "../lib/Constants";

import MainMenu from './MainMenuNavigation';
import LecturesNavigation from './LecturesNavigation';
import TimetableNavigation from './TimetableNavigation';
import NewsFeedNavigation from './NewsFeedNavigation';
import StudentRadioNavigation from './StudentRadioNavigation';
import InquireNavigation from './InquireNavigation';
import StageCoachNavigation from './StageCoachNavigation';
import SettingsScreen from '../screens/SettingsScreen';
import PCAvailabilityNavigation from './PCAvailabilityNavigation';
import SDSNavigation from './SDS/MainNavigation';
import TechSupportNavigation from './TechSupportNavigation';
import ArticleNavigation from './Articles/ArticleNavigation';
import PrintingCreditsNavigation from './PrintingCredits/MainNavigation';
import CampusShuttleNavigation from './CampusShuttle/MainNavigation';
import ElectionsNavigation from './Elections/HomeNavigation';
import SocietiesNavigation from './Societies/HomeNavigation';

export default createDrawerNavigator({
    Home: {
      screen: MainMenu,
    },
    Lectures: {
      screen: LecturesNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Lectures',
        header: null
      })
    },
    PrintingCredits: {
      screen: PrintingCreditsNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Printing Credits',
        header: null
      })
    },
    PCAvailability: {
      screen: PCAvailabilityNavigation,
      navigationOptions: () => ({
        drawerLabel: 'PC Availability',
        header: null
      })
    },
    CampusShuttle: {
      screen: CampusShuttleNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Campus Shuttle',
        header: null
      })
    },
    Timetable: {
      screen: TimetableNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Timetable',
        header: null
      })
    },
    NewsFeed: {
      screen: NewsFeedNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Newsfeed',
        header: null
      })
    },
    StudentRadio: {
      screen: StudentRadioNavigation,
      navigationOptions: () => ({
        drawerLabel: 'CSR Radio',
        header: null
      })
    },
    Inquire: {
      screen: InquireNavigation,
      navigationOptions: () => ({
        drawerLabel: 'InQuire Media',
        header: null
      }),
    },
    StageCoach: {
      screen: StageCoachNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Buses',
        header: null
      }),
    },
    Societies: {
      screen: SocietiesNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Societies',
        header: null
      }),
    },
    TechSupport: {
      screen: TechSupportNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Tech Support',
        header: null
      }),
    },
    SDS: {
      screen: SDSNavigation,
      navigationOptions: () => ({
        drawerLabel: 'SDS',
        header: null
      }),
    },
    Articles: {
      screen: ArticleNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Articles',
        header: null
      }),
    },
    Elections: {
      screen: ElectionsNavigation,
      navigationOptions: () => ({
        drawerLabel: 'Elections',
        header: null
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: () => ({
        drawerLabel: 'Settings',
        headerTitle: "KentFlix",
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
        gesturesEnabled: true
      }),
    }
  },
  {
    initialRouteName: "Home"
  }
);