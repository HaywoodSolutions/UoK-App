import { createStackNavigator } from 'react-navigation';

import HomeNavigation from './HomeNavigation';
import SignInNavigation from './SignInNavigation';

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
      {
        SignedIn: {
          screen: HomeNavigation,
          navigationOptions: {
            gesturesEnabled: false
          }
        },
        SignedOut: {
          screen: SignInNavigation,
          navigationOptions: {
            gesturesEnabled: false
          }
        }
      },
      {
        headerMode: "none",
        mode: "modal",
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
  );
};