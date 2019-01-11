import React from 'react';
import { View, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../../lib/Constants";

import SDSWebView from "../../../components/SDSWebView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { backgroundStyle } = styles;
    
    return (
        <View style={backgroundStyle}>
          <SDSWebView
              uri={'https://sds.kent.ac.uk/student/student_page.php?action=ws5r13eg'}
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