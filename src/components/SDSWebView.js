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

const PostMessage = function(data) {
  if (document.hasOwnProperty('postMessage')) {
      document.postMessage(data, '*');
    } else if (window.hasOwnProperty('postMessage')) {
      window.postMessage(data, '*');
    }
}
    ` + props.insertJavaScript;
  }

  navigationStateChangedHandler = ({url}) => {
    if (url.indexOf('https://sso.id.kent.ac.uk') != -1) {
      //this.props.navigate("SignIn");
      //this.WebView.stopLoading();
    }
  }
  
  getHiddenStyle() {
    if (this.props.hidden) {
      return {
        maxHeight: 0
      }
    } else return {}
  }
  
  render() {
    return (
      <WebView
        onMessage={this.props.onMessage}
        source={{uri: this.props.uri}}
        onNavigationStateChange={this.navigationStateChangedHandler}
        scalesPageToFit={false}
        injectedJavaScript={this.state.jsCode}
        javaScriptEnabled={true}
        style={[styles.backgroundStyle, this.getHiddenStyle()]}
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