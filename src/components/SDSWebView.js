import React, { Component } from 'react'
import { WebView, StyleSheet } from 'react-native'

export default class SDSWebView extends Component {

  constructor(props) {
    super(props);
    this.state = {text: '', height: 0};
    
    this.state.jsCode = `
document.querySelector('#kent-bar').style.display = 'none';

document.querySelectorAll('body>table>tbody>tr>td')[0].style.display = 'none';

document.querySelector('.page').style.display = "block";
document.querySelector('.page').style["boder-left"] = "none";
document.querySelector('.page').style.width = "100%";
document.querySelectorAll('table');

for (var each in document.querySelectorAll('table'))
  each.style.width = "100%";
    ` + props.insertJavaScript;
  }
  
  navigationStateChangedHandler = ({url}) => {
    if (url !== 'https://sds.kent.ac.uk/student/student_page.php') {
      //this.WebView.stopLoading();
    }
  }
  
  render() {
    return (
      <WebView
        source={{uri: this.props.uri}}
        onNavigationStateChange={this.navigationStateChangedHandler}
        scalesPageToFit={false}
        injectedJavaScript={this.state.jsCode}
        javaScriptEnabled={true}
        style={styles.backgroundStyle}
        ref={c => {
          this.WebView = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: 'transparent'
  },
});