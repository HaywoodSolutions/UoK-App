import React from 'react';
import { View, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

import SDSWebView from "../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { backgroundStyle } = styles;
    
    return (
        <View style={backgroundStyle}>
          <SDSWebView
              insertJavaScript={`
                document.getElementById("client-header").style.display = "none";
              `}
              uri={'https://epay.kent.ac.uk/printcredits/'}
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