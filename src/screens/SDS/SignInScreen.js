import React from 'react';
import { WebView, View, Text, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

import SDSWebView from "../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
  }
  
  navigationStateChangedHandler = ({url}) => {
    if (url.indexOf('https://sds.kent.ac.uk') != -1) {
      this.props.navigation.replace("Tabs");
    }
  }
  
  render() {
    const { backgroundStyle } = styles;
    
    let jsCode = `
document.querySelector('.global-header').style.display = 'none';
`;
    
    return (
        <View style={backgroundStyle}>
          <WebView
            source={{uri: 'https://sso.id.kent.ac.uk/idp/module.php/core/loginuserpass.php?AuthState=https%3A%2F%2Fsso.id.kent.ac.uk%2Fidp%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttps%253A%252F%252Fsds.kent.ac.uk%252F_sp%252F14%26cookieTime%3D1547339155%26RelayState%3Dhttps%253A%252F%252Fsds.kent.ac.uk%252Faccount%252F'}}
            onNavigationStateChange={this.navigationStateChangedHandler}
            scalesPageToFit={false}
            injectedJavaScript={jsCode}
            javaScriptEnabled={true}
            style={styles.backgroundStyle}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
});