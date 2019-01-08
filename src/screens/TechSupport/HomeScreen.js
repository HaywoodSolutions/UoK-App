import React from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

export default class TechSupportHomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  navigationStateChangedHandler = ({url}) => {
    if (url !== 'https://www.kent.ac.uk/library/support/online-chat-window.html') {
      this.WebView.stopLoading();
    }
  }

  render() {
    const { backgroundStyle } = styles;
    
    return (
        <View style={backgroundStyle}>
          <WebView
              source={{uri: 'https://www.kent.ac.uk/library/support/online-chat-window.html'}}
              scrollEnabled={false}
              onNavigationStateChange={this.navigationStateChangedHandler}
              scalesPageToFit={false}
              ref={c => {
                this.WebView = c;
              }}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
});