import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import firebase from 'firebase';
import { AppNavigation } from './src/navigation/AppNavigation';
import {THEME_COLOR} from "./src/lib/Constants";

export default class App extends React.Component {

  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyD63yntw8FaPXpLE8KpFDbuVRJV65aUORA",
      authDomain: "hs-uniplatform.firebaseapp.com",
      databaseURL:"https://hs-uniplatform.firebaseio.com",
      projectId: "hs-uniplatform",
      storageBucket: "hs-uniplatform.appspot.com",
      messagingSenderId: "111383943687"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='light-content'/>}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <AppNavigation />
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: THEME_COLOR
  },
});