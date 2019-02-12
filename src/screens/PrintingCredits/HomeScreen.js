import React from 'react';
import { View, StyleSheet } from 'react-native';
import {THEME_COLOR} from "../../lib/Constants";

import PrintingCreditsView from "../../components/PrintingCreditsView";

export default class SDSHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { backgroundStyle } = styles;
    
    return (
        <View style={backgroundStyle}>
          <PrintingCreditsView
              insertJavaScript={`
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