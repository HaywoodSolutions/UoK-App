import React from 'react';
import { View, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

import SDSWebView from "../../components/SDSWebView";

export default 

class SDSHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { backgroundStyle } = styles;
    alert("We apologise while we work to make this for mobile use")
    
    return (
        <View style={backgroundStyle}>
          <SDSWebView
              uri={'https://sds.kent.ac.uk/student/student_page.php'}
            />
        </View>
    );
  }
}

return new SDSHome();

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
});