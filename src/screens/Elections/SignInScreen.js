import React from 'react';
import { WebView, View, Text, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

import SDSWebView from "../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
  }
  
  navigationStateChangedHandler = ({url}) => {
    if (url.indexOf('https://kentunion.co.uk/') != -1) {
      this.props.navigation.replace("Home");
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
            source={{uri: 'https://sso.id.kent.ac.uk/idp/module.php/core/loginuserpass.php?AuthState=_19dcff63e9f4cfda8511af943d3f6193601118f11e%3Ahttps%3A%2F%2Fsso.id.kent.ac.uk%2Fidp%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttps%253A%252F%252Fkentunion.co.uk%252Fsamlauth%252Fmodule.php%252Fsaml%252Fsp%252Fmetadata.php%252Fkentuni-sp%26cookieTime%3D1549012946%26RelayState%3Dhttps%253A%252F%252Fkentunion.co.uk%253FACT%253D118%2526state%253D5d05b1ce01e2564a74f6710ccb5c6f23c3c4cf0c'}}
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